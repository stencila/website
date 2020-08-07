---
extends: blog/_post.html
title: Consistent Versioning and Deployment of Django and Express
author: Ben Shaw
date: 17 April 2019
abstract: |
  As Stencila grows, we need to make sure our release processes scale along with it. This post discusses how we implemented a consistent versioning and tagging interface for both Django and Express, to simplify the release process for developers.
---

We have a number of open source repositories [on GitHub](https://github.com/stencila/). Most of these are libraries written in JavaScript/TypeScript and are versioned, packed and deployed automatically to NPM. There are only two "freestanding" applications that are deployed: [Stencila Hub](https://github.com/stencila/hub/) and [Stencila Cloud](https://github.com/stencila/cloud/). This post discusses the deployment process we used to have, and the changes made to create a more robust and replicable deployment environment, including a consistent interface for use by developers.

## The Past

The previous deployment process did not use tags or versions. To deploy a new container with the latest code, the process was:

- Commit application code to `master`
- `git pull` on the `master` branch of the application (in the sub-repository of the `ops` repo)
- Create a commit in the super repository (`ops`) indicating that the sub repository had been updated
- Build a Docker image from the checked out application code
- Push the image to Docker hub with no tag
- Deploy the application to Kubernetes with no specific image tag, just `latest`

All this was orchestrated using Makefiles, so there were only a couple of commands to run to perform all theses steps. This had worked fine for a long time but there were definitely some drawbacks.

### Unexpected Code Changes

With no specific version pinning, there was always the possibility that the code could change unexpectedly between a developer's commit and a deployment: if a developer were to push to `master`, then go to do a release, while in the meantime another developer had pushed to `master`, the newer code would be deployed unexpectedly. This issue had never occurred, but with Stencila's development team growing it was becoming a more likely possibility.

### Stuck Versions

Further, the release-from-`master`-tip approach meant it was difficult to choose which version to release to a specific environment – it always had to be the latest to staging with the latest to production following.
While not impossible to reset the Git checkout to be an older version, it was not easy. This meant that the process of applying patch releases to production and newer beta versions to staging was somewhat difficult.

### Running Version Obfuscation

Finally, without numbered versions it became difficult to interrogate environments to see how up to date the code they are running was. Each application was exposing which Git commit hash its code was, however, it was a multiple step process to take that to the repository, find the commit log, and see what features it contained. That process had to be done multiple times to compare it with another version, based on its hash.

## The Present

Enter a versioned approach. It is easy to tag your code using Git to apply a version to a specific commit, and there are tools that can be used to automate version incrementing. What made our implementation slightly more difficult is that Stencila Hub is a Python Django application, while Stencila Cloud is NodeJS with Express.

Both of these have their own ways of managing versioning, but our goal was to create a consistent interface. Firstly to make developers' lives easier, but to also make sure that commit messages and tags related to versions were in the same format for each project.

Fortunately, our `Makefile` based approach allowed the construction of such an interface to abstract these differences away.

### Hub (Python) Versioning

The de-facto Python tool for versioning seems to be [bump2version](https://github.com/c4urself/bump2version) (a fork of [bumpversion](https://github.com/peritus/bumpversion), which is no longer maintained). The version can be stored in an arbitrary file, and `bump2version` uses a (customisable) regular expression to locate it therein. You could choose to have it increment the version inside your `setup.py` file, for example, if you're building a module the gets deployed to PyPI.

In our case we don't use a `setup.py` file. Instead, we want the version in a file that's readable by Django so it can be exposed in a view. The version is stored in a file called `_version.py` like this:

```python
__version__ = '0.0.1'

```

It is easy to `import` and refer to the `__version__` variable, and then expose it through our status endpoint.

In normal use `bump2version` requires minimal configuration, just tell it the file to read/update the version in. Because we want to use a consistent interface for all our projects, driven through `make`, we decided to also disable some of its automatic git commands. Stencila Hub's `setup.cfg` file looks like this:

```
[bumpversion]
current_version = 0.0.1
commit = False
tag = False

[bumpversion:file:_version.py]
```

By disabling `commit` and `tag`, `bump2version` will simply bump the version and won't make any commits or tags when this takes place. Instead, commands to do these things are added to the `Makefile`. These commands are: `increment-major`, `increment-minor`, `increment-patch` and `tag`. The `increment-*` commands also perform a commit. If you're interested in how they are implemented you can check them out in the [Makefile](https://github.com/stencila/hub/blob/2f924f5de3813423f12a9d105c40453977e3f472/Makefile#L190). There's also supporting [version-get.sh](https://github.com/stencila/hub/blob/2f924f5de3813423f12a9d105c40453977e3f472/version-get.sh) and [version-increment.sh](https://github.com/stencila/hub/blob/2f924f5de3813423f12a9d105c40453977e3f472/version-increment.sh) scripts that do some of the work.

### Cloud (NodeJS) Versioning

Node provides built in support for versions and version manipulation, through the standard `package.json` file. While it is possible to read this file and expose the version when running in dev mode, for production the version is passed in as an environment variable and exposed at the status endpoint.

To increment the version, just run `npm version (major|minor|patch)`. NPM will automatically commit and tag. Since we want parity with Python/Hub and control over the format of the commit messages and tag, we disable this with the `--no-git-tag-version` flag. You can see the implementation of this in the [version-increment.sh](https://github.com/stencila/cloud/blob/68173eb9dd7c54d4740f980c55ad8020d46b94db/version-increment.sh#L9) file, and check the interface in the [Makefile](https://github.com/stencila/cloud/blob/68173eb9dd7c54d4740f980c55ad8020d46b94db/Makefile#L78).

The interface is identical to that of Stencila Hub, which means a developer does not need to learn two sets of commands for creating a release build.

## Developer Workflow

Whether releasing Hub or Cloud, the developer workflow is the same.

```bash
# *hack hack hack*
# Commit my changes
$ git commit -m "feat: I've made some awesome changes."

# Increment the major, minor or patch component
# This will also commit the version change
$ make increment-minor

# Create an annotated tag of the current version
$ make tag

# Push tags up to Github
$ git push --tags
```

There are built in checks in place to make sure the developer can't manipulate the version or tag without being on a clean `master` branch.

## Ops Workflow

The Ops workflow (deployment process) has not changed that much. Previously the `make` commands were in the format `deploy-(hub|cloud)-to-(test|prod)`. Those remain the same, except now they expect a `version` argument, e.g:

```bash
$ make version=1.0.0 deploy-cloud-to-prod
```

Now, instead of just pulling the lastest from `master` for the given project, the deployment script uses `git reset --hard` to reset the entire working directory to a given version, allowing seamless back and forward "time travelling" to a specific version.

Then, when building the Docker image to be deployed to Docker Hub, the version is used as a tag to identify it. Another positive offshoot of this is that the deployment script can check if a Docker Image with that tag already exists, and skip the build and upload if so.

The Kubernetes YAML file is now interpolated with the image tag as well, so there is a replicable link throughout the system build and deploy system.

## Conclusion

We're excited to be using this new process which has streamlined releases of replicable code artefacts. As the Stencila development team grows, these changes will help ensure a simpler onboarding process due to the standardisation between projects, as well as make it easier to deploy known versions and find out what code is running where.

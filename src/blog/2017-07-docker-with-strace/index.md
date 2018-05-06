---
extends: blog/_post.html
title: Shrinking Stencila’s Docker images with strace
author: Finlay Thompson
date: 28 July 2017
abstract: |
     Docker containers are a useful way to manage dependencies - especially when your application has a lot of them.
     However, the down side is that those comprehensive images can get quite large. We used the strace tool to
     shrink Stencila images and make them easier and faster to deploy.
forum_topic:
image: strace-logo.png
---
Docker containers are a useful way to manage dependencies - especially when your application has a lot of them. Stencila's [image repository](https://github.com/stencila/images) has comprehensive Docker images that include many of the R and Python packages that commonly used for research. That's really useful because it means that you don't need to specify all those dependencies yourself. However, the down side is that those comprehensive images can get quite large - for example the stencila/alpha image is currently around 2.26GB.

The aim of this work was  to shrink the on-disk size of a Docker container as much as possible, while ensuring that the code inside a Stencila document continues to run i.e. that it is fully reproducible. This "shrunken" image can then be archived with the document to ensure that it can always be reproduced.

We used the [`strace`](https://strace.io/) tool to discover what is actually used by the code within a document. `strace` is a powerful Linux tool that records all the system calls that a given process makes. The idea is to keep track of all the files that are actually used by the process, and make a new Docker image that only includes those files. That is the theory at least - turns out that there are number of little gotchas along the way, of course.

<figure>
	<img src="strace-logo.png" style="width: 20%;">
	<p><i><a href="https://strace.io/">strace</a> mascot by Vitaly Chaykovsky. CC BY-SA 4.0</i><p>
</figure>


## Planning

The [`shrink-docker.sh`](https://github.com/stencila/images/tree/master/.shrink) script is written as a bash script. It expects to have access to a docker engine, and to the internet (for installing packages). The idea is to make it as self-contained as possible.

For a given combination of a Docker image and a command to run in it, the script will create a new shrunken image that will still be able to reproduce the document, but be as small as possible. The shrink script expects the user to give it then name of the original docker image, the name of a new created image, and the command to run in the docker image. Environment variables can be used to set up specific Docker arguments etc.

## How does it work?

### Getting ready to run with `strace`

The first step is to install `strace` into the original image. The current approach expects that the strace can be installed with `apt-get`, which means images that are based on Debian or Ubuntu. The script can be adapted to work in more general contexts, but we haven't done that yet.

Using dockers mechanism for adding new features to existing images we can add `strace` using:

```
    RUN apt-get update && \
        apt-get -y --no-install-recommends install strace && \
        rm -rf /var/lib/apt/lists/*
```


This command installs `strace`, and only depends on `libc` being installed,which effectively is always there. The command also removes any apt cache files left lying around.  

Docker images have a default user, which may not be root. We can get around this by using the `docker inspect` command to record the default user, and reset it after installing `strace`.

### Running the program with `strace` to list required files

The `strace` commands creates an output file with information that looks like this:

```
8     execve("./build.sh", ["./build.sh"], [/* 6 vars */]) = 0
8     brk(NULL)                         = 0x1ff3000
8     access("/etc/ld.so.nohwcap", F_OK) = -1 ENOENT (No such file or directory)
8     mmap(NULL, 12288, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f3df1e23000
8     access("/etc/ld.so.preload", R_OK) = -1 ENOENT (No such file or directory)
8     open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
8     fstat(3, {st_mode=S_IFREG|0644, st_size=33465, ...}) = 0
8     mmap(NULL, 33465, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f3df1e1a000
8     close(3)                          = 0
```

By reading this output file we can see every file that has been accessed, along with lots of other information. The files that are opened, or accessed, are listed, forming a list of required files. Many of the files are actually symbolic links to other files (or symbolic links), so we use `readlink` to follow all the symbolic links to the actual files they refer to.


### Using `rm` remove all the unnecessary files (but don't remove `rm`)

The next step is to remove all the files that are not required to be kept. There are a few special cases as well, such as the `/proc` and `/sys`, that we always want to keep. Also, we don't want to remove `rm` while removing the other files. Turns out that it is bad idea.

This is done by adding a layer to the docker image, essentially just removing all the files we don't need:

```
COPY exclude.txt /
RUN (cat /exclude.txt | grep -v "$(which rm)" | tr "\n" "\0" | xargs -0 rm -f | true) && \
    rm /exclude.txt
```


### Flatten out the docker image

Docker images are generally a stack of layers, each representing one installation step. This is especially useful if you know you have common base layers that you want to share between container images. In this case though, we are deleting files, there is little value in the stack of images. So, the last step is to flatten out the shrunken image by exporting and then importing it:

```
docker export $CONTAINER_ID | docker import - $OUT_REPOSITORY
```

At this point we have the final image. You can see the size of it by looking at the output from `docker images`. In the case of the `stencila/alpha` image, and a very simple document with one plot, we get an image that has been shrunken to 170MB, or around **7.5%** of the original size.


## Next steps

This exercise has shown that it is feasible to use strace to reduce the size of docker images in terms of what is actually used by some code. There are few interesting directions to go in terms of next steps.

- The list of used files `keep.txt` can be used to document what shared libraries are actually used by a particular analysis. This information is interesting to see what dependencies are really used, and which ones are unnecessary. Ideally, upstream libraries can be patched to be more careful about which dependencies are required.

- The list of required files can also be used to identify which research outputs are actually effected by specific bugs or vulnerabilities in upstream libraries.

- We are also keen to explore the impact on the docker image size of using specific features. For example, if we add a particular mapping library, how much does it increase the size of the shrinked docker image.

This work was done by Hamish Mackenzie, with help from Finlay Thompson, and support from Nokome Bentley.

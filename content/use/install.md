---
extends: learn/_page.html
title: Stencila Desktop installation
smalltitle: Use
next_ignore:
  label: Quick start
  url: /learn/getting-started/quick-start.html
---

Stencila Desktop is an application that allows you to use Stencila on your local machine. You can write reproducible documents with executable
code cells and leverage the power of Stencila Sheets. Below are detailed instructions on installing Stencila Desktop for Windows, Mac OS X and Linux.

### Windows

Download the `.exe` file for the latest [Stencila Desktop release](https://github.com/stencila/desktop/releases). Then just double click the downloaded file to install the application.

### Mac OS X

Download the `.dmg` file for the latest [Stencila Desktop release](https://github.com/stencila/desktop/releases). Then:

- double click the `.dmg` to make its content available (the name will show up in the Finder sidebar, at the bottom), a pop-up window will open;
- drag the application from the `.dmg` window into /Applications to launch install (you may need an administrator password);
- wait for the copy process to finish;
- eject the `.dmg` file by clicking the eject button in the Finder sidebar.

(Thanks to [patrix](https://apple.stackexchange.com/a/64848) for these instructions.)

### Linux

Or, use one of our Docker images which bundle these language packages (plus many other packages that are useful in data-driven research) in one reproducible computing environment:

- [Use other programming languages](#use-other-programming-languages)
  - [Stencila Docker images](#stencila-docker-images)
    Download the AppImage\* file for the latest [Stencila Desktop release](https://github.com/stencila/desktop/releases). Then double click on it and click _yes_ to "Make executable and run". Or, to install from the command line, navigate to the folder where the AppImage file is located and then:

```bash
$ chmod a+x stencila-desktop-*.AppImage
$ ./stencila-desktop-*.AppImage
```

\*[AppImage](http://appimage.org/) is a format for distributing applications for Linux and, on most distributions, will not require the installation of any dependencies.

## Use other programming languages

The basic installation of Stencila Desktop has built in support for executing code using Mini (our small, built-in language) and JavaScript. To execute code in other languages, you will need to install one of our language packages:

- [Stencila Python package](/learn/languages/python.html)
- [Stencila R package](/learn/languages/r.html)
- [SQL (Stencila Node.js package)](/learn/languages/sql.html)

### Stencila Docker images

> ! We are currently working on making Stencila's Docker images compatible with the latest Stencila Desktop. During that process, not all functionality may be available.

You can also enable use of all the above programming languages in one go by using one of the [Docker](https://www.docker.com/) images that we provide.
The Docker images bundle these language packages, plus many other packages that are useful in data-driven research, in one reproducible computing environment.
Stencila has several Docker images available in the [`stencila/images`](https://github.com/stencila/images) repository.

**Prerequisites** You need to have [Docker installed](https://docs.docker.com/install/) first before you can enable any of the images.

Once you have Docker installed, download the desired Docker image using `docker pull <image-name>`. For example, to download the `stencila/core` image:

```bash
docker pull stencila/core
```

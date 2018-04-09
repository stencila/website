---
extends: learn/_page.html
next:
    label: Quick start
    url: /learn/getting-started/quick-start.html
---

# Installation

> In this section you will learn how to install various Stencila software, including Stencila Desktop, Stencila language packages, and Stencila Docker images.

For editing executable documents on your desktop (or laptop!) install:

- [Stencila Desktop](#stencila-desktop)

Stencila Desktop has built in support for executing code using Mini (our small, built-in language), Javascript, and Structured Query Language (SQL). To execute code in other languages, you will need to install one of our language packages:

- [Stencila Python package](#stencila-python-package)
- [Stencila R package](#stencila-r-package)
- [Stencila Node.js package](#stencila-node.js-package)

Or, use one of our Docker images which bundle these language packages (plus many other packages that our useful in data-driven research) in one reproducible computing environment:

- [Stencila Docker images](#stencila-docker-images)


## Stencila Desktop

Stencila Desktop is a desktop application for editing executable documents. It's available for Windows, Mac OS and Linux.

### Windows

Download the `.exe` file for the latest [Stencila Desktop release]( https://github.com/stencila/desktop/releases). Then just double click the downloaded file to install the application.

### Mac OS

Download the `.dmg` file for the latest [Stencila Desktop release]( https://github.com/stencila/desktop/releases). Then:
 - double click the `.dmg` to make its content available (the name will show up in the Finder sidebar, at the bottom), a pop-up window will open;
 - drag the application from the `.dmg` window into /Applications to launch install (you may need an administrator password);
 - wait for the copy process to finish;
 - eject the `.dmg` file by clicking the eject button in the Finder sidebar.

(Thanks to [patrix](https://apple.stackexchange.com/a/64848) for these instructions.)

### Linux

Download the AppImage\* file for the latest [Stencila Desktop release]( https://github.com/stencila/desktop/releases). Then double click on it and click *yes* to "Make executable and run". Or, to install from command line, navigate to the folder where the AppImage file is located and then:

```bash
$ chmod a+x stencila-desktop-*.AppImage
$ ./stencila-desktop-*.AppImage
```
\*[AppImage](http://appimage.org/) is a format for distributing applications for Linux and, on most distributions, will not require the installation of any dependencies.


## Stencila Python package

>! We are currently working on making the Stencila Python package compatible with the latest Stencila Desktop. During that process, not all functionality may be available.

The [Stencila Python package](https://github.com/stencila/py) provides a `PythonContext` for executing Python code and functions from within Stencila documents.

The package is not available via PyPI (Python Package Index) yet, so you need to install it from our Github repository. 

>i You may need to install `pip` first. On Windows, [these instructions](https://dev.to/el_joft/installing-pip-on-windows) may be useful.

Open a terminal session (on Windows, go to "Start" and then in "Search for programmes and files" type `cmd`) and type in:

```bash
pip install --user https://github.com/stencila/py/archive/master.zip
```

Then register the package's manifest so that it can be found by the Stencila Desktop and other Stencila packages,

```bash
python -m stencila register
```


## Stencila R package

>! We are currently working on making the Stencila R package compatible with the latest Stencila Desktop. During that process, not all functionality may be available.

The [Stencila R package](https://github.com/stencila/r) provides a `RContext` for executing Python code and functions from within Stencila documents.

The package is not yet available on CRAN, so you need to install directly from our Github repository using the [`devtools`](https://github.com/hadley/devtools) package.

>i You may need to install `devtools` first using `install.packages("devtools")` from within an R session

Launch a R session on your machine and type:

```r
devtools::install_github("stencila/r")
```

Then register the package's manifest so that it can be found by the Stencila Desktop and other Stencila packages,

```r
stencila:::register()
```


## Stencila Node.js package

The [Stencila Node.js package](https://github.com/stencila/node) provides a `NodeContext` and a `SQLiteContext` for executing Javascript and SQL code and functions respectively from within Stencila documents.

This package comes bundled with Stencila Desktop so it does not need to be installed separately. But, for completeness, and because you may want to use it from another client application, we include these installation instructions here.

>i You may need to install `npm` first. [On Windows, these instructions](http://blog.teamtreehouse.com/install-node-js-npm-windows) may be useful.

Open a terminal session (on Windows, go to "Start" and then in "Search for programmes and files" type `cmd`) and type in:

```bash
npm install stencila/node -g
```

>i Although this package is [available on NPM](https://www.npmjs.com/package/stencila-node), we currently recommend installing directly from the `master` branch on Github as per the above instructions

Then register the package's manifest so that it can be found by other Stencila packages,

```bash
stencila-node register
```


## Stencila Docker images

>! We are currently working on making Stencila's Docker images compatible with the latest Stencila Desktop. During that process, not all functionality may be available.

Docker is a software platform which provides operating-system-level virtualization, also known as "containerization". Stencila has several Docker images available in the [`stencila/images`](https://github.com/stencila/images) repository. Each image contains one or more of the Stencila packages for R, Python and Node.js. This allows you to use one of these images, instead on installing packages locally, in order to execute code from within executable documents.

>i Check Docker's [official installation instructions](https://docs.docker.com/install/) for the best way to install Docker for your operating system

Once you have Docker installed, download the desired Docker image using `docker pull <image-name>`. For example, to download the `stencila/core` image:


```bash
docker pull stencila/core
```

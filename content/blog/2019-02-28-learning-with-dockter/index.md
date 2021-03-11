---
extends: blog/_post.html
title: Learning Docker through Dockter
author: Aleksandra Pawlik
date: 2019-03-05T00:00:00.000Z
abstract: |
  "A short summary of my, somewhat painful, route to discovering that what I thought I knew about Docker was in fact just the tip of the iceberg. Fortunately, I was able to upgrade my understanding through testing and using a new tool we have been developing: Dockter, a container image builder for researchers."
forum_topic:
image: docker-error.png
---

This is a short summary of my, somewhat painful, route to discovering that what I thought I knew about Docker was in fact just the tip of the iceberg. Fortunately, I was able to upgrade my understanding through testing and using a new tool we have been developing: [Dockter](https://stencila.github.io/dockter/), a container image builder for researchers.

I used Docker for the first time several years ago when it entered the world of computational research. Working with computational research communities I was well aware of the problems with reproducibility due to dependency hell. Docker images appeared to be (and are!) a great solution. However, not actually doing
computational research myself, I only used Docker a couple of times following a tutorial to build an image just to see how it would go. It all went fine, as usually well prepared tutorials present the user with a typical and uncomplicated case. I have run several Docker images that I pulled from the Docker hub. That has also worked fine for me. And that was it, as far as it came to my hands-on experience with Docker.

![docker-error.png](docker-error.png)
{style="width: 80%;" }

Hence I was convinced that Docker is the silver bullet for the reproducibility problems in computational research. I happily recommended Docker to a number of researchers that I talked to and even to some developers who were struggling with dependency hell. It was only after I started helping with Stencila's Dockter that I understood how naive I was.

Firstly, I didn't realize that rebuilding images with Docker can take a long time even if you only changed a tiny bit in your Dockerfile. In most cases, it is a recommended practice to create Docker images with as few layers as possible. That means that making even small changes in the list of required packages in a Dockerfile can results in Docker reinstalling all the packages.

Really excited about a feature in Dockter which helps deal with that, I started trying it out with a few examples that I was hoping to publish as a part of a Stencila Dockter tutorial. Everything was working fine until one morning my Linux just refused to boot up. After a frustrating few hours of trying to fix the problem using `fdisk` (suspecting segmentation fault), I booted into Windows on my dual-boot machine to do actual work. The following day using Ubuntu Live USB I got into the Linux partition and discovered that it was pretty much full. My experiments with fast rebuilding Docker images with Dockter resulted in a massive pile of Docker images that filled up the disk and stopped it being able to boot.

That's the second lesson I learnt about Docker. Clean up your images regularly. They can take a lot of space. While obviously I suppose it wasn't much of an issue when I was trying out Docker writing Dockerfiles manually. Rebuilding images involved more effort and it made me think about deleting the old image before I built the new one. However, Dockter "exacerbated" the problem as all I had to do to rebuild images was to change the example code in R or Python and mindlessly re-run `dockter build`, resulting in even more Docker images.

Conscious of the problem I nuked all Docker images which I created with Dockter and successfully logged back into Linux. Still working on the Dockter tutorial, I wanted to be smarter and sometimes would just halt the building process through the ever convenient "Ctrl+C". Due to the previous image disaster, I was monitoring how much the free space on my drive was shrinking and rather nervously listing the images on the disk. That's how I discovered _Docker dangling images_. I'm not sure if it was me hitting "Ctrl+C" too much that caused but now I know how to [purge all Docker images effectively](https://docs.docker.com/engine/reference/commandline/system_prune/). It will bite me back one day but so far so good.

Would I still recommend Docker for reproducible research? Yes.

Docker makes reproducibility a lot easier if you can get the hang of installing the right packages. Using Dockter makes this a lot easier by automatically detecting the right packages to use, eliminating dependency hell. Just make sure to keep track of your disk space if you're building a lot of images!

---
extends: blog/_post.html
title: Stencila Design Updates and csv,conf,v4
author: Jacqueline Wijaya
date: 17 May 2019
abstract: |
  Learn about our recent UX explorations on Stencila Hub. Also, Jacqueline was at csv,conf,v4!
image: csv_conf_v4.jpg
---

Since our team meet in April, we've been busy developing our Stencila [schemas](https://github.com/stencila/schema) and [file converters](https://github.com/stencila/convert) (to be integrated into Google Add-ons for Google Docs and Sheets).

Based on user research in New Zealand (interviews and concept tests), as well as internal design critiques, we've been exploring updates to the Stencila Hub user experience in preparation for integration with our converters and Google Add-ons.

In this post, I'll talk through some of the proposed UX changes and reasoning behind those changes.

# Stencila Hub UX explorations

## 1. Files view

![](https://i.imgur.com/Tj8FZka.gif)
_After: Files view._

### New feature: set a main file.

This is a new feature, setting a main file for a Stencila project, which adds a preview of the file in the Overview screen. From user feedback, it was clear that having a visual indicator for the main file in the Files view would be helpful.

### Simplify file management.

![](https://i.imgur.com/vWYUWmu.png)
_Before: Files view (files list)._

We've made several updates to the Files view, including the layout and content of each listed file. Renaming a file was previously tucked away behind a cog icon, and the delete option was part of a trashcan icon. The new files list layout removes extraneous icons and clutter, and tucks away functions in the "more" (...) icon.

Additionally, instead of listing file types in text format, an icon is used to save horizontal space.

Linking and unlinking Github sources was originally done using two separate buttons. To simplify the interface, we tucked away the option to unlink repositories under the "Link" button. Also, instead of requiring the user to specify the folder (within the Stencila project) to add the Github repository contents, the updated UI would use the current working directory (which can be changed through folder navigation).

---

## 2. Sharing view

![](https://i.imgur.com/kRFEivr.gif)
_After: Sharing view._

### Adjust spacing, content order, and simplify copy.

The new design removes the extra whitespace and simplifies the copy for making a project public or private.

![](https://i.imgur.com/N1ZLpHm.png)
_Before: Sharing view._

---

## 3. Files view: "New" menu options

![](https://i.imgur.com/EcV5Wj2.gif)
_After: New file/folder options._

### Creating a new folder.

Previously, the Hub didn't have a direct way to create folders, so we added a new folder option.

### Simplify file upload and file creation flows.

The original file uploader was a 3-step process (click "add files" to select files, then "upload files", then "done"). The updated design allows users to select their files for immediate upload, then click "done".

![](https://i.imgur.com/iyzuV4X.png)
_Before: New file/folder options (file uploader)._

---

## 4. Files view: file conversion

![](https://i.imgur.com/uNu29ND.gif)
_After: converting an Rmd file to a Google Doc, and back to an Rmd file._

### New feature: converting an Rmd file to a Google Doc.

Something we're currently experimenting with is a new feature, to convert Rmd files into Google Docs that can preserve (and easily view) the code used to generate figures and tables based on data files.

We tested the display of file lineage for converted files, and made adjustments to the Hub designs based on user feedback.

---

# csv,conf,v4

![](https://i.imgur.com/BNzs7t7.jpg)

Last week I had the privilege of attending [csv,conf,v4](https://csvconf.com/) in Portland, Oregon, and had loads of fun meeting librarians, open source project organizers/contributors, and researchers in various fields.

It was really interesting to be surrounded by people passionate about metadata, open science, statistics, and [box plots](https://csvconf.com/speakers/#melissa-santos). As an outsider to a lot of these topics, I feel inspired to learn more, and contribute to the wider open data and open science community.

![](https://i.imgur.com/dnKaOS4.jpg)
_Also, there was a llama, Rojo, at the conference. Sadly, he's retiring this year. Thank you for your service, Rojo!_

---

# Next steps

In the coming weeks, we'll be focusing on a visual redesign of the Hub, as well as test and refine our Google Doc and Sheet Add-on designs.

**Let us know if you're interested in joining our [beta testing program](https://stenci.la/#beta-signup)!**

![](https://i.imgur.com/8V7tZO3.jpg)

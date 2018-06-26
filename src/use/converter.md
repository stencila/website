---
extends: learn/_page.html
title: Stencila Converters
---

![Stencila Converters](/learn/img/convert.png){style="display: inline; width: 12%; margin: 0 auto; padding-right: 1em; padding-bottom: 1em; float: left;" }

Stencila Converters allow you to convert between a range of formats commonly used for among researchers (and not only). The conversion of interactive source code sections of the document is lossless - you can still run the code after the conversion. This means that you can seamlessly collaborate with colleagues who prefer other than you interfaces, without yourself having to give up your tool of choice. Stencila Converters are using the awesome power of [pandoc](https://pandoc.org/) so if you are already a
pandoc user, you should find the Converters easy to use.


## Install{style="clear: left;"}

The easiest way to install the Converters is through installing [Stencila Command Line (CLI)](https://github.com/stencila/cli/releases) tool.
The installation requires two steps:
1. Download and unpack the binary file with the [CLI for your operating system](https://github.com/stencila/cli/releases).
2. Copy the binary file to the relevant location in your operating system so that you can easily access the tool in the command line:
  * on Windows, create a folder in `C:/ProgramFiles/stencila` and copy the `stencila.exe` file into it; then open Windows Command Line and add
  the folder to the `PATH`: `setx PATH "$env:path;C:/ProgramFiles/stencila"`
  * on Linux, copy the `stencila` binary file to `/usr/local/bin/`;
  * on Mac OS X, copy the `stencila` file to the `/Applications` folder.

## Use

The basic use of the Converter is fairly simple. Open the terminal and type `stencila convert path-to-input-file path-to-output-file`, replacing
`path-to-input-file` and `path-to-output-file` with actual paths. So for example:

```
stencila convert Stencila/examples/hello-world/hello-world/hello-world.md Stencila/examples/hello-world/hello-world.docx
```

You should see the following output message:

```
✓  Success converting "Stencila/examples/hello-world/hello-world/hello-world.md" to "Stencila/examples/hello-world/hello-world.docx"
```

You can override the file format both from and to which the Converter is meant to convert. In order to do that, use the `--from` and `--to` options.
For example:

```
stencila convert hospital.xlsx --to rmd hospital.md
```

To get more help on using the Converter type `stencila convert -h`:

![Stencila CLI](/learn/img/convert-help.png)


### Convert spreadsheets

Stencila Converters support spreadsheet conversion.

```
stencila convert hospital.xlsx hospital.md
```
Should result in:

```
✓  Success converting "hospital.xlsx" to "hospital.md"
```

Note that conversion from `xlsx` format to `md` retains some metadata from the original spreadsheet:

![Stencila CLI](/learn/img/converter-xlsx.png)




## Supported formats
Stencila Converters recognize the file extensions and use the relevant converters. Below is the list of currently recognized file extensions:

| Format                        |             Extension              |
|:------------------------------|:----------------------------------:|
| Delimiter Separated Values    |            `csv`, `tsv`            |
| HTML                          |               `html`               |
| JavaScript Object Notation    |               `json`               |
| Journal Aricle Tag Suite      |               `jats`               |
| Jupyter Notebook              |              `ipnyb`               |
| Latex                         |               `tex`                |
| Markdown                      |                `md`                |
| Microsoft Excel               |               `xlsx`               |
| Microsoft Word                |               `docx`               |
| Open Document Spreadsheet     |               `ods`                |
| Open Document Text            |               `odt`                |
| Portable Document Format      |               `pdf`                |
| RMarkdown                     |               `Rmd`                |
| XMarkdown\*                   |               `Xmd`                |
| EDF\**                        |         `edf`, `edf.json`          |
| EDFY\**                       |   `edfy`, `edf.yaml`, `edf.yml`    |
| Reproducible Document Archive | `sheet.xml`, `sheetml`, `jats.xml` |
|                               |                                    |
\* _In XMarkdown you can use any code blocks, e.g. `py`, `js` and so on._ <br/>
\**_EDF and EDFY are internal Stencila formats._

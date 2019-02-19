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
  * on Windows: <br/>
       1) create a folder in `C:\Program Files\` called `stencila`, <br/> 
       2) copy the `stencila.exe` (which will be in the unpacked folder you just downloaded) file into it;  <br/> 
       3) then open Windows Command Line and add the folder to the `PATH` variable : `setx path "%path%;C:\Program Files\stencila"`; <br/> 
 > Note that the above instructions will work for Windows 7 and above. If you are using a Windows machine with an older version of the 
 > operating system, please use this command in the command line: `set PATH=%PATH%;C:\Program Files\stencila`
 <br/> 
  * on Linux, copy the `stencila` binary file to `/usr/local/bin/`;
  * on Mac OS X, copy the `stencila` file to the ` /usr/local/bin/` folder.

## Use

The basic use of the Converter is fairly simple. Open the terminal and type `stencila convert path-to-input-file path-to-output-file`, replacing
`path-to-input-file` and `path-to-output-file` with actual paths. So for example:

```bash
stencila convert Stencila/examples/hello-world/hello-world/hello-world.md Stencila/examples/hello-world/hello-world.docx
```

You should see the following output message:

```bash
✓  Success converting "Stencila/examples/hello-world/hello-world/hello-world.md" to "Stencila/examples/hello-world/hello-world.docx"
```

You can override the file format both from and to which the Converter is meant to convert. In order to do that, use the `--from` and `--to` options.
In the example below the output file format will actually be `comma separated values`, even thought the output file name has a different extension (`txt`).

```bash
stencila convert hospital.xlsx --to csv hospital.txt
```

If you don't specify the output for the Converter, it will display on the screen (standard output) the input file converted to the intermittent internal Stencila JSON format.

```bash
stencila convert hospital.xls
```

```json
{
  "type": "Document",
  "front": {
    "name": {
      "type": "String",
      "data": "patient"
    }
  },
  "body": [
    {
      "type": "Table",
      "rows": [
        [
          [],
          [
            {
              "type": "String",
              "data": "Day 1"
            }
          ],
```

To get more help on using the Converter type `stencila convert -h`.

### Convert to PDF

Conversion to PDF will require `pdflatex` (because this is how [pandoc works](https://pandoc.org/MANUAL.html#creating-a-pdf)). Check the [installation details here](https://www.latex-project.org/get/).

### Convert spreadsheets

Stencila Converters support spreadsheet conversion.

```bash
stencila convert hospital.xlsx hospital.md
```

Should result in:

```bash
✓  Success converting "hospital.xlsx" to "hospital.md"
```

Note that conversion from `xlsx` format to `md` retains some metadata from the original spreadsheet:

![](/learn/img/convert-xlsx-screen.png)

![](/learn/img/convert-xlsx-md.png)


### Convert projects

You can convert a whole folder into a supported by Stencila `DAR` project which will contain all your articles and spreadsheets ready to work with in Stencila.
You need to specify the output format to have the `dar` extension:

```bash
stencila convert path-to-folder path-to-project.dar
```  

Or you can do it using `--to` flag:

```bash
stencila convert path-to-folder --to dar path-to-project
```

Note that if you use `--to` flag and you don't spefify the `dar` extension in the output project name, the Converter will still complete the conversion.


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
| Reproducible Document Archive | `sheet.xml`, `sheetml`, `jats.xml` |
|                               |                                    |
\* _In XMarkdown you can use any code blocks, e.g. `py`, `js` and so on._

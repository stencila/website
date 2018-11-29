---
extends: learn/_page.html
title: Introduction
smalltitle: Learn
next:
    label: Installation
    url: /use/install.html
---

Stencila provides a set of open-source software components enabling reproducible research within the tool of your choice. Stencila allows you to write reproducible
documents containing interactive source code using the interfaces you are most familiar with. Stencila components can be combined in various ways and plugged
into existing reproducible infrastructure.

## Execution engine
![Stencila Engine](img/engine.png){style="display: inline; width: 25%; margin: 0 auto; padding-right: 1em; padding-bottom: 1em; float: left;" }

Stencila execution engine is its heart. The engine enables a spreadsheet-like, reactive programming model. It maintains a graph of the dependency between code cells.
This means that as you change your code or data, all other parts of your document depending on them get updated as well. Stencila execution engine does not itself
execute the code embedded in the documents but instead sends it to the execution contexts.


## Execution contexts{style="clear: left;"}

![Stencila Contexts](img/contexts.png){style="display: inline; width: 25%; margin: 0 auto; padding-right: 1em; padding-bottom: 1em; float: left;" }

The execution contexts _compile_ and _execute_ code from the code cells that the execution engine passes on. This means that Stencila can
be used for practically any programming language as the execution contexts can be developed using Stencila API. Currently we provide execution contexts
for R, Python, JavaScript, SQL and Mini (Stencila's own simple language).

The execution contexts determine the inputs and outputs of cells which enables automatic conversion of data between languages. In other words, you can
 combine of multiple languages in one document.


## Sheets{style="clear: right;"}

![Stencila Sheets](img/UI.png){style="display: inline; width: 25%; margin: 0 auto; padding-right: 1em; padding-bottom: 3em; float: left;" }

Stencila comes with its own simple interface, Stencila Sheet, which can be used similarly to a typical spreadsheet application. We are working on plugins
for dominant spreadsheet applications which will add capabilities for working with:
* code in open-source languages,
* shared, custom functions
* shared, custom types (for data validation).

In other words, Stencila Sheets (and in the future, the plugins) allow for execution of R, Python, SQL (and more languages) code via special “code-snippet” functions e.g. `r`, `py`, `sql`. This feature will help researchers working in spreadsheet make their work more robust, easier to test and collaborate on. {style="clear: right;"}

## Converter

![Stencila Converter](img/convert.png){style="display: inline; width: 25%; margin: 0 auto; padding-right: 1em; float: left;" }

Stencila includes a set of import/export converters which allow you to convert between a range of formats commonly used for among researchers (and not only). Converters support lossless conversion of interactive source code sections and (most of the time) formatting.{style="display: block;"}

You can convert to and from formats used by:
* Excel (*xlsx*, *csv*, *tsv*),
* Jupyter Notebooks (*ipynb*),
* Markdown (*md*),
* RMarkdown (*Rmd*,
* Word (*docx*),
* LaTeX (*tex*),
* publishing applications (*JATS*, *xml*),
* and more...

Converter bridges formats commonly used across the workflow lifecycle, e.g.from Jupyter Notebook to RMarkdown to Word to JATS. It makes the collaboration more
seamless and less painful.

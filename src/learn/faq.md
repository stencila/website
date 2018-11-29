---
extends: learn/_page.html
title: Frequently Asked Questions
smalltitle: Learn
---
**I already use RMarkdown/JupyterNotebook. How can Stencila be useful for me?**<br/>

Stencila allows you collaborate with colleagues who use other tools than RMarkdown and Jupyter Notebook,
without you having to give up your favourite tool. [Stencila Coverters](http://stenci.la/learn/integrations/converters.html) make it possible to open documents in
various formats (`R Markdown - Rmd`, `Jupyter Notebook - ipynb` and so on) in Stencila. The conversion is lossless for all interactive parts (such as code cells). Soon the Converters
will also support conversion back to the original document. You can open the file in your tool of choice and see the changes your collaborator made.
 Stencila's interface provides editing environment similar to that of Word and Excel making it a low-entry barrier
 for collaborators unfamiliar with RMarkdown or Jupyter Notebook.

 Stencila keeps track of the dependencies between the code cells supporting reactive programming. This means that when you change a particular value,
 other bits of code which depend on it, will get automatically updated. Note, that this feature can be disabled and you will be able to re-run code manually.

With Stencila you can have interactive code cells in different programming languages by enabling various execution contexts.
The data can be passed between the cells through the data interchange feature.
These two features combined with the conversion between formats means that researchers with different skillsets
can easily collaborate on the same document using their preferred programming language.

<hr/>

**I don't write any code for my research. Is Stencila for me?** <br/>

Yes, definitely Stencila is for you! Stencila allows you to write your papers just like
you would do it in a popular text editor (MS Word or similar) but you can save it directly in a format
commonly used by publishers JATS [Journal Article Tag Suite](https://en.wikipedia.org/wiki/Journal_Article_Tag_Suite)
giving you more control over the formatting of your manuscript.

Soon [Stencila Converters](http://stenci.la/learn/integrations/converters.html) will allow you saving your document
in formats compatible with other popular reproducible research tools
(such as Jupyter Notebook) creating more opportunities for collaboration.

<hr />

**What are Stencila Sheets?**<br/>

Stencila Sheets provide a way towards working within an environment similar to spreadsheet software but supporting
reproducible approach by linking sheet directly to the article allowing for capturing the analysis steps.

Stencila will tie together the data in the spreadsheet, the methods you used to process the data and the researchers
publication.

![Example of Stencila Sheet](img/stencila-mini-spreadsheet.png)

Stencila Sheets will make it possible for extending the spreadsheet functionality by registering functions written in other
programming languages. Using simple Stencila API researchers can wrap up functions written in R, Python and other
languages, register them and thus make them available through the Stencila Sheet interface.


<hr />

**I would like to try out Stencila but don't want to (or can't) install the whole suite on my machine. What can I do?**<br/>

You can use [Stencila Hub](https://github.com/stencila/hub). The Hub hosts interactive Stencila documents with
different execution contexts enabling collaboration and previewing Stencila Sheets and Articles. If you would like to access Stencila Hub,
please [contact us](mailto:hello@stenci.la).


<hr />

**I am trying to use R/Python/SQL with Stencila Desktop but I am getting this error message `No peers able to provide: R/Python/SQL Context`** <br/>

Error message `No peers able to provide....` means that there is no active execution context for the language you are trying to use. In this particular case, if
you want to use `R`, `Python` or `SQL` within Stencila, you need to make sure you enabled the relevant execution context.
See the [installation instructions](../use/install.html#use-other-programming-languages) for details.

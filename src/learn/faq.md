---
extends: learn/_page.html
title: Frequently Asked Questions
smalltitle: Learn
---
**I already use RMarkdown/JupyterNotebook. How can Stencila be useful for me?**<br/>

Stencila allows you collaborate with colleagues who use tools other than RMarkdown and Jupyter Notebook,
without you having to give up your favourite tool. [Stencila Encoda](http://stenci.la/learn/integrations/converters.html) makes it possible to open documents in
various formats (`RMarkdown - Rmd`, `Jupyter Notebook - ipynb` and so on) in Stencila. The conversion is lossless for all interactive parts (such as code cells), and support conversion back to the original document. You can open the file in your tool of choice and see the changes your collaborator made.

 Stencila keeps track of the dependencies between the code cells supporting reactive programming. This means that when you change a particular value,
 other bits of code which depend on it, will get automatically updated. Note, that this feature can be disabled and you will be able to re-run code manually.

With Stencila you can have interactive code cells in different programming languages by enabling various execution contexts.
The data can be passed between the cells through the data interchange feature.
These two features combined with the conversion between formats means that researchers with different skillsets
can easily collaborate on the same document using their preferred programming language.

<hr/>

**I don't write any code for my research. Is Stencila for me?** <br/>

Yes, definitely Stencila is for you! Stencila allows you to write your papers just like
you would in a word processor (MS Word or similar) but you can save it directly in a format
commonly used by publishers (JATS, [Journal Article Tag Suite](https://en.wikipedia.org/wiki/Journal_Article_Tag_Suite))
giving you more control over the formatting of your manuscript.

[Stencila Encoda](http://stenci.la/learn/integrations/converters.html) allows you to save your document
in formats compatible with popular reproducible research tools
(such as Jupyter Notebook) creating more opportunities for collaboration.

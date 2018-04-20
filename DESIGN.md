# Stencila website design guide

> This is a design guide for the Stencila website at https://stenci.la.
It outlines the goals of each of the site's areas, pages and sections.
We love contributions! Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) if you'd
like to help out.



## Terminology

- An "area" is a top level part of the site (e.g. `/learn/`) and can have "sub-areas" (e.g. `/learn/getting-started/`).
- A "page" is a web page inside an area (e.g. `/learn/getting-started/installation.html`).
- A "section" is a section of a page and usually represented by a `<div class="section">` element and/or a header (i.e. using `#` in Markdown).



## Area `/learn`

### Sub-area `/learn/languages`

The goals and structure of each page in this sub-area are the same (but obviously the context differs for each language).

> Goal: A reader wanting to use language X within Stencila documents (e.g. writing code cells, creating new functions) will understand how to do that and know that they can come back to the page as a reference (e.g. for the syntax for functions).

Each page will have plenty of examples for the language and links to references/tutorials for that language. 

There is a page for each language supported by Stencila.

#### Page `/learn/languages/javascript.html`
#### Page `/learn/languages/mini.html`
#### Page `/learn/languages/python.html`
#### Page `/learn/languages/r.html`
#### Page `/learn/languages/sql.html`

The sections in each page will be:

##### Section `Data`

- a table of the mapping between Stencila data types and the language's native data types

##### Section `Cells`

- how cell `inputs` and `output` are determined
- any gotchas with writing cells for the language

##### Section `Functions`

- how to implement functions in the language
	- argument type checking
	- repeatable and extensible parameters

- how to document functions in the language
	- function description, examples etc
	- parameter types, description etc
	- return type


## Area `/blog`

> Goal: 

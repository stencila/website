---
extends: learn/_page.html
title: Use SQL with Stencila
smalltitle: Learn/Languages
---

## Installation (Node.js context)

The [Stencila Node.js package](https://github.com/stencila/node) provides the `NodeContext` with the `SQLiteContext` for executing SQL (Structured Query Language) code from within Stencila documents.

This package comes bundled with Stencila Desktop so it does not need to be installed separately. But, for completeness, and because you may want to use it from another client application, we include these installation instructions here.

> i You may need to install `npm` first. [On Windows, these instructions](http://blog.teamtreehouse.com/install-node-js-npm-windows) may be useful.

Open a terminal session (on Windows, go to "Start" and then in "Search for programmes and files" type `cmd`) and type in:

```bash
npm install stencila/node -g
```

> i Although this package is [available on NPM](https://www.npmjs.com/package/stencila-node), we currently recommend installing directly from the `master` branch on Github as per the above instructions

Then register the package's manifest so that it can be found by other Stencila packages,

```bash
stencila-node register
```

## Code execution

Stencila keeps track of the code dependecies between the code cells. It supports reactive programming which means that the code and the respective outputs
will get updated, when you change a piece of code they depend on. It is a similar principle as behind the behavior of spreadsheet applications.
You can refer to specific outputs from any code cell in any part of your Stencila document. Stencila does all this using its [execution engine]().

What inputs and outputs of a code cell are vary slightly between programming languages that you use in Stencila.  
For cells written using SQL, the inputs are determined by parsing the `FROM` clause of the SQL statement.
For example, the following cell has a single input `people`, the value of the cell is the result of
the evaluation of SQL statement and the output is empty (`null`).

```sql
SELECT * FROM people ORDER BY height DESC
```

Parsing of inputs from more complicated SQL statements involving joins or sub-queries is currently not supported.

The the standard syntax of SQL means that the above cell has empty output in Stencila. If you want to capture the value of the evaluation of the cell
as the cell output, you need to explicitly use the assignment operator before the `SELECT` statements.
For example, the following cell has an output `brown_hair` and an input `people`.

```sql
brown_hair = SELECT * FROM people WHERE hair_color == 'Brown'
```

## Data interchange

Stencila provides you with ability to use multiple programming languages to write interactive code within
one document, working on the same data. In other words, you can manipulate the same data switching between different programming
languages. This capability is achieved through `data interchange` feature.

When you pass data between cells Stencila temporarily converts it into its internal schema representation.
Currently, only the `table` data type can be exchanged with SQL. All data values are stored as temporary tables.

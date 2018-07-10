---
extends: learn/_page.html
title: Use JavaScript with Stencila
---

Stencila allows you use interactive JavaScript code  within Stencila articles, notebooks and sheets. JavaScript comes with basic Stencila installation so you can
manipulate and visualise data using JavaScript straight from the start.

If you want the code in the code cell be interpreted as JavaScript, you need to select the `JS` context:

![JavaScript in Stencila Cell](../img/js-context.png){style="align:center; width:100%" }


## Code execution

Stencila keeps track of the code dependecies between the code cells. It supports reactive programming which means that the code and the respective outputs
will get updated, when you change a piece of code they depend on. It is a similar principle as behind the behavior of spreadsheet applications.
You can refer to specific outputs from any code cell in any part of your Stencila document. Stencila does all this using its [execution engine]().

What inputs and outputs of a code cell are vary slightly between programming languages that you use in Stencila.  For cells written in Javascript,
if you want to capture the output of the cell so that you can refer to it throughout the document, you need to create a variable and assign (`=`) the output. To be more precise, you are capturing the _result of the evaluation of the cell_.
Note that, the variables in Stencila are non-mutable.

For example:

```js
var x = 4
var y = Math.sqrt(x)
```
Now you can refer to the output of the cell using the variable `y`.

If you do not capture the output explicitly, you will not be able to refer to it later on. For example:

```js
var x = 4
Math.sqrt(x)
```
The result of the `Math.sqrt(x)` is `2` but you will not be able to refer to it since it has not been captured explicitly in a variable.
Summarizing: the output of this cell is not captured and the result of evaluating this cell is 2 (`Math.sqrt(4)`).

## Data interchange

Stencila provides you with ability to use multiple programming languages to write interactive code within
one document, working on the same data. In other words, you can manipulate the same data switching between different programming
languages. This capability is achieved through `data interchange` feature.

When you pass data between cells Stencila temporarily converts it into its internal schema representation.
The table below shows (roughly) how data interchange between the schema and JavaScript is implemented.

| Schema representation | JavaScript |
|:----------------------|:-----------|
| Boolean               | boolean    |
| Integer               | number     |
| Float                 | number     |
| String                | string     |
| Array                 | array      |
| Object                | object*    |
| Table                 | table      |

\*The object fields and methods are saved within the schema-defined object/array and converted accordingly.

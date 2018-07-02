---
extends: learn/_page.html
title: Use R with Stencila
---

![Stencila R Context](../img/r-context.png){style="display: inline; width: 25%; margin: 0 auto; padding-right: 1em; padding-top: 1em; float: left;" }

Stencila allows you use interactive R code within Stencila articles, notebooks and sheets.
In order to be able to use R within Stencila documents you need to
[enable the execution context](#installation).

You can write R code
just like you would in any other editor or reproducible notebook. You can install R packages and import them,
create and embed plots, and so on.

You can write the contents of Stencila cells in R as well as make your existing R functions available in Stencila through [function libraries](#functions).

## Installation

>! We are currently working on making the Stencila R package compatible with the latest Stencila Desktop. During that process, not all functionality may be available.

The [Stencila R package](https://github.com/stencila/r) provides a `RContext` for executing R code and functions from within Stencila documents.

The package is not yet available on CRAN, so you need to install directly from our Github repository using the [`devtools`](https://github.com/hadley/devtools) package.

>i You may need to install `devtools` first using `install.packages("devtools")` from within an R session

Launch a R session on your machine and type:

```r
devtools::install_github("stencila/r")
```

Then register the package's manifest so that it can be found by the Stencila Desktop and other Stencila packages,

```r
stencila:::register()
```


## Data interchange

Stencila provides you with ability to use multiple programming languages to write interactive code within
one document, working on the same data. In other words, you can manipulate the same data switching between different programming
languages. This capability is achieved through `data interchange` feature.

When you pass data between cells Stencila temporarily converts it into its built-in [Mini language](minihtml) data type.
The table below shows (roughly) how data interchange between Mini and R is implemented. For more details
see [source code](https://github.com/stencila/r/blob/master/R/type.R).

| Mini     | R                    |
|:--------|:---------------------|
| boolean | logical              |
| integer | integer              |
| float   | numeric              |
| string  | character            |
| array   | R vector             |
| object  | R list               |
| object  | R object*            |
| table   | DataFrame, matrix    |
| plot    | recordedplot, ggplot |

\*The object fields and methods are saved within the Mini object/array and converted accordingly.


## Cells

With Stencila you have full control over the sequence in which your code cells are executed. You can run the code in asynchronous order.
You can refer to specific outputs from the given cell in any part of your Stencila document.
Stencila does all this using its [execution engine](computation/engine.md).

The engine manages automatic dependencies between the cells which are specific for each language. For cells written in
R it is farily simple.  If you want to capture the output of the cell,
create a variable and assign (`<-`) the output.
Note that the variables in Stencila are non-mutable :sparkles: . Whatever is on the right hand of the assignment (`<-`)
will become the cell input.

You can the refer to this cell's input and output in the Stencila document.

If you do not capture the output explicitly, you will not be able to refer to it later on. But the input of the cell
will still be available.

For example:

```r
x <- 4
sqrt(x)
```

The input for this cell is `x`, the output is empty (`null`) and the value is 2 (`sqrt(4)`).

If you want to caputure the output and be able to refer back to it in the future you need to
modify the cell as follows:

```r
x <- 4
y <- sqrt(x)
```

The output is now `y` and you can refer back to this variable in any other cell in Stencila.

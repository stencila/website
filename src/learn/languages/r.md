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

The [Stencila R package](https://github.com/stencila/r) provides a `RContext` for executing Python code and functions from within Stencila documents.

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

| Mni     | R                    |
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



## Functions
You can make almost any R functions for data manipulation available from within Stencila by using our API (which is a simple wrapper). You can either contribute
new functions to the existing domain-specific libraries or create a [new domain-specific library](https://github.com/stencila/libtemplate)
 and add your functions there.

Please modularise your code and put only one function in one  `.R` file  e.g. `R/sum.R` for the `sum` function.

### Test

To test your function implementation, create a new test file in the `tests/testthat` folder e.g. `tests/testthat/test_sum.R` for the `sum` function.
Install some useful R packages for package development and testing, if you don't already have them,

```r
install.packages(c('devtools', 'roxygen2', 'lintr', 'testthat', 'covr'))
```

Check for lint,

```bash
lintr::lint_package()
```

Then run all the tests,

```bash
devtools::test()
```

Alternatively, you can run the tests and calculate test coverage using,

```bash
covr::package_coverage()
```

### Register

> :sparkles: We are working on getting the function registration to work so not everything described below may already be available.

You need to register your new function to make it available from within Stencila. You can do it either through [RStudio](https://www.rstudio.com/)
or via Stencila Sheets.

See the demo below how to register functions from RStudio.

![Registering R Functions with Stencila Spreadsheet](../img/registering-functions.gif)

In order to do
that select `Register function` from the menu and point to the main directory (for example, `libgenomics`) where the `.R` file with the function is located. Stencila will automatically
 create the documentation from the docstring. You can then use the function within Stencila.

 If you want to make the function available for someone else using Stencila on a different machine, select `Create function package`, then point
 to the man directory with function file. Once the function package is created, select where you want to save it. You can then share the package (which
 essentially is a `zip` file). If the main directory with the function exists as a GitHub or BitBucket repository (see [these guidelines](https://github.com/stencila/libtemplate)),
 then you can simply point users to the repository.

 To register the function from the package, use the `Register function` option from the menu, as described above. If you are registering from a GitHub or BitBucket repository,
 just copy and paste the link to it.

[libraries-contribute]: computation/functions.md#domain-specific-libraries

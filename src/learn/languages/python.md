---
extends: learn/_page.html
title: Use Python with Stencila
---

Stencila allows you use interactive Python code  within Stencila articles, notebooks and sheets.
In order to be able to use Python within Stencila documents you need to
[enable the execution context](#installation).

You can write Python code
just like you would in any other editor or reproducible notebook. You can install Python packages and import them,
create and embed plots, and so on.


## Installation

>! We are currently working on making the Stencila Python package compatible with the latest Stencila Desktop. During that process, not all functionality may be available.

The [Stencila Python package](https://github.com/stencila/py) provides a `PythonContext` for executing Python code and functions from within Stencila documents.

The package is not available via PyPI (Python Package Index) yet, so you need to install it from our Github repository.

>i You may need to install `pip` first. On Windows, [these instructions](https://dev.to/el_joft/installing-pip-on-windows) may be useful.

Open a terminal session (on Windows, go to "Start" and then in "Search for programmes and files" type `cmd`) and type in:

```bash
pip install --user https://github.com/stencila/py/archive/master.zip
```
**Note** If you have [Anaconda](https://www.anaconda.com/) installed on your system, you should install the package using the following command:

```bash
pip install https://github.com/stencila/py/archive/master.zip
```

This will install `stencila` in your Anaconda directory (where it should be), rather than in your local user Python libraries directory.
If you don't do that (i.e. get the `stencila` package installed in your local user Python libraries), when you try to register `stencila`
package (see below), you will get an error as your Anaconda Python will search for `stencila` and its dependencies in the Anaconda directory.   


Then register the package's manifest so that it can be found by the Stencila Desktop and other Stencila packages,

```bash
python -m stencila register
```

**Note** If the default Python on your machine is Python 2.7 whilst you have Python 3.6 installed and you would like to use it with Stencila, then you need
to install `stencila` using `pip3` and then register it explicitly using `python3`:

```bash
pip3 install --user https://github.com/stencila/py/archive/master.zip
```

```bash
python3 -m stencila register
```

## Code execution

Stencila keeps track of the code dependecies between the code cells. It supports reactive programming which means that the code and the respective outputs
will get updated, when you change a piece of code they depend on. It is a similar principle as behind the behavior of spreadsheet applications.
You can refer to specific outputs from any code cell in any part of your Stencila document. Stencila does all this using its [execution engine]().

What inputs and outputs of a code cell are vary slightly between programming languages that you use in Stencila.  For cells written in Python,
if you want to capture the output of the cell so that you can refer to it throughout the document, you need to create a variable and assign (`=`) the output. To be more precise, you are capturing the _result of the evaluation of the cell_.
Note that, the variables in Stencila are non-mutable.

For example:

```python
import math

x = 4
y = math.sqrt(x)
```

Now you can refer to the output of the cell using the variable `y`.

If you do not capture the output explicitly, you will not be able to refer to it later on. For example:

```python
import math

x = 4
math.sqt(x)
```

The result of the `math.sqrt(x)` is `2` but you will not be able to refer to it since it has not been captured explicitly in a variable.
Summarizing: the output of this cell is not captured and the result of evaluating this cell is `2` (`math.sqrt(4)`).

## Data interchange
Stencila provides you with ability to use multiple programming languages to write interactive code within
one document, working on the same data. In other words, you can manipulate the same data switching between different programming
languages. This capability is achieved through `data interchange` feature.

When you pass data between cells Stencila temporarily converts it into its internal schema representation.
The table below shows (roughly) how data interchange between the schema and Python is implemented. For more details
see [source code](https://github.com/stencila/py/blob/master/stencila/value.py).

| Schema representation | Python           |
|:----------------------|:-----------------|
| Boolean               | bool             |
| Integer               | int              |
| Float                 | float            |
| String                | str              |
| Array                 | Python list      |
| Object                | Python object*   |
| Table                 | pandas.DataFrame |

\*The object fields and methods are saved within the schema-defined object/array and converted accordingly.

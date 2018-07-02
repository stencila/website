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


## Data interchange
Stencila provides you with ability to use multiple programming languages to write interactive code within
one document, working on the same data. In other words, you can manipulate the same data switching between different programming
languages. This capability is achieved through `data interchange` feature.

When you pass data between cells Stencila temporarily converts it into its built-in [Mini language](mini.html) data type.
The table below shows (roughly) how data interchange between Mini and Python is implemented. For more details
see [source code](https://github.com/stencila/py/blob/master/stencila/value.py).

| Mni     | Python           |
|:--------|:-----------------|
| boolean | bool             |
| integer | int              |
| float   | float            |
| string  | str              |
| array   | Python list      |
| object  | Python object*   |
| table   | pandas.DataFrame |

\*The object fields and methods are saved within the Mini object/array and converted accordingly.


## Cells
With Stencila you have full control over the sequence in which your code cells are executed. You can run the code in asynchronous order.
You can refer to specific outputs from the given cell in any part of your Stencila document.
Stencila does all this using its [execution engine](computation/engine.md).

The engine manages automatic dependencies between the cells which are specific for each language. For cells written in
Python it is fairly simple.  If you want to capture the output of the cell, create a variable and assign (`=`) the output.
Note that the variables in Stencila are non-mutable :sparkles: . Whatever is on the right hand of the assignment (`=`)
will become the cell input.

You can the refer to this cell's input and output in the Stencila document.

If you do not capture the output explicitly, you will not be able to refer to it later on. But the input of the cell
will still be available.

For example:

```python
import math

x = 4
math.sqt(x)
```

The input for this cell is `x`, the output is empty (`null`) and the value is 2 (`math.sqrt(4)`).

If you want to capture the output and be able to refer back to it in the future you need to
modify the cell as follows:

```python
import math

x = 4
y = math.sqrt(x)
```

The output is now `y` and you can refer back to this variable in any other cell in Stencila.

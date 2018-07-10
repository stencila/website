---
extends: learn/_page.html
title: Mini programming language
next_ignore:
    label: JavaScript
    url: /learn/languages/javascript.html
---

> This section contains detailed documentation for Stencila built-in language Mini.

Stencila comes with its own simple expression language called Mini. We developed it so that When you install Stencila you can immediately
try it out without having to install and configure additional packages and programming languages.

Mini is implemented in JavaScript and is only slightly more advanced than the expressions that you write in your calculator or into the cell of a spreadsheet.
It is intended to be easy to write code in and easy to understand.

Note that since you can use multiple languages in one Stencila document, you can use these languages to manipulate variables created using Mini.   


**Learn about Mini's :**

* [Data types](#data-types)
* [Functions](#functions)
* [LibCore](#libcore)
* [Operators](#operators)


## Data types

Mini comes with a set of built-in data types which is similar to most high level programming languages.
Each type can be constructed using literals - Mini will interpret it as relevant data type.

| Type    |        Literal         | Usage example                                     | Notes                                                                                                             |
|:--------|:----------------------:|:--------------------------------------------------|:------------------------------------------------------------------------------------------------------------------|
| boolean |      true / false      | full = true                                       |                                                                                                                   |
| float   |      3.141592654       | pi = 3.141592654                                  |                                                                                                                   |
| integer |           42           | x = 42                                            |                                                                                                                   |
| string  | 'hello' <br /> "hello" | name = "hello"                                    | Strings are sequences of characters. <br/> String literals can use either single <br/> or double quotation marks. |
| array   |       [1, 2, 3]        | num = [1, 2, 3] <br/> ['hello world', [1, 2], {}] | An array is a sequence <br/> of values. The values in an array <br/> can have different types                     |


### Objects
A more complex built-in data type in Mini is an object. Objects are collections
 of  _key_ and _value_ pairs. In the example below, the keys are `a` and `b` while values are `1` and `2`:

```mini
{a: 1, b: 2}
```
The values and keys can be of different basic Mini types. You can list the keys and values of the object using JavaScript syntax:

```mini
my_object = {a: 1, b: 2}
Object.keys(my_object)
```

You can refer to the values in the object using the keys in the following way:

```mini
my_object["a"]
```

### Tables
Tables are a special kind of objects in Mini. Having tables as built-in objects in Mini allows
for better [data and object conversions]() between languages. An example of
a table in Mini:

```mini
{
  type: "table",
  data: {
      "col1": [A1, A2, A3],
      "col2": [B1, B2, B3],
      "col3": [C1, C2, C3]
  }
}
```
To access an element of the table, you need to use the [dot operator](#dot-operator).
For example:

```mini
  my_table = {
    type: "table",
    data: {
        "col1": [A1, A2, A3],
        "col2": [B1, B2, B3],
        "col3": [C1, C2, C3]
    }
  }

  my_table.col3[2]
```

In the above example the value of `my_table.col3[2]` would be `C3` as Mini indexes from zero (0).


### Function calls

Functions are called using parentheses containing arguments: e.g

```mini
add(1, 2)
```

Named arguments can be used, but only after unnamed arguments. e.g.

```mini
add(1, other=2)
```

Mini comes with a set of built-in functions which are defined in its standard library, [LibCore](https://github.com/stencila/libcore/tree/master/funcs). You can use
these functions in Stencila without having to install any additional packages. Calling the functions is done like described above.


## Operators

Most operators in Mini are simply shortcuts to writing function calls. For example, the forward slash operator `/` is a short cut for the `divide` function, so the expression `4/5`, is equivalent to the function call expression `divide(4, 5)`.

This allows you to write shorter, more readable and comprehensible expressions. For example, instead of writing a nested set of calls like:

```mini
and(less(add(a, b), 10), equal(c, 1))
```

You can write:

```mini
a + b < 10 && c == 4
```

However, there are two operators, the dot (`.`) and the (`|`) pipe which behave differently.

### Dot operator

The dot operator, `.`, is used to select members from an object or table. For example, to get a column `age` from a table named `data` you use `data.age` which is equivalent to `select(data, 'age')`. When used in this way, the dot operator acts like a function call shortcut just like the other operators.

But the dot operator can also be used to define a _symbol_ within a syntax expression. A syntax expression is a partially evaluated expression that can be used as an argument in a function call so that it's evaluation can be completed within an alternative scope. For example, the second parameter of the `filter` function is a syntax expression e.g.

```mini
filter(data, .age < 40)
```

For more see [lambdas](#lambdas).

### Pipe operator

The pipe operator, `|`, allows for several function calls to be combined in a "pipeline". It passes the expression on the left as the first argument of the function call on the right. So a set of nested function calls like:

```mini
sum(select(filter(data, 'row.age <= 40'), 'weight'))
```

can be written in a more readable pipeline as:

```mini
data | filter('row.age <= 40') | select('weight') | sum()
```

### Operator precedence

Operators have differing levels of precedence. Precedence determines the order in which operators are parsed with respect to each other. Operators with higher precedence become the operands of operators with lower precedence. Operator precedence in Mini is very similar to that in other languages.

The following table list the operators in Mini in order of decreasing precedence (in groups of equal precedence) along with their function call equivalents. See [`stencila/libcore`](https://github.com/stencila/libcore) for implementation and documentation for these functions.

| Precedence |   Operator   | Usage example                | Function call equivalent         |
|:-----------|:------------:|:-----------------------------|:---------------------------------|
| 1          |     `.`      | `value.member`               | `select(value, member)`          |
| 1          |     `[]`     | `value[member]`              | `select(value, member)`          |
| 2          |     `!`      | `!value`                     | `not(value)`                     |
| 2          |     `+`      | `+value`                     | `positive(value)`                |
| 2          |     `-`      | `-value`                     | `negative(value)`                |
| 3          |     `^`      | `value ^ expon`              | `pow(value, expon)`              |
| 4          |     `*`      | `value * other`              | `multiply(value, other)`         |
| 4          |     `/`      | `value / other`              | `divide(value, other)`           |
| 4          |     `%`      | `value % other`              | `remainder(value, other)`        |
| 5          |     `+`      | `value + other`              | `add(value, other)`              |
| 5          |     `-`      | `value - other`              | `subtract(value, other)`         |
| 6          |     `<`      | `value < other`              | `less(value, other)`             |
| 6          |     `<=`     | `value <= other`             | `less_or_equal(value, other)`    |
| 6          |     `>`      | `value > other`              | `greater(value, other)`          |
| 6          |     `>=`     | `value >= other`             | `greater_or_equal(value, other)` |
| 7          |     `==`     | `value == other`             | `equal(value, other)`            |
| 7          |     `!=`     | `value != other`             | `not_equal(value, other)`        |
| 8          |     `&&`     | `value && other`             | `and(value, other)`              |
| 9          | &#124;&#124; | `value `&#124;&#124;` other` | `or(value, other)`               |
| 10         |    &#124;    | `value `&#124;` cos()`       | `cos(value)`                     |

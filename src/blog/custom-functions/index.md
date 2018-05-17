---
extends: blog/_post.html
title: Custom functions in Stencila
author: Oliver Buchtala
date: 17 May 2018
abstract: This post describes a solution to allow for custom user functions.
---

Nokome Bentley and Oliver Buchtala have investigated options to write custom functions in Stencila and found a very simple and generic solution. 

Cells can return a special value of type `function`. This does not differ very much from other return values, such as a `number`.
Returned functions are however special, they are passed around just as the information necessary to ask the Stencila execution context to actually run the function.
This approach introduces only a rather tiny concept, but has a huge impact: for example a cell executed in R can register a function, which can be executed in every other context, e.g. in Javascript.
Reactive evaluation, i.e. automatic updates, are coming for free, as functions are just treated as regular values.

## Example

A function could be defined in Javascript:

```js
function hello(you) {
  return "Hello " + you + "!""
}
```

When executed in Stencila's `JavascriptContext`, this cell returns a function that is known to the Stencila `Engine` by the name `hello`.
Any other cell can then call it, for example a cell written in Mini:

```mini
me = 'Anna'
```

```mini
hello(me)
```

The engine knows that `me = "Anna"` and that `hello` is a function registered the by the `JavascriptContext`.
When it comes to evaluation of the second cell, it will ask the context to evaluate `hello` with the value `Anna` for it's `you` argument.

This is how it looks in action:

![Example](stencila-hello-anna.gif)

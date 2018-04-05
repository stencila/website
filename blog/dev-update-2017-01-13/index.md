---
title: "Development update: Javascript execution contexts and Markdown extensions for interactive documents"
author: Nokome Bentley
date: 13 January 2017
abstract: |
	On Node.js-like Javascript execution within documents, Markdown extensions for inputting and outputting document variables, and a little demo of how they can all be put together in a reactive document.
---

# Blog posts are Stencila Documents

First, a reminder that this blog post, like all our other blog posts, is a Stencila Document. That is, it is a document that resides in the memory of your browser, not as a [DOM tree](https://en.wikipedia.org/wiki/Document_Object_Model) but as a [Substance](http://substance.io)-based data structure. It got there by Javascript from the [`stencila/web`](https://github.com/stencila/web) package which parsed [this HTML](https://github.com/stencila/blog/blob/master/dev-update-2017-01-13/index.html) (statically hosted on Github pages). That HTML was generated from [this Markdown](https://github.com/stencila/blog/blob/master/dev-update-2017-01-13/post.md) using the [`stencila/node`](https://github.com/stencila/node) package (which uses Pandoc for Markdown parsing). 

We've set some document options that befit a blog post: `edit=0` so you can't edit it, and `naked=1` so that document menus don't show (you can override those by appending `?edit=1&naked=0` to the URL). But apart from that, as you will see below, it's a dynamic, interactive document.

# Javascript execution context

The [`stencila/js`](https://github.com/stencila/js) package was established a few weeks ago. It contains code that is shared amongst other Stencila Javascript-based packages: `node` (the package for Node.js) and `web` (the package for web browsers). Currently, the most interesting thing in the package is the `JsSession` class. It's a Javascript execution context which fits the model for data driven content [described here](http://blog.stenci.la/chunks-n-funcs/). It can be used in either Node.js or the browser to execute chunks of Javascript code - basically, it's a fancy `eval`. This week I added some added features to it to allow a Node.js-like experience in the browser:

- transpilation to [ES2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) using [Bublé](https://buble.surge.sh/guide/)
- a `require` for the browser using [wzrd.in](https://wzrd.in/) the 'browserify-as-a-service' service

Both Bublé and wzrd.in reminded me how awesome the open source software ecosystem is at making it so easy to implement stuff like this. Big thanks to Rich Harris, Max Ogden, Joshua Holbrook, James Halliday and all the others who contributed to those projects.

So, without further ado...here's an execute directive in ES2015 Javascript that uses the NPM package [`simple-statistics`](http://simplestatistics.org/) to perform a linear regression in your browser and display the result in your document. You should be able to edit that code (e.g. change some of the numbers), click the play button, and see the results change.


```js(){show=true}
// Dynamically fetch and import a NPM package
const stats = require('simple-statistics')

// Define some data points (pairs of x and y)
let data = [
	[1, 0.9],
	[2, 2.3],
	[3, 2.9],
	[4, 4.2],
	[5, 5.8],
	[6, 6.2],
	// Some randomness just so the result changes each time
	[7, Math.random()]
]
// Fit a linear regression to it to get the slope (m) and intercept (b)
stats.linearRegression(data)
```

Some notes:

- you can see that execute directive because it has the option `show=true`; normally directives are not visible until you enter reveal mode (e.g. add `?reveal=1` to the URL)
- this execute directive inserts the value of the last line into the document; if you don't want that either (a) end with a comment or two blank lines, or (b) assign the output to a variable e.g. `result=js()` in the "call" at the top; in other words, the last line is the "return" value, you can either display it in the document, or you can assign it to a variable to use later.
- if you run Stencila locally, then you'll be able to run execute directives using other languages e.g. R, Python etc; in the future you'll be able to do that here as well.


# Markdown extension for execute directives

Markdown is one of the formats you can use to write and store a Stencila Document (you can also use HTML or Latex, but Markdown is the focus of development for now). Most Markdown parsers don't support the notion of an executable chunk of code - what we call in Stencila an "execute directive". So, we've got to come up with a Markdown extension to handle them.

Markdown has indented code blocks. Github Flavored Markdown (GFM) takes this further with fenced code blocks which allow you to specify the language for the code. For example, in GFM you can indicate a block of "static" R code like this:

	```r
	plot(x,y)
	```

For a block of code which is "dynamic" (i.e it will get executed), RMarkdown uses the slightly different, "braced r" format to indicate a "code chunk", potentially with some options: 

	```{r fig.width=10, echo=FALSE} 
	plot(x,y)
	```

In Stencila, because the [execution model](http://blog.stenci.la/chunks-n-funcs/) is more similar to the traditional function call of a programming language, it feels appropriate to use the traditional function call syntax with parentheses...

Execute with no input variables (as above but the parentheses indicate this will get executed),

	```r()
	plot(x,y)
	```

Execute with a input variable,

	```r(data)
	plot(x~y, data=data)
	```

Execute with input and output variables,

	```dataSummary=r(data)
	summary(data)
	```

Options controlling execution or display can be specified within braces,

	```r(){width=10, show=false}
	plot(x,y)
	```

When Pandoc parses a fenced code block it put's everything into a class attribute e.g.

```html
<pre class="a=r(b,c)"><code>...
```

To implement the desired sytax extension, all I had to do was write some code in [`DocumentMarkdownConverter`](https://github.com/stencila/node/blob/master/src/document/DocumentMarkdownConverter.js) which transforms that HTML into a Stencila HTML execute directive,

```html
<pre data-execute="r" data-output="a" data-input="b,c">...
```

# Markdown extension for setting document variables

The other aspect of the execution model that I discussed in that previous post is having HTML `<input>` elements for setting the value of document variables (values that we can then pass as inputs to execute directives like `b` and `c` in the above example). How best to represent them in Markdown? I'm not aware of any extensions which do that.

HTML input elements are inline so it seemed to be important to have a Markdown syntax that was inline-able (e.g. you might want to have an input variable that could be represented as "slide-able" number within text ala Brett Victor's [Tangle](http://worrydream.com/Tangle/) library).

Pandoc recently introduced a [`bracketed_spans`](http://pandoc.org/MANUAL.html#extension-bracketed_spans) extension which allows attributes to be attached to `<span>` elements. I decided to use them as a Markdown shortcut to both `<input>` and `<select>` elements with the rule that if a span has a name attribute then it becomes an input or select. Some examples with Markdown first, corresponding HTML second, and rendered result, here in the document, third...


### A plain old text input

```md
Cookie type: [Oatmeal]{name=cookieRecipe}
```
```html
<p>Cookie type: <input name="cookieRecipe" value="Oatmeal"></p>
```
Cookie type: [Oatmeal]{name=cookieRecipe}


### A number input

```md
When you eat [3]{name=cookies type=number} cookies, you consume ...
```
```html
<p>When you eat <input name="cookies" type="number" value="3"> cookies, you consume ...</p>
```
When you eat [3]{name=cookies type=number} cookies, you consume ...


### A number input as a slider

```md
Number of cookies I'd like to eat today: [10]{name=cookies type=range min=0 max=1000}
```
```html
<p>Number of cookies I'd like to eat today: <input name="cookies" type="range" min="0" max="1000" value="10"></p>
```
Number of cookies I'd like to eat today: [10]{name=cookies type=range min=0 max=1000}


### A boolean/checkbox input

```md
Eat cookies today? []{name=eatCookies type=checkbox}
```
```html
<p>Apply correction: <input name="eatCookies" type="checkbox"></p>
```
Eat cookies today? []{name=eatCookies type=checkbox}


### An option selector

For `<select>` elements, you set `type=select`, provide options as attributes, and put the current/default value in the square brackets:

```md
My favourite type of cookie is [peanut]{name=a type=select fortune=Fortune peanut="Peanut butter" oatmeal=Oatmeal}
```
```html
<p>My favourite cookie is <select name="a">
	<option value="fortune">Fortune</option>
	<option value="peanut" selected="true">Peanut butter</option>
	<option value="oatmeal">Oatmeal</option>
</select></p>
```
My favourite cookie is [peanut]{name=a type=select fortune=Fortune peanut="Peanut butter" oatmeal=Oatmeal}

OK, so the UI/UX for those inputs can be improved. But the focus at this stage is to define a Markdown extension syntax for defining inputs, have those converted into semantic HTML5 `<input>` and `<select>` elements, and finally rendered in dynamic documents.


# Markdown extension for displaying document variables

The corollary of having `<input>` elements to set document variables is to have `<output>` elements to display them. I've taken the same approach as with inputs - using `bracketed_spans` - but using the `value` attribute to indicate it's an output. You can also define a `format` attribute for `sprintf` formatting of the value. Here's some Markdown for an input followed by a formatted output,

	*How many cookies do you eat per day?* [1]{name=cookiesPerDay type=number}.
	Your daily cookie consumption is []{value=cookiesPerDay format="%s cookies"}.

And here's what it looks, and behaves, like (try altering the input),

*How many cookies do you eat per day?* [1]{name=cookiesPerDay type=number}.
Your daily cookie consumption is []{value=cookiesPerDay format="%.1f cookies"}.

# Putting it together in a reactive document

I'll finish off this update by putting all this together in a very simple demo of this new execution model I've been talking about. Here's some Markdown for a mini-document about cookies and calories inspired by one of Brett Victor's examples:

	### Calorific impact of alternative cookie consumptions profiles

	If I eat [0]{name=number type=number} extra []{name=type type=select fortune=fortune peanut="peanut butter" oatmeal=oatmeal} cookies ([]{value=calories} calories each) every day for the next [52]{name=weeks type=number} weeks that will be [0]{value=calories_total format="%.2f"} extra calories in total.

	```calories=js(type)
	let values = {
	  'fortune': 30.2,
	  'peanut': 71.6,
	  'oatmeal': 65.3
	}
	values[type]
	```

	```calories_total=js(number,calories,weeks)
	number*calories*weeks
	```

What's going on there? There's a paragraph which has several inputs that the user can change and a couple of outputs for calculated variables, including one with some formatting. Then there are two Javascript execute directives, the first takes the `type` of cookie as input and outputs the variable `calories`. The second, takes the variables `number`, `calories` and `weeks` as inputs and outputs the variable `calories_total`. We could have calculated the total calories in one execute directive but by splitting it up we get to display the calories per cookie in the paragraph.

When you change an input, the document updates all the execute directives and outputs that are dependent, either directly or indirectly, upon it.

So, here's what that Markdown looks like when it's actually included in this post and rendered (try playing around with the inputs; if you add the `?reveal=1` option to the end of the URL you'll also get to see the executed code chunks):

---------
### Calorific impact of alternative cookie consumptions profiles

If I eat [1]{name=number type=number} extra []{name=type type=select fortune=fortune peanut="peanut butter" oatmeal=oatmeal} cookies ([]{value=calories} calories each) every day for the next [52]{name=weeks type=number} weeks that will be [0]{value=calories_total format="%.2f"} extra calories in total.

```calories=js(type)
let values = {
  'fortune': 30.2,
  'peanut': 71.6,
  'oatmeal': 65.3
}
values[type]
```

```calories_total=js(number,calories,weeks)
number*calories*weeks
```
---------

That's a very simple introductory demo based on a trivial example. As things progress I'll be providing more compelling examples using real datasets, a mix of programming languages and data visualization eye candy :).

Comments gratefully received...here using Hypothes.is (there should be a menu for that in the top-right), on [Gitter](https://gitter.im/stencila/stencila) or by [email](mailto://nokome@stenci.la).

---
extends: learn/_page.html
prev:
    label: Installation
    url: /learn/getting-started/installation.html
next:
    label: FAQ
    url: /learn/getting-started/faq.html
---

>This section will guide you through your first steps with Stencila. You will learn how to load your data into Stencila, start analysing it with the built-in language Mini,
use other programming languages (such as R or Python) and get to work with Stencila Sheets. We will also show you how to try out Stencila on our test cloud.

# Starting with Stencila

## Try out Stencila on the Cloud

You can start with Stencila not having to install anything on your machine. All you need is Internet connection and an up-to-date browser
such as Firefox, Chrome or Internet Explorer. Simply go to Try out [Stencila Alpha](http://builds.stenci.la/stencila/) and select the last build (from the top of the list).

Start with the `Kitchen sink: a project with everything in it for testing`. It will take you to the example Stencila pack containing a Stencila Document and a Stencila Sheet.
You can swap between the Document and the Sheet by clicking the tabs at the bottom (see below):

![Kitchen sink](/learn/img/kitchen-sink.png)

### Cells

The *Kitchen sink* example is ready to edit. To edit the text, simply click where you make the changes. You will see the coursor appearing like in a word processor.
You will also see the embedded code cells.

![Code cell](/learn/img/cells.png)

By default, code cells in Stencila Documents use a built-in simple expression language called [Mini]().
You can [extend Stencila](installation,md#execution-contexts) with other languages suchas R, Python and SQL. Stencila allows you
to have executable code for more than one language within the same document. At the moment, the examples available thorough the Stencila Cloud only allow
you to use Mini but we will soon enable more programming languages.

However, Mini still allows for quite extensive data manipulation. You can see the list of functions available by clicking on the small question mark in
right bottom corner (see below):

![Mini functions](/learn/img/mini-functions.png)

## Stencila Desktop



You can use Stencila for reproducible publishing from the very start. Here's how to do that.

Try out [Stencila Alpha](http://alpha.stenci.la/example.html?archive=kitchen-sink)



### Loading data

Tabular data is an essential part of data analysis, so there is a special type called a <code>table.</code> The easiest way to create a table is by using the <code>csv</code> function which parses a string of comma separate text (in the future you'll be able to embed or link to your data more concisely that this! :sparkles: )



If you are using **Stencila Desktop**, once you launch it, you should be able to see the dashboard screen:

![Stencila Dashboard](/learn/img/stencila-dashboard.png)

Select `Welcome to Stencila` notebook and you are can now start working in the document.

### Manipulating data

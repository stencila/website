---
extends: learn/_page.html
title: Jupyter
---

# Jupyter

[Project Jupyter](http://jupyter.org/) provides software and standards for interactive computing across many programming languages. The Jupyter Notebook is an open-source web application which allows you to create and share documents that contain live code, equations, visualizations and narrative text.

This integration guide is intended for Jupyter users who are interested in using Stencila to edit Jupyter Notebook files, or want to connect to Jupyter kernels from within Stencila. We'll start with an introduction on the similarities and differences of the two tools, discuss why you might want to use both of them, and describe how to do it.

> ! The integrations between Stencila and Jupyter are preliminary and under development. To some extent, we're using documention driven design here: not everything described is fully implemented, and if it is, it could be buggy :bug:! The aim is to provide concrete examples of what these integrations could look like to get feeback for ongoing refinement. Please send as a pull request (click the Edit button below) if you have suggestions.

## Similarities and differences

On the surface, Jupyter Notebooks and Stencila Articles are very similar. But there

...differences:

### WYSIWYG v Markdown for prose

### Graph based execution

### Dependency analysis

### Local execution

In the following sections we'll look at four integrations between Stencila and Project Jupyter:

- [using Jupyter kernels within Stencila documents](#using-kernels)
- [converting Jupyter Notebooks to Stencila documents](#converting-notebooks)
- [using Binder to run Stencila execution hosts](#using-binder)

## Using Jupyter kernels within Stencila documents {id=using-kernels}

### Why?

- Use a kernel that you don't yet have installed
- Using a language that Stencila does not yet support Julia, Haskell

### How?

## Converting Jupyter notebooks to Stencila documents {id=converting-notebooks}

### Why?

### How?

##

Currently when a Jupyter notebook is imported into Stencila it is not reactive. That is because the `JupyterContext` does not do any dependency analysis (because the Jupyter kernel it bridges to does not) and so it's `compile()` method returns an empty `inputs` array for the cell.

But we could allow users to manually specify inputs and outputs in comment tags like this:

```python
# inputs: x, y
# outputs: z
z = x * y
```

Indeed, it may a good approach to provide this sort of override for all cells, regardless of context.

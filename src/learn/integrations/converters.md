---
extends: learn/_page.html
title: Stencila Encoda
---

![Stencila Encoda](/learn/img/convert.png){style="display: inline; width: 12%; margin: 0 auto; padding-right: 1em; padding-bottom: 1em; float: left;" }

Encoda provides a collection of codecs for converting between, and composing together, documents in various formats. The aim is not to achieve perfect lossless conversion between alternative document formats; there are already several tools for that. Instead the focus of Encoda is to use existing tools to encode and compose semantic documents in alternative formats.

## Install

The easiest way to use Encoda is to install the [`stencila` command line tool](https://github.com/stencila/stencila). Encoda powers `stencila convert`, and other commands, in that CLI. However, the version of Encoda in `stencila`, can lag behind the version in [this repo](https://github.com/stencila/encoda). So if you want the latest functionality, install Encoda as a Node.js package:

```bash
npm install @stencila/encoda --global
```

## Use

Encoda is intended to be used primarily as a library for other applications. However, it comes with a simple command line script which allows you to use the `convert` function directly e.g.

```bash
encoda convert notebook.ipynb notebook.docx
```

Encoda will determine the input and output formats based on the file extensions. You can override these using the `--from` and `--to` options. e.g.

```bash
encoda convert notebook.ipynb notebook.xml --to jats
```

You can decode an entire directory into a `Collection`. Encoda will traverse the directory, including subdirectories, decoding each file matching your glob pattern. You can then encode the `Collection` using the `dir` codec into a tree of HTML files e.g.

```bash
encoda convert myproject myproject-published --to dir --pattern '**/*.{rmd, csv}'
```

You can also read content from the first argument. In that case, you'll need to specifying the `--from` format e.g.

```bash
encoda convert "{type: 'Paragraph', content: ['Hello world!']}" --from json5 paragraph.md
```

You can send output to the console by using `-` as the second argument and specifying the `--to` format e.g.

```bash
encoda convert paragraph.md - --to yaml
```

| Option         | Description                                                                               |
| -------------- | ----------------------------------------------------------------------------------------- |
| `--from`       | The format of the input content e.g. `--from md`                                          |
| `--to`         | The format for the output content e.g. `--to html`                                        |
| `--theme`      | The theme for the output (only applies to HTML, PDF and RPNG output) e.g. `--theme eLife` |
| `--standalone` | Generate a standalone document, not a fragment (default `true`)                           |
| `--bundle`     | Bundle all assets (e.g images, CSS and JS) into the document (default `false`)            |
| `--debug`      | Print debugging information                                                               |

## Formats

| Format                      | Codec         | Approach | Status     |
| --------------------------- | ------------- | -------- | -----------|
| **Text**                    |
| Plain text                  | txt         | None     | β          |
| Markdown                    | md          | Extens   | α          |
| LaTex                       | latex       | -        | α          |
| Microsoft Word              | docx        | rPNG     | α          |
| Google Docs                 | gdoc        | rPNG     | α          |
| Open Document Text          | odt         | rPNG     | α          |
| HTML                        | html        | Extens   | α          |
| JATS XML                    | jats        | Extens   | α          |
| JATS XML (Pandoc-based)     | jats-pandoc | Extens   | α          |
| Portable Document Format    | pdf         | rPNG     | α          |
| **Notebooks**               |
| Jupyter                     | ipynb       | Native   | α          |
| RMarkdown                   | xmd         | Native   | α          |
| **Presentations**           |
| Microsoft Powerpoint        | pptx        | rPNG     | ✗          |
| Demo Magic                  | dmagic      | Native   | β          |
| **Spreadsheets**            |
| Microsoft Excel             | xlsx        | Formula  | β          |
| Google Sheets               | gsheet      | Formula  | ✗          |
| Open Document Spreadsheet   | ods         | Formula  | β          |
| **Tabular data**            |
| CSV                         | csv         | None     | β          |
| CSVY                        | csvy        | None     | ✗          |
| Tabular Data Package        | tdp         | None     | β          |
| **Collections**             |
| Document Archive            | dar         | Extens   | ω          |
| Filesystem Directory        | dir         | Extens   | ω          |
| **Data interchange, other** |
| JSON                        | json        | Native   | ✔          |
| JSON5                       | json5       | Native   | ✔          |
| YAML                        | yaml        | Native   | ✔          |
| Pandoc                      | pandoc      | Native   | β          |
| Reproducible PNG            | rpng        | Native   | β          |
| **Transport**               |
| HTTP                        | http        |          | ✔          |

**Key**

<details>
  <summary><b id="format-approach">Approach</b>...</summary>
  How executable nodes (e.g. `CodeChunk` and `CodeExpr` nodes) are represented

- Native: the format natively supports executable nodes
- Extens.: executable nodes are supported via extensions to the format
- rPNG: executable nodes are supported via reproducible PNG images
- Formula: executable `CodeExpr` nodes are represented using formulae

</details>

<details>
  <summary><b id="format-status">Status</b>...</summary>

- ✗: Not yet implemented
- ω: Work in progress
- α: Alpha, initial implementation
- β: Beta, ready for user testing
- ✔: Ready for production use

</details>

<details>
  <summary><b id="format-issues">Issues</b>...</summary>
  Link to open issues and PRs for the format (please check there before submitting a new issue 🙏)
</details>

If you'd like to see a converter for your favorite format, look at the [listed issues](https://github.com/stencila/encoda/issues) and comment under the relevant one. If there is no issue regarding the converter you need, [create one](https://github.com/stencila/encoda/issues/new).

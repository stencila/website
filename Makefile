# Makefile for publishing parts of the https://stencila.io website
#
# Documentation and other files are copied into this folder and
# then published to our Ghost instance using `stencila publish ghost`.
#
# Expects that `stencila/stencila` and other source repos have been
# cloned as siblings of this repo.
#
# Copied files are not committed to this repo, but the `.stencila/track/docs.json`
# file is (to keep a track of the ids of each file)

STENCILA=../stencila/target/debug/stencila

export GHOST_DOMAIN = stencila.ghost.io

# An empty recipe to force other recipes to run
# even if their target directory already exists
force:

# Publish documentation for formats
docs/formats: force
	rm -rf docs/formats
	mkdir -p docs/formats
	cp ../stencila/docs/formats/* docs/formats/
	$(STENCILA) publish ghost --publish docs/formats/*.md

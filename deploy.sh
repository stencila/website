#!/bin/bash -e

cd build
git init
git config user.name "Stencila on Travis CI"
git config user.email "travis@stenci.la"
git add .
git commit -a -m "Deploy"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/stencila/website.git" master:master

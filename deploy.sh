#!/usr/bin/env bash

wintersmith build;

git checkout --orphan build;
git rm -r --cached .;

rm .gitignore;
cp -r build/ .;

git add CNAME archive.html articles/ css/ feed.xml index.html;
git commit -m `date +%Y%m%d_%H%M%S`;
git push -f origin build:master;

# clean up
git clean -fd;
git checkout master;
git branch -D build;

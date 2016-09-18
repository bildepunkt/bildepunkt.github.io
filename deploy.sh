#!/bin/sh

# pre-commit so we don't fuck ourselves
git add -A;
git commit -m "`date +%Y%m%d_%H%M%S`-prebuild";

wintersmith build;

git checkout --orphan build;

cp -r build/ .;

git add CNAME articles/ css/ images/ scripts/ style/ tag/ feed.xml index.html;
git commit -m `date +%Y%m%d_%H%M%S`;
git push -f origin build:master;

# clean up
git checkout wintersmith;
git branch -D build;
git clean -di

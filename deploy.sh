#!/bin/sh

# pre-commit so we don't fuck ourselves
git add -A;
git commit -m "`date +%Y%m%d_%H%M%S`-prebuild";

wintersmith build;

git checkout build || git checkout --orphan build;
#git rm -r --cached .;

rm .gitignore;
cp -r build/ .;

git add CNAME archive.html articles/ css/ scripts/ style/ feed.xml index.html;
git commit -m `date +%Y%m%d_%H%M%S`;
git push -f origin build:master;

# clean up
#git clean -fd;
#git checkout dev;
git branch -D build;

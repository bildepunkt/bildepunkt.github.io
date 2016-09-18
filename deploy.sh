#!/bin/sh

# pre-commit so we don't fuck ourselves
git add -A;
git commit -m "`date +%Y%m%d_%H%M%S`-prebuild";

wintersmith build;

git checkout --orphan build;

rm .gitignore;
cp -r build/ .;

git add CNAME articles/ css/ images/ scripts/ style/ tag/ feed.xml index.html;

# skips push and stays on branch for development
if [ "$1" = "dev" ]; then
    echo "skipped push!"
    exit 0;
fi

git commit -m `date +%Y%m%d_%H%M%S`;
git push -f origin build:master;

# clean up
git checkout wintersmith;
# restore gitignore
git checkout -- .gitignore
git branch -D build;

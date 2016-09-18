---
title: "Writing a Wintersmith Deploy Script"
author: bildepunkt
date: 2016-09-17
template: article.jade
tags: wintersmith, git, shell
---

Wintersmith is a fantastic static site generator. In fact, Wintersmith is powering this very site! One of the things that drew me to Wintersmith was that it ascribes to the Unix philosophy that a program should do one thing, and do it well, and in the case of Wintersmith, that thing is to generate static content. But this leaves us without a deploy script out of the box. Not to worry though, we can whip one up pretty quick with a shell script and a few simple commands.

## Ship all the things!

_NOTE: This post assumes you have a Github repo and some knowledge of Github Pages. If not checkout [Github Pages](https://pages.github.com/) for more info._  
&nbsp;  

<!-- Okay, so you've written some sweet content and you're ready to share it with the world. The first thing you have to do is push that content to  -->

My strategy when using a static-site generator is to have a development branch (eg: `development`) that contains all of the articles, scripts, config, and styling etc., and a production branch (eg: `gh-pages`) that only contains the generated files. My workflow is then:
1. write an article/tweak some styling/make a config change
2. commit and push those changes to the `development` branch of my repo
3. build and deploy to `gh-pages`  
&nbsp;  

Let's take a look at the script:  
&nbsp;  

```sh
#!/bin/sh

# pre-commit so we don't screw ourselves
git add -A;
git commit -m "`date +%Y%m%d_%H%M%S`-prebuild";

wintersmith build;

git checkout --orphan production;

cp -r build/ .;

git add CNAME articles/ css/ images/ scripts/ style/ tag/ feed.xml index.html;
git commit -m `date +%Y%m%d_%H%M%S`;
git push -f origin production:gh-pages;

# clean up
git checkout development;
git branch -D production;
git clean -id;
```  
&nbsp;  

The first two lines commit any changes we have made because the rest of the code will obliterate them. I've shed my share of tears on mistakes like this. Next we tell Wintersmith to create a build. (If you don't have Wintersmith installed globally you may have to use `node_modules/.bin/wintersmith build` or some variation thereof) Next we create our production branch. The `--orphan` flag tells git that this branch should have no parent commits. We use this option because we don't need commit history and don't want to deal with merge conflicts.  
&nbsp;  

For hosts like Github Pages, the content is served from the root directory of the project. This doesn't work for our current setup because all of our content is in the build directory. To fix this we copy the contents of `build` into the root and then stage what we want. Admittedly, this part is cumbersome because if we add something new we have to remember to add it to the list of items to stage, but it works for now. With our content staged we can commit and push. Weeee!  
&nbsp;  

Let's break down the push command because there's a lot going on there, and if you're relatively new to git it might not all make sense.

## F it

The `-f` flag denotes a force push. This means all history will be erased!!! Sound dangerous? It is, and this options should be used sparingly. If we were to push without the `-f` flag git would complain saying "hey, you need to pull and merge before you can push again". Thanks git, you're the best. But we don't actually want to merge, and - history be damned - we just want our content up as is!

## Origins

Wondering how git knows where to push our code? With git's `remote` command you can set an alias for a repo's url via `git remote add <your-alias> <your-url>`. I called mine _origin_ in keeping with common git parlance, but we could have called it anything.

## A Tale of Two Branches

The end of our push command contains two branch names. `production` is the local branch that we're working on. `gh-pages` is where we want our code to go. The colon between the two tells git that even though these branches don't have the same name, we want the content from _local x_ to go into _remote y_.

## Cleanup

Our code is now floating out in the aether. Praise be unto the tubes. Let's do a little cleanup so we can go home. First we check out our dev branch, and then delete production so that we won't get an error the next time we run our deploy script. There are some untracked files left over from production polluting our working directory that we'll want to get rid of too. Next we use git's `clean` command to remove the leftover files polluting our working directory. The `d` flag denote the cleaning of directories, and `i` allows for an interactive clean, meaning git shows us what it will clean up and gives us the option to continue. We could assume that we just want to nuke everything that's untracked, but it's safer to add just one more little step to be sure.  
&nbsp;  

One last thing: `chmod +x` that script so you can run it!  
&nbsp;  

Thanks for reading! Feel free to comment and ask questions.
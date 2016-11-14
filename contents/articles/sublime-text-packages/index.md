---
title: "Sublime Text - Packages"
author: bildepunkt
date: 2016-11-13
template: article.jade
tags: sublime text
---

I'm pretty particular about my development environments. For writing Java I prefer IntelliJ, but for Javascript and pretty much everything else, I always come back to Sublime Text. I've tried the new breed of editor eg: Atom, VS Code, and Brackets which are all really cool and built with bleeding-edge web tech, but everytime I get into development with one of them something comes up with text selection, a missing or slightly different feature, slow, janky scrolling (I'm looking at you Atom) and I switch right back.

I also like Sublime Text because of its mature plugin ecosystem which allows for deep customization. This is made even better by a built in package manager which can be set up in under a minute.

## Package Managment

To get started with package management, fire up Sublime Text, open the console with `` ^ + ` `` (or `View > Show Console`) and paste and run the snippet posted [here](https://packagecontrol.io/installation). After execution is complete press `shift + cmd + P` (or `Tools > Command Palette`) to open the command palette and start typing "package". A list of *Package Control* commands will magically appear. Next type install and hit `return` to view all of the available packages to install!

## Portability

I have a work and personal machine, and while I like keeping a degree of seperation between them, I like having Sublime synced up. For this I make use of the `Package Control.sublime-settings` file. This file contains a list of the installed packages and can be copied from one machine to another. When Sublime is started on the other machine, it will install any of the missing packages found in the file. On Yosemite, the location of said file should be `/Users/<username>/Library/Application Support/Sublime Text 3/Packages/User`. Or you can open `Preferences > Browse Packages` and navigate to the `User` directory. Here is an example:  
&nbsp;  

```json
{
    "bootstrapped": true,
    "in_process_packages":
    [
    ],
    "installed_packages":
    [
        "Babel",
        "Better CoffeeScript",
        "DocBlockr",
        "Git",
        "GitGutter",
        "Jade",
        "JSHint",
        "JSHint Gutter",
        "Markdown Preview",
        "Material Theme",
        "Normalize Indentation",
        "Oceanic Next Color Scheme",
        "Package Control",
        "Sass",
        "SideBarEnhancements",
        "SublimeLinter",
        "SublimeLinter-contrib-eslint",
        "zz File Icons"
    ]
}
```
More options for syncing can be found [here](https://packagecontrol.io/docs/syncing).

## Updates

Updating Sublime can sometimes cause a few snags in package land. Watch for helpful changelogs that may pop up especially with interdepedent packages, and note that your user prefs may get edited. In one instance, my theme property was overwritten below the original setting after an update. It took me about half of a miserable hour to figure out that that was the problem.  

## Happy Packaging!!!
---
title: 'Web development''s new golden child: Aurelia'
date: 2016-07-11 13:42:03
layout: false
tags: [programming, javascript, aurelia]
---

I'm typically a late adopter when it comes to technology. With Javascript frameworks and libraries, it's no different. I don't have time to be the beta guinea pig, and feel comfortable letting those who enjoy that  While Aurelia is relatively new, I think it's worth get excited about based on it's adherance to web standards - HTML, ES6, and web components - and the way it doesn't try and force anything on the user. That said, I do like me some rigidity when working with monolithic applications, it keeps developers on the same page and makes debugging and adding features easier, but some frameworks implement this badly... *cough* angular. Okay, let's jump in.
<!-- more --> 
The example project is currently at the "Hello World" stage, but considering Aurelia's bootstrapping needs that seems like a good place to start. Clone or download it [here](https://github.com/c-concat-p/aurelia-webpack-app). It is based on the excellent work of [Martijn Borland](https://github.com/martijnboland).

Here is the `package.json` file. Nothing too interesting going on here except for a shite-tonne of seperate Aurelia deps.

``` json
{
  "name": "aurelia-webpack-app",
  "version": "0.1.0",
  "description": "An example Aurelia app build with Webpack instead of SystemJS/JSPM",
  "author": "Chris Peters",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/c-concat-p/aurelia-webpack-app.git"
  },
  "scripts": {
    "dev": "./node_modules/.bin/webpack-dev-server --hot --inline --progress --colors",
    "build": "./node_modules/.bin/webpack --progress --profile --colors"
  },
  "dependencies": {
    "aurelia-animator-css": "^1.0.0-beta.1.1.0",
    "aurelia-binding": "^1.0.0-beta.1.1.1",
    "aurelia-bootstrapper": "^1.0.0-beta.1.1.1",
    "aurelia-dependency-injection": "^1.0.0-beta.1.1.2",
    "aurelia-event-aggregator": "^1.0.0-beta.1.1.0",
    "aurelia-fetch-client": "^1.0.0-beta.1.1.0",
    "aurelia-framework": "^1.0.0-beta.1.1.1",
    "aurelia-history": "^1.0.0-beta.1.1.1",
    "aurelia-history-browser": "^1.0.0-beta.1.1.1",
    "aurelia-loader": "^1.0.0-beta.1.1.0",
    "aurelia-loader-default": "^1.0.0-beta.1.1.1",
    "aurelia-loader-webpack": "github:martijnboland/aurelia-loader-webpack",
    "aurelia-logging": "^1.0.0-beta.1.1.1",
    "aurelia-logging-console": "^1.0.0-beta.1.1.3",
    "aurelia-metadata": "^1.0.0-beta.1.1.3",
    "aurelia-pal": "^1.0.0-beta.1.1.1",
    "aurelia-pal-browser": "^1.0.0-beta.1.1.2",
    "aurelia-path": "^1.0.0-beta.1.1.0",
    "aurelia-route-recognizer": "^1.0.0-beta.1.1.0",
    "aurelia-router": "^1.0.0-beta.1.1.0",
    "aurelia-task-queue": "^1.0.0-beta.1.1.0",
    "aurelia-templating": "^1.0.0-beta.1.1.0",
    "aurelia-templating-binding": "^1.0.0-beta.1.1.0",
    "aurelia-templating-resources": "^1.0.0-beta.1.1.0",
    "aurelia-templating-router": "^1.0.0-beta.1.1.0",
    "core-js": "^2.0.3",
    "isomorphic-fetch": "^2.2.1"
  },
  "devDependencies": {
    "aurelia-tools": "^0.1.18",
    "aurelia-webpack-plugin": "^0.1.0",
    "babel-core": "^5.8.35",
    "babel-loader": "^5.4.0",
    "bundle-loader": "^0.5.4",
    "css-loader": "^0.23.1",
    "eslint": "^1.10.3",
    "file-loader": "^0.8.5",
    "html-loader": "^0.4.0",
    "html-webpack-plugin": "^2.8.1",
    "raw-loader": "^0.5.1",
    "style-loader": "^0.13.0",
    "url-loader": "^0.5.7",
    "webpack": "^1.12.12",
    "webpack-dev-server": "^1.14.1"
  }
}
```
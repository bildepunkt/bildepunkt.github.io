---
title: "iDraw Spiral Plugin - Part 1"
author: bildepunkt
date: 2016-09-01
template: article.jade
tags: idraw, spiral
---

I decided to invested in [iDraw](http://www.indeeo.com/) (now called _Graphic_) a few years ago when I was in need of a vector drawing program and no longer had access to an Adobe license. I am pretty happy with it (even since it's aquisition by Autodesk), but it lacks a many of the non-basic tools that I just assume will be around, so imagine my mild dismay when I wanted to add a spiral and realised, alas, there is no spiral tool! It was mild indeed because my next thought was: "Cool, I get to write one!" thanks to [iDraw's handy plugin feature](http://www.indeeo.com/idraw/plugins/api).  
&nbsp;  

## Design imitating nature  
> a spiral is a curve which emanates from a point, moving farther away as it revolves around the point.  
&mdash; Wikipedia  

&nbsp;  
There are many ways a spiral can be drawn programmatically (contiguous right angle approximation etc.) but but for the sake of performance, editability, and iDraw's API I decided to express the segments with cubic bezier curves. To keep things simple (and nail down a solid algorithm), I _first_ drew the segments as simple lines.  
&nbsp;  

<p data-height="623" data-theme-id="0" data-slug-hash="VKkAxR" data-default-tab="result" data-user="bildepunkt" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/bildepunkt/pen/VKkAxR/">spirals post - example 1</a> by Chris Peters (<a href="http://codepen.io/bildepunkt">@bildepunkt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;  

Explanation...  
&nbsp;  

Next...  
&nbsp;  

<p data-height="623" data-theme-id="0" data-slug-hash="bwNpOm" data-default-tab="result" data-user="bildepunkt" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/bildepunkt/pen/bwNpOm/">spirals post - example 2</a> by Chris Peters (<a href="http://codepen.io/bildepunkt">@bildepunkt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;  
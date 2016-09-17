---
title: "iDraw Spiral Plugin"
author: bildepunkt
date: 2016-09-01
template: article.jade
tags: idraw, spiral
---

I decided to invested in [iDraw](http://www.indeeo.com/) (now called _Graphic_) a few years ago when I was in need of a vector drawing program and no longer had access to an Adobe license. I am pretty happy with it (even since it's aquisition by Autodesk), but it lacks a many of the non-basic tools that I just assume will be around, so imagine my mild dismay when I wanted to add a spiral and realised, alas, there is no spiral tool! It was mild indeed because my next thought was: "Cool, I get to write one!" thanks to iDraw's handy [plugin feature](http://www.indeeo.com/idraw/plugins/api).  

## Design imitating nature  
> a spiral is a curve which emanates from a point, moving farther away as it revolves around the point.  
&mdash; Wikipedia  

&nbsp;  

There are many ways a spiral can be drawn programmatically (contiguous right angle approximation etc.) but but for the sake of performance, editability, and iDraw's developer API I decided to express the segments with bezier curves.  
&nbsp;  

_**NOTE:** The code we will be looking at renders a spiral approximation, which looks like, but is not, a mathematically accurate spiral._  
&nbsp;  

To keep things simple (and nail down a solid algorithm), I _first_ drew the segments as simple lines.  
&nbsp;  

<p data-height="512" data-theme-id="0" data-slug-hash="VKkAxR" data-default-tab="result" data-user="bildepunkt" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/bildepunkt/pen/VKkAxR/">spirals post - example 1</a> by Chris Peters (<a href="http://codepen.io/bildepunkt">@bildepunkt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;  

What's with the Javascript example you ask? Well my inquisitive friend, iDraw's plugins are written in Javascript! (with optional **Objective-C**-style function calls) Let's break down the web example: After some setup we draw a grid for visual reference and then center the canvas. Next, we instantiate a new spiral. The Spiral class' constructor is pretty straight forward; it sets some properties, begins a new path and moves the path's x position to that of the radius before recursively drawing the segments.  
&nbsp;  

```javascript
drawSegments () {
    this.ctx.lineTo(0, this.radius);
    this.radius += this.spread;
    this.ctx.lineTo(-this.radius, 0);
    this.radius += this.spread;
    this.ctx.lineTo(0, -this.radius);
    this.radius += this.spread;
    this.ctx.lineTo(this.radius, 0);
}
```  
&nbsp;  

In `drawSegments` we draw an ellipse with four curves. Each quarter is cumulatively added to by the spread `spread` variable on either the `x` or `y` plane. Also notice that the `radius` property is updated in every function call, so that on recursive executions the first `lineTo` is where the last one left off.

## Enter the bezier

Now that we have a solid Spiral class that draws straight lines, lets change the `drawSegment` method's `lineTo` calls to `bezierCurveTo`s.  
&nbsp;  

<p data-height="512" data-theme-id="0" data-slug-hash="bwNpOm" data-default-tab="result" data-user="bildepunkt" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/bildepunkt/pen/bwNpOm/">spirals post - example 2</a> by Chris Peters (<a href="http://codepen.io/bildepunkt">@bildepunkt</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
&nbsp;  

Cool! It looks like a spiral now. Have a look at the updated code. We've added a property `c` to the spiral class. This number is used for calculating a circular curve. We multiple it by the radius to get the proper tangent length.  
&nbsp;  

We've also added a local variable `oldRadius` which keeps track of the radius before `spread` was added. This is important because control points affect both the previous and next curve segments. The previous segment will have been calculated before radius was mutated and the new segment was drawn, thus our need for the old radius value. Honestly, figuring out the control point coordinates employed a little trial and error, but it's not too hard when you understand what the parameters are for.  
&nbsp;  

_**NOTE:** The canvas and iDraw's curveTo methods vary in one important way: for the canvas, the coordinates for control points one and two make up the first four arguments while the last two are reserved for the curve-end position. In iDraw the curve-end position is first, followed by the two control points._  
&nbsp;  

```javascript
drawSegments () {
    let oldRadius;

    this.ctx.bezierCurveTo(this.radius, this.radius * this.c, this.radius * this.c, this.radius, 0, this.radius);
    oldRadius = this.radius;
    this.radius += this.spread;
    this.ctx.bezierCurveTo(-this.radius * this.c, oldRadius, -this.radius, oldRadius * this.c, -this.radius, 0);
    oldRadius = this.radius;
    this.radius += this.spread;
    this.ctx.bezierCurveTo(-oldRadius, -this.radius * this.c, -oldRadius * this.c, -this.radius, 0, -this.radius);
    oldRadius = this.radius;
    this.radius += this.spread;
    this.ctx.bezierCurveTo(this.radius * this.c, -oldRadius, this.radius, -oldRadius * this.c, this.radius, 0);
}
```  
&nbsp;  

## The Plugin

Well, you've made it this far. I'm impressed. I wouldn't want to have to slog throught all of this... The plugin code is very similar to the demo except for a few globals like the activeDocument object and the point class which are [well documented](http://www.indeeo.com/idraw/plugins/api). Happy vectoring!  
&nbsp;  

```javascript
// spiral.idplugin

function drawSegment (doc, radius, iterations) {
    var path = [doc addPath]
    var spread = radius / 4
    var c = 0.552284749

    [path addMoveTo:CGPointMake(radius, 0)]

    while (--iterations) {
        var oldRadius

        [path addCurveTo:CGPointMake(0, radius) controlPoint1:CGPointMake(radius, radius * c) controlPoint2:CGPointMake(radius * c, radius)]
        oldRadius = radius
        radius += spread
        [path addCurveTo:CGPointMake(-radius, 0) controlPoint1:CGPointMake(-radius * c, oldRadius) controlPoint2:CGPointMake(-radius, oldRadius * c)]
        oldRadius = radius
        radius += spread
        [path addCurveTo:CGPointMake(0, -radius) controlPoint1:CGPointMake(-oldRadius, -radius * c) controlPoint2:CGPointMake(-oldRadius * c, -radius)]
        oldRadius = radius
        radius += spread
        [path addCurveTo:CGPointMake(radius, 0) controlPoint1:CGPointMake(radius * c, -oldRadius) controlPoint2:CGPointMake(radius, -oldRadius * c)]
    }

    return path;
}

function init() {
    var doc = [app activeDocument]

    var path = drawSegment(doc, 16, 12)

    [[doc activeLayer] addPathShape:path]
}

init()
```

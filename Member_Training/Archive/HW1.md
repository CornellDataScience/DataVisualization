# An Introduction to D3

Welcome to Data Visualization! This semester we will be extensively using a Javascript library called d3.js for our work. It’s a very powerful tool for our purposes because it allows for a lot of creative freedom in making visualizations.

This first tutorial will: 
1. Go over the basics of HTML, CSS, and Javascript
2. Teach some of the fundamentals of D3
3. Give you some practice with writing code in D3 and creating gists. 

If you have already worked in D3 before, refer to the "Expereinced" section. 

## Intro to D3 and Web Frameworks
Read through Web Standards, Parts of a Graph, and Data Binding in this [Intro to D3](http://square.github.io/intro-to-d3/web-standards/). 

The data join can be rather confusing in D3. Read [this article](https://bost.ocks.org/mike/join/) about joins written by Mike Bostock, the creator of D3. It's not required, but you can also check out his visualization of the data join [here](https://bl.ocks.org/mbostock/3808218).

## Examples
Go through the [examples](http://square.github.io/intro-to-d3/examples/) found on Intro to D3. When you're done you should have a page that looks like [this](https://bl.ocks.org/linnealovespie/raw/f59eefd2f3bf962fc15016f7853de068/). Instead of having all the code in one file, best practice is to split up the HTML, CSS, and Javascript for each visualization. In this case, you would have each of the following files, with imports to each: 
1. Index.html: The structure of the page
2. Style.css: Where the custom styling goes for your elements
3. Vis1.js: The d3 code for the first visualization
4. … Vis5.js: The d3 code for the fifth visualization

The code for these visualizations can be found [in the hw1 folder](https://github.com/CornellDataScience/DataVisualization/tree/master/Member_Training/hw1) but instead of just copy/paste, write out the code yourself to make sure you understand the syntax. Make sure to create a gist of your completed code (see below). 

## Experienced People
If you already know D3 and don't need the examples, your task is to create a force layout diagram. A good article can be found [here](http://d3indepth.com/force-layout/) explaining how it's done, and [Mike Bostock's example](https://bl.ocks.org/mbostock/1747543) is a good model to follow. You should also create a gist of your completed code (see the section below).

## Gists
Once you have completed the visualization(s), add them as a [gist](https://gist.github.com/) to github. Once you do so, you can see the visualizations live by replacing gist.github.com with bl.ocks.org. For example, https://gist.github.com/linnealovespie/... would become https://bl.ocks.org/linnealovespie/…

In order for the visualization to properly generate on bl.ocks, you must have a file called index.html. 





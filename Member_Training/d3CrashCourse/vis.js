//Part 1: setting up the canvas
var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 60
    },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var canvas = d3.select("body").append("svg").attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

//Part 2: make a simple circle (as needed)
/*var pts = [{x:100,y:200},{x:240,y:360},{x:450,y:570}];
console.log(pts)
canvas.selectAll('circle')
  .data(pts)
  .enter()
    .append('circle')
    .attr("cx",function(d){console.log(d.x);return d.x;})
    .attr("cy",function(d){return d.y;})
    .attr('fill','steelblue')
    .attr('r', 5);*/

//Part 3: Load data and create scales
d3.csv('irisData.csv', function (data) {
    //create separate arrays for each feature we want to compare
    var sl = data.map(function (i) {
        return i.sepalLength;
        //return parseFloat(i.sepalLength);
    });
    var sw = data.map(function (i) {
        return i.sepalWidth;
        //return parseFloat(i.sepalWidth);
    });

    //create scales in each direction
    var x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(sl)); //returns the min and max sepal length values
    var y = d3.scaleLinear()
        .range([height, 0]) //inverted because of how pixels are count on screen: y starts at top of screen
        .domain([d3.min(sw), d3.max(sw)]);
    var color = d3.scaleOrdinal(d3.schemeCategory10); //create at same time of other scales

    var circle = canvas.selectAll('.dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 3)
        .attr('cx', function (d) {
            return x(d.sepalLength);
        })
        .attr('cy', function (d) {
            return !isNaN(d) ? '' : y(parseFloat(d.sepalWidth));
        })
        .attr('fill', function (d) {
            return color(d.species);
        });
    //Optional add-on: add a label when hovering over a point
    //create the html element that will pop up on hover
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    //"listen" for when the mouse is hovering over a circle
    circle.on('mousemove', function (d) { //Optional add-on: have labels come up when hovering
            div.transition().duration(200)
                .style('left', d3.event.pageX - 20 + "px")
                .style('top', function (d) {
                    return d3.event.pageY > height ? d3.event.pageY - 30 + 'px' : d3.event.pageY + 20 + 'px';
                })
                .style('opacity', '0.9')
                .style('display', 'inline-block')
            div.html('(' + (d.sepalLength) + " , " + (d.sepalWidth) + ")");
        })
        .on("mouseout", function (d) {
            div.transition().duration(200)
                .style('opacity', '0');
        });

    //Part 3: Create axes for the dots
    var xAxis = d3.axisBottom(x);
    canvas.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
    canvas.append('g')
        .call(d3.axisLeft(sw).scale(y));
    //add the class styles to the style section above
    canvas.append('text')
        .attr('class', 'xAxisLabel')
        .attr('transform', `translate(${width},${height + 35})`)
        .text('Sepal Length');
    canvas.append('text')
        .attr('class', 'yAxisLabel')
        .attr('transform', 'rotate(-90)')
        .attr('y', -35) //we're changing y attr instead of x because we rotated it
        .text('Sepal Width');

    // ** Required: create a legend
    var legend = canvas.selectAll('legend')
        .data(color.domain()).enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
            return 'translate(0,' + i * 20 + ')';
        });
    legend.append('rect')
        .attr('x', width)
        .attr('width', 14)
        .attr('height', 14)
        .attr('fill', color)
    legend.append('text')
        .attr('x', width - 6)
        .attr('y', 9)
        .attr('text-anchor', 'end')
        .text(function (d) {
            return d;
        });

    // ***Required: K means clustering*** //

    var lines, circles, centroids;
    var points = []; // a list of all points and their current cluster

    //add all the data points
    for (var i = 0; i < sl.length; i++) {
        points.push({
            cluster: -1,
            x: sl[i],
            y: sw[i]
        });
    };

    lines = canvas.selectAll("line").data(points)
        .enter().append("line")
        .attr("x1", function (d) {
            return x(d.x);
        })
        .attr("y1", function (d) {
            return y(d.y);
        })
        .attr("x2", function (d) {
            return x(d.x);
        })
        .attr("y2", function (d) {
            return y(d.y);
        })
        .attr("stroke", "grey")
        .attr('stroke-width', '1px')
        .attr('opacity', 0.7);
    //pick one of the data points to be the location of each centroid
    centroids = new Array(3); //note that we've picked 3 centroids, this can change though
    for (var i = 0; i < centroids.length; i++) {
        var centroid_seed = Math.round(Math.random() * points.length);
        console.log(points[centroid_seed]);
        centroids[i] = {
            x: points[centroid_seed].x,
            y: points[centroid_seed].y
        }
    }

    var centroidCircles = canvas.selectAll('.centroid').data(centroids)
        .enter().append('circle')
        .attr('class', 'centroid')
        .attr('r', 5)
        .attr('fill', 'black')
        .attr('cx', function (d) {
            return x(d.x);
        })
        .attr('cy', function (d) {
            return y(d.y);
        });

    //find the nearest centroid to each point
    function nearest(point, candidates) {
        var nearest;
        var shortestDistance = Number.MAX_VALUE;
        for (var i = 0; i < candidates.length; i++) {
            var c = candidates[i];
            var distance = Math.sqrt(
                (c.x - point.x) * (c.x - point.x) +
                (c.y - point.y) * (c.y - point.y)
            );

            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearest = i;
            }
        }
        return nearest;
    }
    //update the centroid data
    function moveMeans() {
        centroids.forEach(function (centroid, i) {
            var assignedPoints = points.filter(function (point) {
                return point.cluster == i;
            });
            centroid.x = d3.mean(assignedPoints, function (d) {
                return d.x;
            });
            centroid.y = d3.mean(assignedPoints, function (d) {
                return d.y;
            });

        });
        //change the circles to reflect the updated centroid data
        centroidCircles.transition().duration(1000)
            .attr("cx", function (d) {
                return x(d.x);
            })
            .attr("cy", function (d) {
                return y(d.y);
            });

        lines.transition().duration(1000).attr("x2", function (point) {
                return x(centroids[point.cluster].x);
            })
            .attr("y2", function (point) {
                return y(centroids[point.cluster].y);
            });
    }

    function findClosest() {
        var ct = 0;
        points.forEach(function (point) {
            var newCluster = nearest(point, centroids);
            //console.log(`old cluster: ${point.cluster}, new: ${newCluster}`);
            point.cluster = newCluster;
            //console.log(`new x2:${x(centroids[point.cluster].x)}`);
        });
        //console.log(ct);
        lines.transition().duration(1000)
            .attr("x2", function (point) {
                return x(centroids[point.cluster].x);
            })
            .attr("y2", function (point) {
                return y(centroids[point.cluster].y);
            });
    }
    //make sure to update demo.html to include buttons!
    d3.select("#findclosest").on("click", findClosest);
    d3.select("#moveMeans").on("click", moveMeans);
});

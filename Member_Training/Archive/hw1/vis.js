var numbers = [ 5, 4, 10, 1 ];
var data = [
      { date: '2014-01-01', amount: 10 },
      { date: '2014-02-01', amount: 20 },
      { date: '2014-03-01', amount: 40 },
      { date: '2014-04-01', amount: 80 }
    ];

var PADDING = 30;
var WIDTH = 300;
var HEIGHT = 180;

var y = d3.scaleLinear()
  .domain([0, 80])
  .range([HEIGHT-PADDING, PADDING]);

y.domain(d3.extent(data, function(d) { return d.amount }));
var yAxis = d3.axisLeft(y).ticks(10);

var x = d3.scaleTime()
    .domain([
      new Date(Date.parse('2014-01-01')),
      new Date(Date.parse('2014-04-01'))
    ])
    .range([PADDING, WIDTH-PADDING]);

var xAxis = d3.axisBottom(x).ticks(4);

var svg = d3.select('#prompt3')
  .append('svg')        // create an <svg> element
    .attr('width', WIDTH) // set its dimentions
    .attr('height', HEIGHT);

svg.append('g')            // create a <g> element
  .attr('class', 'x axis') // specify classes
  .attr("transform", "translate(" + 0 + "," + (HEIGHT-PADDING) + ")")
  .call(xAxis);

svg.append('g')            // create a <g> element
  .attr('class', 'y axis') // specify classes
  .attr("transform", "translate(" + PADDING + "," + 0 + ")")
  .call(yAxis);

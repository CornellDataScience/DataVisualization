d3.select('#prompt6')
  .append('svg')        // create an <svg> element
    .attr('width', 300) // set its dimentions
    .attr('height', 180);

var svg = d3.select('#prompt6').select('svg');

var sales = [
  { product: 'Hoodie',  count: 12 },
  { product: 'Jacket',  count: 7 },
  { product: 'Snuggie', count: 6 },
];

var pie = d3.pie()
  .value(function(d) { return d.count })

var slices = pie(sales);

var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(50);

// helper that returns a color based on an ID
var color = d3.scaleOrdinal(d3.schemeCategory10);

var g = svg.append('g')
  .attr('transform', 'translate(150, 90)')

g.selectAll('path.slice')
  .data(slices)
    .enter()
      .append('path')
        .attr('class', 'slice')
        .attr('d', arc)
        .attr('fill', function(d) {
          return color(d.data.product);
        });

svg.append('g')
  .attr('class', 'legend')
    .selectAll('text')
    .data(slices)
      .enter()
        .append('text')
          .text(function(d) { return '* ' + d.data.product; })
          .attr('fill', function(d) { return color(d.data.product); })
          .attr('y', function(d, i) { return 20 * (i + 1); })

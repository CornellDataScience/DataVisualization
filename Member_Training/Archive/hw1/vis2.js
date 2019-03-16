var sales = [
  { product: 'Hoodie',  count: 7 },
  { product: 'Jacket',  count: 6 },
  { product: 'Snuggie', count: 9 },
];

d3.select('#prompt4')
  .append('svg')        // create an <svg> element
    .attr('width', 300) // set its dimentions
    .attr('height', 180);

var svg = d3.select('#prompt4').select('svg');

var rects = svg.selectAll('rect').data(sales);
var newRects = rects.enter();

var maxCount = d3.max(sales, function(d, i) {
  return d.count;
});

var x = d3.scaleLinear()
  .range([0, 300])
  .domain([0, maxCount]);

var y = d3.scaleBand()
  .rangeRound([0, 75])
  .domain(sales.map(function(d, i) {
    return d.product;
  }));

newRects.append('rect')
  .attr('x', x(0))
  .attr('y', function(d, i) {
    return y(d.product);
  })
  .attr('height', y.bandwidth())
  .attr('width', function(d, i) {
    return x(d.count);
  });

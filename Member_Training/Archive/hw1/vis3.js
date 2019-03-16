var days = [
  [
    { product: 'Hoodie',  count: 10 },
    { product: 'Jacket',  count: 3 },
    { product: 'Snuggie', count: 2 }],
  [
    { product: 'Hoodie',  count: 16 },
    { product: 'Jacket',  count: 7 },
    { product: 'Snuggie', count: 8 }
  ]
];

var sales_ = days[0];

function toggle() {
  sales_ = (sales_ == days[0]) ? days[1] : days[0];
  update();
}

function update() {
  var rects = svg_.selectAll('rect')
    .data(sales_, function(d, i) { return d.product });

  var enterRects = rects.enter()
    .append('rect')
      .attr('x', x_(0))
      .attr('y', function(d, i) {
        return y_(d.product);
      })
      .attr('height', y_.bandwidth())
      .attr('width', function(d, i) {
        return x_(d.count);
      });

  rects.merge(enterRects)
    .transition() // NEW
    .duration(1000) // Also NEW
      .attr('width', function(d, i) {
        return x_(d.count);
      });
};


d3.select('#prompt5')
  .append('svg')        // create an <svg> element
    .attr('width', 300) // set its dimentions
    .attr('height', 180);

var svg_ = d3.select('#prompt5').select('svg');

var rects = svg.selectAll('rect').data(sales_);
var newRects = rects.enter();

var maxCount = d3.max(sales_, function(d, i) {
  return d.count;
});

var x_ = d3.scaleLinear()
  .range([0, 300])
  .domain([0, maxCount]);

var y_ = d3.scaleBand()
  .rangeRound([0, 75])
  .domain(sales_.map(function(d, i) {
    return d.product;
  }));

newRects.append('rect')
  .attr('x', x_(0))
  .attr('y', function(d, i) {
    return y_(d.product);
  })
  .attr('height', y_.bandwidth())
  .attr('width', function(d, i) {
    return x_(d.count);
  });


var btn = document.querySelector('input');
btn.addEventListener('click', toggle);

update();

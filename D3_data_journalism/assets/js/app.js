// @TODO: YOUR CODE HERE!
// Step 1: Set up chart
// ===================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold chart
// and shift the latter by left and top margins
// ===================================
var svg = d3
.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from csv file
// ===================================
d3.csv("assets/data/data.csv").then(function(jData) {
  // Step 4:
  // Format the data and convert to numerical values
  // ===================================
jData.forEach(function(data) {
  data.poverty = +data.poverty;
  data.healthcare = +data.healthcare;
});
// Step 5: Create the scales for the chart
// ===================================
// X scale
var xLinearScale = d3.scaleLinear()
.domain([d3.min(jData, d=>d.poverty)*0.9, 
d3.max(jData, d => d.poverty)*1.1])
.range([0, width]);

// Y scale
var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(jData, d => d.healthcare)*1.1])
.range([height, 0]);

// axes
var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Step 6: Append the axes to the chartGroup
// ===================================
chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.style("font-size", "18px")
.call(bottomAxis);

chartGroup.append("g")
.style("font-size", "18px")
.call(leftAxis);

// Step 7: Append circles to the chartGroup
// ===================================
chartGroup.selectAll("circle")
.data(jData)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 12)
.attr("fill", "blue")
.attr("opacity", ".3");

chartGroup.selectAll("text.text-circles")
.data(jData)
.enter()
.append("text")
.classed("text-circles",true)
.text(d => d.abbr)
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("dy",5)
.attr("text-anchor","middle")
.attr("font-size","12px");

// Step 8: X and Y axes
// ===================================
chartGroup.append("text")
.attr("y", height + margin.bottom/2 - 10)
.attr("x", width / 2)
.attr("dy", "1em")
.classed("aText", true)
.text("In Poverty (%)");

chartGroup.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 30 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.classed("aText", true)
.text("Lack Healthcare (%)");

});

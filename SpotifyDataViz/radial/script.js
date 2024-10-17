// Set up the dimensions and margins of the graph
const margin = {top: 50, right: 150, bottom: 50, left: 60},
      width = 750 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;

// Append the SVG object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Scales for the radar chart axes
const angleSlice = Math.PI * 2 / 3;  // 3 axes (danceability, energy, popularity)
const radarRadius = radius - 40;  // Leave some padding

const radarScale = d3.scaleLinear()
  .domain([0, 100])  // Values from 0 to 100
  .range([0, radarRadius]);

// Line generator for the radar chart
const radarLine = d3.lineRadial()
  .radius(d => radarScale(d.value))
  .angle((d, i) => i * angleSlice)
  .curve(d3.curveLinearClosed);  // Smooth curve around the chart

// Tooltip setup
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load the data and parse it
d3.csv("../tamil_tracks.csv").then(function(data) {
  // Parse the data and scale `danceability` and `energy` to 0-100 scale
  data.forEach(function(d) {
    d.danceability = +d.danceability * 100;
    d.popularity = +d.popularity;
    d.energy = +d.energy * 100;
    d.year = +d.year;
  });

  // Get distinct years and populate year filter dropdown
  const years = [...new Set(data.map(d => d.year))];
  const yearFilter = d3.select("#yearFilter");
  yearFilter.selectAll("option")
    .data(years)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);

  // Function to update the radar chart based on dropdown selections
  function updateGraph() {
    const selectedYear = +d3.select("#yearFilter").property("value");
    const selectedArtist = d3.select("#artistFilter").property("value");

    let filteredData = data.filter(d => d.year === selectedYear);
    if (selectedArtist !== "All") {
      filteredData = filteredData.filter(d => d.artist_name === selectedArtist);
    }

    // If no data available, clear the chart
    if (filteredData.length === 0) {
      svg.selectAll("*").remove();
      return;
    }

    // Prepare data for the radar chart (taking the average if multiple tracks exist)
    const avgData = [
      { axis: "danceability", value: d3.mean(filteredData, d => d.danceability) },
      { axis: "energy", value: d3.mean(filteredData, d => d.energy) },
      { axis: "popularity", value: d3.mean(filteredData, d => d.popularity) }
    ];

    // Clear previous chart
    svg.selectAll("*").remove();

    // Draw the outer circle grid
    const axisGrid = svg.selectAll(".grid")
      .data([25, 50, 75, 100])
      .enter()
      .append("circle")
      .attr("class", "grid")
      .attr("r", d => radarScale(d))
      .style("fill", "none")
      .style("stroke", "#CDCDCD")
      .style("stroke-width", 0.5);

    // Draw axis lines
    const axis = svg.selectAll(".axis")
      .data(avgData)
      .enter()
      .append("g")
      .attr("class", "axis");

    // Append lines for each axis
    axis.append("line")
      .attr("x2", (d, i) => radarScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => radarScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("stroke", "gray")
      .style("stroke-width", 1);

    // Append labels for each axis
    axis.append("text")
      .attr("x", (d, i) => (radarScale(110) * Math.cos(angleSlice * i - Math.PI / 2)))
      .attr("y", (d, i) => (radarScale(110) * Math.sin(angleSlice * i - Math.PI / 2)))
      .style("font-size", "12px")
      .attr("text-anchor", "middle")
      .text(d => d.axis.charAt(0).toUpperCase() + d.axis.slice(1));

    // Draw the radar chart shape (average data)
    svg.append("path")
      .datum(avgData)
      .attr("class", "radarArea")
      .attr("d", radarLine)
      .style("fill", "#ff7f0e")
      .style("fill-opacity", 0.3)
      .style("stroke", "#ff7f0e")
      .style("stroke-width", 2);

    // Draw individual track points
    svg.selectAll(".track-point")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "track-point")
      .attr("r", 4)
      .attr("cx", d => radarScale(d.danceability) * Math.cos(angleSlice * 0 - Math.PI / 2))
      .attr("cy", d => radarScale(d.danceability) * Math.sin(angleSlice * 0 - Math.PI / 2))
      .style("fill", "steelblue")
      .style("opacity", 0.8)
      .on("mouseover", function(event, d) {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(
          `<div style="">
          <img src="${d.artwork_url}" alt="Artwork" style="width: 100px; height: 100px; border: 1px solid black; border-radius: 4px" />
            <div>
              <strong>Track:</strong> ${d.track_name}<br>
              <br>
              <strong>Danceability:</strong> ${d.danceability.toFixed(2)}<br>
              <strong>Energy:</strong> ${d.energy.toFixed(2)}<br>
              <strong>Popularity:</strong> ${d.popularity}
            </div>
          </div>`
          )
          .style("left", (event.pageX + 5) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function() {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Append individual points for energy
    svg.selectAll(".track-point-energy")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "track-point-energy")
      .attr("r", 4)
      .attr("cx", d => radarScale(d.energy) * Math.cos(angleSlice * 1 - Math.PI / 2))
      .attr("cy", d => radarScale(d.energy) * Math.sin(angleSlice * 1 - Math.PI / 2))
      .style("fill", "#2ca02c")
      .style("opacity", 0.8);

    // Append individual points for popularity
    svg.selectAll(".track-point-popularity")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("class", "track-point-popularity")
      .attr("r", 4)
      .attr("cx", d => radarScale(d.popularity) * Math.cos(angleSlice * 2 - Math.PI / 2))
      .attr("cy", d => radarScale(d.popularity) * Math.sin(angleSlice * 2 - Math.PI / 2))
      .style("fill", "#ff7f0e")
      .style("opacity", 0.8);
  }

  // Attach event listeners to dropdowns
  d3.select("#yearFilter").on("change", updateGraph);
  d3.select("#artistFilter").on("change", updateGraph);

  // Initial graph rendering
  updateGraph();
});

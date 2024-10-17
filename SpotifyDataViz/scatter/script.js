// Set up dimensions and margins for the graphs
const margin = { top: 20, right: 30, bottom: 50, left: 60 },
      width = 1400 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

// Append the first svg object to the #my_dataviz div
const svg1 = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Append the second svg object to the #yearly_dataviz div
const svg2 = d3.select("#yearly_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Tooltip setup
const tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load the data
d3.csv("../tamil_tracks.csv").then(function (data) {
  // Parse the data and convert strings to numbers
  data.forEach(function (d) {
    d.danceability = +d.danceability;
    d.popularity = +d.popularity;
    d.year = +d.year;  // Convert year to number for filtering
  });

  // Create the scales for the first scatter plot
  const x1 = d3.scaleLinear()
    .domain([0, 1]) // Danceability is usually between 0 and 1
    .range([0, width]);

  const y1 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.popularity)]) // Popularity is between 0 and 100
    .range([height, 0]);

  // Add X axis to the first scatter plot
  svg1.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x1).ticks(10))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Danceability");

  // Add Y axis to the first scatter plot
  svg1.append("g")
    .call(d3.axisLeft(y1))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Popularity");

  // Add points to the first scatter plot
  svg1.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => x1(d.danceability))
    .attr("cy", d => y1(d.popularity))
    .attr("r", 5)
    .style("fill", "#9C0B12")
    .style("opacity", 0.7)
    .on("mouseover", function (event, d) {
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html(`
        <div style="display: flex; align-items: center; padding: 5px;">
          <img src="${d.artwork_url}" alt="Artwork" style="width: 100px; height: 100px; border: 1px solid black; border-radius: 4px; margin-right: 10px;" />
          <div>
            <strong>Track:</strong> ${d.track_name}<br/>
            <strong>Artist:</strong> ${d.artist_name} <br/>
            <strong>Year:</strong> ${d.year} <br/>
            <br>
            <strong>Danceability:</strong> ${d.danceability.toFixed(2)}<br>
            <strong>Popularity:</strong> ${d.popularity}
          </div>
        </div>
      `)
      .style("left", (event.pageX) + "px")
      .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function () {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

  // Populate the dropdown with unique years
  const years = [...new Set(data.map(d => d.year))];
  const yearDropdown = d3.select("#yearDropdown");
  yearDropdown.selectAll("option")
    .data(years)
    .enter()
    .append("option")
    .attr("value", d => d)
    .text(d => d);

  // Create scales for the second scatter plot
  const x2 = d3.scaleLinear()
    .domain([0, 1])  // Same range for Danceability
    .range([0, width]);

  const y2 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.popularity)])  // Same range for Popularity
    .range([height, 0]);

  // Add X axis to the second scatter plot
  svg2.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x2).ticks(10))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Danceability");

  // Add Y axis to the second scatter plot
  svg2.append("g")
    .call(d3.axisLeft(y2))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -40)
    .attr("fill", "black")
    .style("text-anchor", "middle")
    .text("Popularity");

  // Function to update the second scatter plot based on the selected year
  function updateScatterPlot(selectedYear) {
    // Filter data based on the selected year
    const filteredData = data.filter(d => d.year === selectedYear);

    // Add points to the second scatter plot
    svg2.selectAll("circle")
      .data(filteredData)
      .join("circle")
      .attr("cx", d => x2(d.danceability))
      .attr("cy", d => y2(d.popularity))
      .attr("r", 5)
      .style("fill", d => d3.schemeCategory10[d.year % 10]) // Use different colors for different years
      .style("opacity", 0.7)
      .on("mouseover", function (event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`
          <div style="display: flex; align-items: center; padding: 5px;">
            <img src="${d.artwork_url}" alt="Artwork" style="width: 100px; height: 100px; border: 1px solid black; border-radius: 4px; margin-right: 10px;" />
            <div>
              <strong>Track:</strong> ${d.track_name}<br/>
              <strong>Artist:</strong> ${d.artist_name} <br/>
              <strong>Year:</strong> ${d.year} <br/>
              <br>
              <strong>Danceability:</strong> ${d.danceability.toFixed(2)}<br>
              <strong>Popularity:</strong> ${d.popularity}
            </div>
          </div>
        `)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  }

  // Update the second scatter plot based on dropdown selection
  yearDropdown.on("change", function() {
    const selectedYear = +this.value;
    updateScatterPlot(selectedYear);
  });

  // Initial rendering of the second scatter plot with the first year in the dropdown
  updateScatterPlot(years[0]);

  // Create a grid of scatter plots for all the years
  const gridContainer = d3.select("#grid-container");

  // Create a scatter plot for each year and display in a grid layout
  years.forEach(year => {
    // Create a container div for each scatter plot
    const plotDiv = gridContainer.append("div")
      .attr("class", "grid-item");

    // Add a title above each scatter plot to display the year
    plotDiv.append("div")
      .attr("class", "grid-item-title")
      .text(`Year: ${year}`);

    // Append an SVG for each year's scatter plot
    const svgYear = plotDiv.append("svg")
      .attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales for each scatter plot
    const xYear = d3.scaleLinear()
      .domain([0, 1])
      .range([0, 400 - margin.left - margin.right]);

    const yYear = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.popularity)])
      .range([400 - margin.top - margin.bottom, 0]);

    // Add X axis for each scatter plot
    svgYear.append("g")
      .attr("transform", `translate(0, ${400 - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xYear).ticks(5))
      .append("text")
      .attr("x", (400 - margin.left - margin.right) / 2)
      .attr("y", 35)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Danceability");

    // Add Y axis for each scatter plot
    svgYear.append("g")
      .call(d3.axisLeft(yYear))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -(400 - margin.top - margin.bottom) / 2)
      .attr("y", -35)
      .attr("fill", "black")
      .style("text-anchor", "middle")
      .text("Popularity");

    // Filter data for the current year
    const yearData = data.filter(d => d.year === year);

    // Add points to each year's scatter plot
    svgYear.selectAll("circle")
      .data(yearData)
      .join("circle")
      .attr("cx", d => xYear(d.danceability))
      .attr("cy", d => yYear(d.popularity))
      .attr("r", 5)
      .style("fill", d => d3.schemeCategory10[year % 10]) // Use color scheme for each year
      .style("opacity", 0.7)
      .on("mouseover", function (event, d) {
        tooltip.transition()
          .duration(200)
          .style("opacity", .9);
        tooltip.html(`
          <div style="display: flex; align-items: center; padding: 5px;">
            <img src="${d.artwork_url}" alt="Artwork" style="width: 50px; height: 50px; border: 1px solid black; border-radius: 4px; margin-right: 10px;" />
            <div>
              <strong>Track:</strong> ${d.track_name}<br/>
              <strong>Artist:</strong> ${d.artist_name} <br/>
              <strong>Year:</strong> ${d.year} <br/>
              <br>
              <strong>Danceability:</strong> ${d.danceability.toFixed(2)}<br>
              <strong>Popularity:</strong> ${d.popularity}
            </div>
          </div>
        `)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function () {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  });
});


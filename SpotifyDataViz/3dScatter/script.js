// Setup the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(150, 150, 400);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Tooltip setup
const tooltip = document.getElementById('tooltip');

// OrbitControls for navigation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth motion
controls.dampingFactor = 0.05;
controls.enablePan = false;    // Disable panning
controls.minDistance = 100;    // Minimum zoom distance
controls.maxDistance = 500;    // Maximum zoom distance

// Raycaster and mouse vector for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Create axes for the 3D scatter plot
const createAxes = () => {
    const axes = new THREE.Group();

    // X-Axis (Danceability)
    const xAxisGeometry = new THREE.BoxGeometry(200, 1, 1);
    const xAxisMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    const xAxis = new THREE.Mesh(xAxisGeometry, xAxisMaterial);
    xAxis.position.x = 100;
    axes.add(xAxis);

    // Y-Axis (Energy)
    const yAxisGeometry = new THREE.BoxGeometry(1, 200, 1);
    const yAxisMaterial = new THREE.MeshBasicMaterial({ color: 'green' });
    const yAxis = new THREE.Mesh(yAxisGeometry, yAxisMaterial);
    yAxis.position.y = 100;
    axes.add(yAxis);

    // Z-Axis (Popularity)
    const zAxisGeometry = new THREE.BoxGeometry(1, 1, 200);
    const zAxisMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
    const zAxis = new THREE.Mesh(zAxisGeometry, zAxisMaterial);
    zAxis.position.z = 100;
    axes.add(zAxis);

    scene.add(axes);
};

// Function to create a point in 3D space
const createPoint = (x, y, z, color, trackData) => {
    const geometry = new THREE.SphereGeometry(3, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const point = new THREE.Mesh(geometry, material);
    point.position.set(x, y, z);
    point.userData = trackData;
    return point;
};

// Light source for better 3D visibility
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(100, 200, 200);
scene.add(light);

// Utility function to clear only points in the scene
const clearPoints = () => {
    // Iterate through scene children and remove points only
    scene.children = scene.children.filter(child => {
        if (child.type === 'Mesh' && child.geometry.type === 'SphereGeometry') {
            scene.remove(child);
            return false;
        }
        return true;
    });
};

// Load and process data
d3.csv("../tamil_tracks.csv").then(data => {
    // Parse the data and scale `danceability` and `energy` to 0-100 scale
    data.forEach(d => {
        d.danceability = +d.danceability * 100;
        d.energy = +d.energy * 100;
        d.popularity = +d.popularity;
        d.year = +d.year;
    });

    // Populate year filter dropdown
    const years = [...new Set(data.map(d => d.year))];
    const yearFilter = d3.select("#yearFilter");
    yearFilter.selectAll("option")
        .data(years)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

    // Function to update the 3D scatter plot based on filters
    function update3DScatterPlot() {
        const selectedYear = +d3.select("#yearFilter").property("value");
        const selectedArtist = d3.select("#artistFilter").property("value");

        let filteredData = data.filter(d => d.year === selectedYear);
        if (selectedArtist !== "All") {
            filteredData = filteredData.filter(d => d.artist_name === selectedArtist);
        }

        // Clear previous points without removing axes and lights
        clearPoints();

        // Recreate axes (optional)
        createAxes();

        // Add points for filtered data
        filteredData.forEach(track => {
            const point = createPoint(
                track.danceability - 100, 
                track.energy - 100, 
                track.popularity - 100, 
                'orange', 
                {
                    track_name: track.track_name,
                    artist_name: track.artist_name,
                    danceability: track.danceability,
                    energy: track.energy,
                    popularity: track.popularity,
                    artwork_url: track.artwork_url
                }
            );
            scene.add(point);
        });
    }

    // Attach event listeners to dropdowns
    d3.select("#yearFilter").on("change", update3DScatterPlot);
    d3.select("#artistFilter").on("change", update3DScatterPlot);

    // Initial scatter plot rendering
    update3DScatterPlot();
});

// Event listener for mouse movement and interaction with objects
window.addEventListener('mousemove', event => {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for x and y
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the mouse position and camera
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with scene objects
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;

        // Show tooltip with track details if intersected object has user data
        if (intersectedObject.userData) {
            const { track_name, artist_name, danceability, energy, popularity, artwork_url } = intersectedObject.userData;
            tooltip.innerHTML = `
            <img src="${artwork_url}" alt="Artwork" style="width: 100px; height: 100px; border: 1px solid black; border-radius: 4px" /> <br/>
                <strong>Track:</strong> ${track_name}<br>
                <strong>Artist:</strong> ${artist_name}<br>
                <strong>Danceability:</strong> ${danceability}<br>
                <strong>Energy:</strong> ${energy}<br>
                <strong>Popularity:</strong> ${popularity}
            `;
            tooltip.style.opacity = 1;
            tooltip.style.left = (event.clientX + 10) + 'px';
            tooltip.style.top = (event.clientY + 10) + 'px';
        }
    } else {
        // Hide tooltip when not hovering over any object
        tooltip.style.opacity = 0;
    }
});

// Animation loop for rendering the scene
const animate = () => {
    requestAnimationFrame(animate);

    // Update controls for smooth interaction
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
};
animate();

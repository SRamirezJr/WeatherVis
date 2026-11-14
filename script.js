//Code for creating a dynamic bar chart provided by ChatGPT (OpenAI) 
//https://www.openai.com/ 2025    
document.addEventListener("DOMContentLoaded", function() {

  // 1. Create a list of pages for the navigation menu
  const pages = [
    { name: "Home", file: "default.htm", id: "default" },
    { name: "New York", file: "nyc.htm", id: "nyc" },
  ];

  // 2. Create a navigation section
  const nav = document.createElement("nav");

  // 3. Create a link for each page
  for (let i = 0; i < pages.length; i++) {
    const link = document.createElement("a");

    // Set the link text and destination
    link.textContent = pages[i].name;
    link.href = pages[i].file;

    // Give the link an ID to identify the page
    link.dataset.page = pages[i].id;

    // Add the link to the navigation menu
    nav.appendChild(link);
  }

  // 4. Add the navigation menu to the top of the page
  document.body.insertBefore(nav, document.body.firstChild);

  // 5. Find the name of the current HTML file
  let currentPage = window.location.pathname.split("/").pop();

  // 6. If the site loads at the home page, select index.html
  if (currentPage === "" || currentPage === "default.html") {
    currentPage = "default.html";
  }

  // 7. Find all navigation links
  const links = nav.querySelectorAll("a");

  // Check each link to see if it matches the current page
  for (let i = 0; i < links.length; i++) {
    const linkPage = links[i].getAttribute("href");

    if (linkPage === currentPage) {
      links[i].classList.add("active");
    }
  }

});
        // The NWS API endpoint for weather data 
       const nwsUrl = 'https://api.weather.gov/gridpoints/LOT/38,77/forecast'; // Chicago coordinates (38, 77)
       const nycUrl = 'https://api.weather.gov/gridpoints/OKX/33,42/forecast';
       
        

        // Fetch data from NWS API
        if (window.location.pathname.includes("default.htm")){
        fetch(nwsUrl)
        
            .then(response => response.json())
            .then(data => {
                const times = [];
                const temperatures = [];
                const colors = [];

                // Parse data (forecast times and temperature values)
                data.properties.periods.forEach(period => {
                    const formattedTime = formatTime(period.startTime);  // Convert time to a readable format
                    times.push(formattedTime);  // Time of forecast
                    temperatures.push(period.temperature);  // Temperature value
                    colors.push(getColorForTemperature(period.temperature));  // Dynamic color based on temperature
                });

                // Call function to create the bar chart with the data
                createBarChart(times, temperatures, colors);
            })
            .catch(error => console.error('Error fetching weather data:', error));

        // Function to format time into a more readable format
        function formatTime(isoTime) {
            const date = new Date(isoTime); // Convert ISO time to Date object
            return date.toLocaleString('en-US', {
                weekday: 'short', // Day of the week, e.g., "Mon"
                month: 'short', // Month, e.g., "Mar"
                day: 'numeric', // Day of the month, e.g., "19"
                hour: 'numeric', // Hour in numeric form, e.g., "6"
                minute: '2-digit', // Minute in 2 digits, e.g., "00"
                hour12: true // Use 12-hour format with AM/PM
            });
        }

        // Function to get the color based on temperature
        function getColorForTemperature(temperature) {
            if (temperature <= 50) {
                return "rgba(54, 162, 235, 0.7)";  // Blue for cool temperatures
            } else if (temperature <= 75) {
                return "rgba(75, 192, 192, 0.7)";  // Green for moderate temperatures
            } else {
                return "rgba(255, 99, 132, 0.7)";  // Red for hot temperatures
            }
        }

        // Function to create the bar chart using Chart.js
        function createBarChart(times, temperatures, colors) {
            const ctx = document.getElementById("weatherChart").getContext("2d");

            new Chart(ctx, {
                type: 'bar',  // Bar chart type
                data: {
                    labels: times,  // X-axis: Forecast times
                    datasets: [{
                        label: "Temperature (F)",
                        data: temperatures,  // Y-axis: Temperature values
                        backgroundColor: colors,  // Dynamic colors for each bar
                        borderColor: "rgba(75, 192, 192, 1)",  // Border color (same for all bars)
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,  // Temperature levels won't start at 0
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    }
                }
            });
        }
    } else{

        fetch(nycUrl)
        
            .then(response => response.json())
            .then(data => {
                const times = [];
                const temperatures = [];
                const colors = [];

                // Parse data (forecast times and temperature values)
                data.properties.periods.forEach(period => {
                    const formattedTime = formatTime(period.startTime);  // Convert time to a readable format
                    times.push(formattedTime);  // Time of forecast
                    temperatures.push(period.temperature);  // Temperature value
                    colors.push(getColorForTemperature(period.temperature));  // Dynamic color based on temperature
                });

                // Call function to create the bar chart with the data
                createBarChart(times, temperatures, colors);
            })
            .catch(error => console.error('Error fetching weather data:', error));

        // Function to format time into a more readable format
        function formatTime(isoTime) {
            const date = new Date(isoTime); // Convert ISO time to Date object
            return date.toLocaleString('en-US', {
                weekday: 'short', // Day of the week, e.g., "Mon"
                month: 'short', // Month, e.g., "Mar"
                day: 'numeric', // Day of the month, e.g., "19"
                hour: 'numeric', // Hour in numeric form, e.g., "6"
                minute: '2-digit', // Minute in 2 digits, e.g., "00"
                hour12: true // Use 12-hour format with AM/PM
            });
        }

        // Function to get the color based on temperature
        function getColorForTemperature(temperature) {
            if (temperature <= 50) {
                return "rgba(54, 162, 235, 0.7)";  // Blue for cool temperatures
            } else if (temperature <= 75) {
                return "rgba(75, 192, 192, 0.7)";  // Green for moderate temperatures
            } else {
                return "rgba(255, 99, 132, 0.7)";  // Red for hot temperatures
            }
        }

        // Function to create the bar chart using Chart.js
        function createBarChart(times, temperatures, colors) {
            const ctx = document.getElementById("weatherChart").getContext("2d");

            new Chart(ctx, {
                type: 'bar',  // Bar chart type
                data: {
                    labels: times,  // X-axis: Forecast times
                    datasets: [{
                        label: "Temperature (F)",
                        data: temperatures,  // Y-axis: Temperature values
                        backgroundColor: colors,  // Dynamic colors for each bar
                        borderColor: "rgba(75, 192, 192, 1)",  // Border color (same for all bars)
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,  // Temperature levels won't start at 0
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    }
                }
            });
        }
    }
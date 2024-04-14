// Import necessary modules
import "dotenv/config"; // Load environment variables from a .env file
import fetch from "node-fetch"; // Use node-fetch to make HTTP requests
import { Router } from "express"; // Use the Express Router to define routes

// Create a new router instance
const router = Router();

// Get the API key from environment variables
const API_KEY = process.env.API_KEY;

// Define a POST route for fetching weather information
router.post("/api/weather", async (req, res) => {
    // Extract the city from the request body
    const city = req.body.city;

    try {
        // Make an API call to find the latitude and longitude of the city
        const apiUrlForFindLatAndLon = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
        const apiCallForFindLatAndLon = await (
            await fetch(apiUrlForFindLatAndLon)
        ).json();

        // Check if the API call returned any results
        if (apiCallForFindLatAndLon.length === 0) {
            // If no results found, send a response with 0
            res.send("0");
        } else {
            // Extract the latitude and longitude of the first result
            const { lat, lon } = apiCallForFindLatAndLon[0];

            // Function to fetch weather information using the latitude and longitude
            const fetchWeatherInfo = async ({ lat, lon }) => {
                const apiUrlForFetchWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
                const fetchedWeather = await (
                    await fetch(apiUrlForFetchWeather)
                ).json();
                return fetchedWeather;
            };

            // Call the fetchWeatherInfo function to fetch weather information
            const fetchedWeather = await fetchWeatherInfo({ lat, lon });

            // Send the fetched weather information as a JSON response
            res.json(fetchedWeather);
        }
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.sendStatus(500); // Send a 500 status code for internal server error
    }
});

// Export the router
export default router;

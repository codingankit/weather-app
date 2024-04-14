// Import necessary modules
import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";

// Import route handlers
import fetchWeather from "./fetchWeatherInfo.js";

// Set the global __dirname to the current directory
global.__dirname = path.resolve();

// Define the port number
const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000

// Get the allowed origin from the environment variables and convert it to uppercase
const ACCESS_CONTROL_ALLOW_ORIGIN = process.env.ACCESS_CONTROL_ALLOW_ORIGIN;

// Define the path to the views directory
const views = path.join(__dirname, "build");

// Create an Express application
const app = express();

// Serve static files from the 'frontend/static' directory
app.use(express.static(views));

// Set up CORS middleware with a specific allowed origin
app.use(
    cors({
        origin: ACCESS_CONTROL_ALLOW_ORIGIN
    })
);

// Parse JSON bodies in requests
app.use(express.json());

// Route for the homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(views, "index.html"));
});

// Route for fetching weather information
app.use(fetchWeather);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

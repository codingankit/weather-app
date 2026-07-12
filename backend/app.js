// Import necessary modules
import "dotenv/config";
import express from "express";
import path from "path";

// Import route handlers
import fetchWeather from "./fetchWeatherInfo.js";

// Set the global __dirname to the current directory
global.__dirname = path.resolve();

// Define the port number
const PORT = process.env.PORT || 3000; // Use the port from environment variables or default to 3000

// Path to the build directory for serving static files locally
const views = path.join(__dirname, "build");

// Create an Express application
const app = express();

// Serves static files locally (on Vercel, static files are served directly by CDN)
app.use(express.static(views));

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

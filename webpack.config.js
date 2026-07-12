// Import necessary modules
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
// Loads environment variables from .env file into process.env
import dotenv from "dotenv/config";

// Set the global __dirname to the current directory
global.__dirname = path.resolve();

// Set mode to "production" if NODE_ENV is "production", otherwise default to "development"
const mode = process.env.NODE_ENV || "development";

export default {
  entry: {
    app: "./frontend/main.js", // Entry point of your JavaScript
  },
  output: {
    path: path.resolve(__dirname, "build"), // Output directory
    filename: "weather-app.bundle.js", // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Process CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontend/index.html", // Path to your HTML template
      filename: "index.html", // Output HTML file name
      inject: "body", // Inject scripts into the body of the HTML file
    }),
  ],
  mode, // Choose 'development' or 'production'
};

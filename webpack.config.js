// Import necessary modules
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import dotenv from "dotenv/config";

// Set the global __dirname to the current directory
global.__dirname = path.resolve();

// Check if the NETLIFY_DEPLOY environment variable is set to "true" and set the isProduction flag accordingly
const isProduction = process.env.NETLIFY_DEPLOY === "true" || false;

// Set the default mode to "development"
let mode = "development";

if (!isProduction) {
    // If not in production mode (NETLIFY_DEPLOY is not "true"), 
    // check the NODE_ENV environment variable
    const NODE_ENV = process.env.NODE_ENV || "development";
    // If NODE_ENV is "production", update the mode to "production"
    if (NODE_ENV === "production") {
        mode = "production";
    }
}

// If NETLIFY_DEPLOY is "true", override the mode to "production"
if (isProduction) {
    mode = "production";
}

// The mode variable will be set to "production" if either
// NETLIFY_DEPLOY is "true" or NODE_ENV is "production"

export default {
    entry: {
        app: "./frontend/main.js" // Entry point of your JavaScript
    },
    output: {
        path: path.resolve(__dirname, "build"), // Output directory
        filename: "weather-app.bundle.js" // Output bundle file name
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"] // Process CSS files
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./frontend/index.html", // Path to your HTML template
            filename: "index.html", // Output HTML file name
            inject: "body" // Inject scripts into the body of the HTML file
        }),
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify(process.env.API_URL)
        })
    ],
    mode // Choose 'development' or 'production'
};

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors()); 

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5000;
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

// GET route that returns the projectData object
app.get('/projectData', function (req, res) {
    res.send(projectData);
})

// POST route
app.post('/projectData', (req, res) => {
    const { temperature, date, userResponse } = req.body;

    // Add the data to the projectData object
    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;

    // Send a response back to the client
    res.status(200).send({ success: true, response: { message: 'Receiving data...' } });
    console.log('Received data:', req.body);
});
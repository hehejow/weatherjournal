// Personal API Key for OpenWeatherMap API
const apiKey = '12dac6a09e9313bf16c99ca556b22b70&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', function () {
    const zipCode = document.querySelector('#zip').value;

    // Function called by event listener
    console.log(zipCode)
    fetchWeatherData(baseURL, zipCode, apiKey);
});

// Function to GET Web API Data and POST to server
async function fetchWeatherData(baseURL, zipCode, apiKey) {

    // String concatination for API endpoint
    const url = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;

    // Fetching the data...
    const response = await fetch(url);

    // ...awaiting response
    const data = await response.json();

    // Get user feelings imput
    const userResponse = document.querySelector('#feelings').value;

    // Initialize object and reference response data
    const postData = {
        temperature: data.main.temp,
        date: new Date().toLocaleDateString(),
        userResponse: userResponse
    };

    // POST to server
    await fetch('/projectData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    console.log('WeatherMood posted to server:', postData);
    // Call function to update UI
    updateUI();
}
// Declare async function to update UI
async function updateUI() {
    const request = await fetch('/projectData');
    try {
        const allData = await request.json();
        document.querySelector('#temp').innerHTML = 'Temperature: ' + Math.round(allData.temperature) + ' °F'
        document.querySelector('#date').innerHTML = 'Date: ' + allData.date;
        document.querySelector('#content').innerHTML = 'Mood: ' + allData.userResponse;
    } catch (error) {
        console.log('error', error);
    }
}
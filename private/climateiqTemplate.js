/*

//this is a very basic example. I will be writing functions to simplify this process. Also using this example to test the API.
const url = "https://beta4.api.climatiq.io/search";
const query = "grid mix";
const data_version = "^3";

const query_params = {
    // Free text query can be written as the "query" parameter
    query: query,
    data_version: data_version,
    // You can also filter on region, year, source, and more
    // "AU" is Australia
    region: "AU",
};

const authorization_headers = {
    Authorization: `Bearer ${API_KEY}`,
};

// Convert the query_params object to a query string
const queryString = new URLSearchParams(query_params).toString();

// Dynamically import 'node-fetch' and perform the GET request
import('node-fetch')
    .then(({ default: fetch }) => {
        return fetch(`${url}?${queryString}`, {
            method: 'GET',
            headers: authorization_headers,
        });
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        // Process the JSON response here
        console.log(data);
    })
    .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
    });
*/
const keys = require('../config/keys');
const url = 'https://beta4.api.climatiq.io/travel/distance';
const apiKey = keys.climateIQ.API_KEY;

const data = {
  origin: {
    locode: 'DE-HAM'
  },
  destination: {
    query: 'Berlin'
  },
  travel_mode: 'car',
  car_details: {
    car_type: 'plugin_hybrid'
  }
};

(async () => {
  const fetch = (await import('node-fetch')).default;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
  } else {
    console.error('Error:', response.status, response.statusText);
  }
})();



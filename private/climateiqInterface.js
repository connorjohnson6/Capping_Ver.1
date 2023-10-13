const API_KEY = "ZCCX5Y2TNMMSEVHC68G1BG2P5J0T";
const authHeader = { Authorization: `Bearer ${API_KEY}`};
const TravelURL = "https://beta4.api.climatiq.io/travel/distance";
const query = "grid mix";
const data_version = "^3";

//https://www.climatiq.io/docs/api-reference/travel

function getDrivingData(start, end){

}

function getFlightData(start, end){ 
    const query = {
        origin: {
            query: start
        },
        destination: {
            query: end
        },
        travel_mode: "air"
    }
    const queryString = new URLSearchParams(query).toString();

    let output;
    import('node-fetch')
    .then(({ default: fetch }) => {
        return fetch(`${TravelURL}?${queryString}`, {
            method: 'GET',
            headers: authHeader,
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
        output = data;
    })
    .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
    });
    return output;

}

function getTrainData(origin, end){

}
console.log(getFlightData("New York, New York", "Denver, Colorado"));
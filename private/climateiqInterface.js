const API_KEY = "ZCCX5Y2TNMMSEVHC68G1BG2P5J0T";
const travelURL = "https://beta4.api.climatiq.io/travel/distance";
//https://www.climatiq.io/docs/api-reference/travel

function getDrivingData(start, end, carType = "petrol", carSize = "medium"){
    let output;
    let data = {
        origin: {
            query: start
        },
        destination: {
            query: end
        },
        travel_mode: "car",
        car_details: {
            car_type: carType,
            car_size: carSize
        }
    };
    (async () => {
        const fetch = (await import('node-fetch')).default;
        
        const response = await fetch(travelURL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          output = responseData;
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      })();
    return output;

}

function getFlightData(start, end){ 
    

}

function getTrainData(origin, end){

}

//getFlightData("EWR", "DEN");
//getDrivingData("New York, New York", "Westport, NY", "petrol", "large");
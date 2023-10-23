const API_KEY = "INSERT KEY HERE"; //key found in internal shared doc.
const travelURL = "https://beta4.api.climatiq.io/travel/distance";
//https://www.climatiq.io/docs/api-reference/travel


/**
 * Quereys ClimateIQ for driving data. 
 * @param {string} start - the origin city. Ex: "Boston, MA" 
 * @param {string} end - the destination city. this and the start are a query; they search a database for best match. There is no strict format.
 * @param {string} [carType] - car types: "petrol", "diesel", "hybrid", "plugin_hybrid", "battery". Defaults to average car.
 * @param {string} [carSize] - car sizes: "small" (below 1.4L) "medium" (1.4L-2.0L) "large" (above 2.0L). Defaults to average car.
 * @returns {JSON} The resulting query of the API. important Properties: co2e (double), co2e_unit (string), distance_km (double)
 */
function getDrivingData(start, end, carType = "average", carSize = "average"){ 
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

/**
 * Quereys ClimateIQ for flight data. 
 * @param {string} start - the origin airport IATA code. Ex: "EWR" (Newark)
 * @param {string} end - the destination airport IATA code. Ex: "DEN" (Denver)
 * @param {string} [flightClass] - Flight classes: "economy", "first", "buisness". Defaults to average.
 * @returns {JSON} The resulting query of the API. important Properties: co2e (double), co2e_unit (string), distance_km (int)
 */
function getFlightData(start, end, flightClass = "average"){ 
    let output;
    let data = {
        origin: {
            iata: start
        },
        destination: {
            iata: end
        },
        travel_mode: "air",
        air_details: {
            class: flightClass
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

/**
 * Quereys ClimateIQ for Train data. 
 * @param {string} start - the origin city. Ex: "Boston, MA" 
 * @param {string} end - the destination city. this and the start are a query; they search a database for best match. There is no strict format.
 * @returns {JSON} The resulting query of the API. important Properties: co2e (double), co2e_unit (string), distance_km (double)
 */
function getTrainData(start, end){
    let output;
    let data = {
        origin: {
            query: start
        },
        destination: {
            query: end
        },
        travel_mode: "rail",
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

//example Calls:
//getDrivingData("Suffern, NY", "San Antonio, TX", "petrol", "medium");
//getFlightData("EWR", "DEN", "economy");
//getTrainData("New York, New York", "Boston, MA");
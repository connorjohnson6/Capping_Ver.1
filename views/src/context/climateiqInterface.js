
/**
 * @fileoverview Module for querying transportation-related data from the ClimateIQ API.
 *               Includes functions for retrieving data about driving, flying, and train travel.
 *               Each function returns data such as CO2 emissions and distance for the specified journey.
 *               Requires an API key set in the environment variables.
 * 
 * @author [Alex Hanys, Connor Johnson]
 */
const API_KEY = process.env.REACT_APP_CLIMATEIQ_API_KEY; //key found in internal shared doc.
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
 export function getDrivingData(start, end, carType = "average", carSize = "average") {
  return new Promise(async (resolve, reject) => {
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

      try {
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
              console.log("API Response - Driving Data:", responseData);
              resolve(responseData);
          } else {
              console.error('Error:', response.status, response.statusText);
              reject('Error fetching driving data');
          }
      } catch (error) {
          console.error('Error:', error);
          reject(error);
      }
  });
}


/**
 * Quereys ClimateIQ for flight data. 
 * @param {string} start - the origin airport IATA code. Ex: "EWR" (Newark)
 * @param {string} end - the destination airport IATA code. Ex: "DEN" (Denver)
 * @param {string} [flightClass] - Flight classes: "economy", "first", "buisness". Defaults to average.
 * @returns {JSON} The resulting query of the API. important Properties: co2e (double), co2e_unit (string), distance_km (int)
 */
 export function getFlightData(start, end, flightClass = "average"){ 
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
 export function getTrainData(start, end) {
  return new Promise(async (resolve, reject) => {
      let data = {
          origin: {
              query: start
          },
          destination: {
              query: end
          },
          travel_mode: "rail"
      };

      try {
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
              console.log("API Response - Train Data:", responseData);
              resolve(responseData);
          } else {
              console.error('Error:', response.status, response.statusText);
              reject('Error fetching train data');
          }
      } catch (error) {
          console.error('Error:', error);
          reject(error);
      }
  });
}


//example Calls:
//getDrivingData("Suffern, NY", "San Antonio, TX", "petrol", "medium");
//getFlightData("EWR", "DEN", "economy");
//getTrainData("New York, New York", "Boston, MA");
/* global google */
import React, { useRef, useState } from 'react';
import {
  Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, Text, Select
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader, GoogleMap, Marker, DirectionsRenderer,
  Autocomplete // Import Autocomplete if available
} from '@react-google-maps/api';
import { getDrivingData, getFlightData, getTrainData } from '../../context/climateiqInterface';



const center = { lat: 41.7231, lng: -73.9345 };

function Calculations({ addEmissionsData }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [transportMode, setTransportMode] = useState('driving');
  


  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) return <div>Loading...</div>;

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    // eslint-disable-next-line no-undef
    let travelMode;
    switch (transportMode) {
      case 'driving':
        // eslint-disable-next-line no-undef
        travelMode = google.maps.TravelMode.DRIVING;
        break;
      case 'plane':
        // Handle planes differently as Google Maps doesn't support flight paths
        
        getFlightData("EWR", "DEN", "economy"); // Placeholder, adjust as needed
        return;
      case 'train':
        // eslint-disable-next-line no-undef
        travelMode = google.maps.TravelMode.TRANSIT;
        break;
      default:
        // eslint-disable-next-line no-undef
        travelMode = google.maps.TravelMode.DRIVING;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: travelMode,
    });

    if (results.status === "OK") {
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);

      if (transportMode === 'driving') {
        try {
          const drivingData = await getDrivingData(originRef.current.value, destinationRef.current.value, "petrol", "medium");
          console.log("Received driving data:", drivingData);
          addEmissionsData({ ...drivingData, method: 'Driving' });
        } catch (error) {
          console.error("Error fetching driving data:", error);
        }
      }
      else if (transportMode === 'train') {
        try {
          const trainData = await getTrainData(originRef.current.value, destinationRef.current.value);
          console.log("Received train data:", trainData);
          addEmissionsData({ ...trainData, method: 'Train' });
        } catch (error) {
          console.error("Error fetching train data:", error);
        }
      }
      
    } else {
      console.error('Directions request failed due to ', results.status);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }
  return (
    <Flex direction="column" alignItems="center" m={4}>
    <Select onChange={(e) => setTransportMode(e.target.value)} defaultValue="driving">
      <option value="driving">Driving</option>
      <option value="plane">Plane</option>
      <option value="train">Train</option>
    </Select>

    <Box
      p={4}
      borderRadius='lg'
      bgColor='white'
      shadow='base'
      minW='container.md'
      zIndex='1'
      mb={4}
    >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>
  
          <ButtonGroup>
            <Button colorScheme='green' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
  
      <Box w="100%" h="400px" position="relative"> {/* Adjust height as needed */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </Flex>
  );
  
}

export default Calculations;

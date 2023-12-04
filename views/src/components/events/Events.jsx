import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

import './events.css';

const events = [
    {
        id: 1,
        type: 'Online Event',
        date: 'WED, DEC 6 • 12:00 PM EST',
        title: 'Why enroll for Community Solar? Learn how to get credits on your electric Bill!!',
        group: 'New York Community Solar Meetup Group',
        attendees: 1,
        photo: '/assets/post/solar.jpg', 
      },
      {
        id: 2,
        type: 'Online Event',
        date: 'MON, DEC 18 • 7:30 PM EST',
        title: 'December Virtual Book Club Meet: This Time Next Year Sophie Cousens',
        group: 'Book Club For Fun',
        attendees: 17,
        photo: '/assets/post/book.jpg', 
      },
      {
        id: 2,
        type: 'In-Person Event',
        date: 'MON, DEC 18 • 7:30 PM EST',
        title: 'Carbon Emission Solutions Roundtable: Strategies for a Greener Tomorrow',
        group: 'Green Innovators Network',
        attendees: 17,
        photo: '/assets/post/carbonSolutions.jpg',
      },
];

const Events = () => {
    const [selectedDay, setSelectedDay] = useState('Any day');
    const [selectedType, setSelectedType] = useState('Any type');
    const [selectedDistance, setSelectedDistance] = useState('Any distance');
    const [userFeedback, setUserFeedback] = useState('');
    const [eventsList, setEventsList] = useState(events); 
    const { user: currentUser } = useContext(AuthContext);


    const handleDayChange = (e) => {
      setSelectedDay(e.target.value);
    };
  
    const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
    };
  
    const handleDistanceChange = (e) => {
      setSelectedDistance(e.target.value);
    };

    const handleJoinEvent = async (eventData) => {
        try {
          const joinEventUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/join-event/${currentUser._id}`;
          const sendEmailUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/send-email`;
    
          const joinResponse = await axios.post(joinEventUrl, eventData);
          if (joinResponse.status === 200) {
            setUserFeedback('You have successfully joined the event!');
    
            // Send the email with event details
            await axios.post(sendEmailUrl, { 
              userEmail: currentUser.email,
              eventDetails: eventData // Include event details here
            });
    
            // Remove the joined event from the events list
            setEventsList(eventsList.filter(event => event.id !== eventData.id));
          } else {
            setUserFeedback('There was a problem joining the event.');
          }
        } catch (error) {
          setUserFeedback('An error occurred while trying to join the event.');
          console.error('There was an error posting the event', error);
        }
    };
    
  
  
    // Dummy function to simulate filtering based on selection
    // In a real app, lets replace this with actual filtering logic
    const filterEvents = (event) => {
      // Your filter logic here...
      return event;
    };
  
    return (
        <div className="eventsMiddle">
          <h2>Events near Poughkeepsie, NY</h2>
          <div className="filters">
            <select value={selectedDay} onChange={handleDayChange}>
              <option value="Any day">Any day</option>
              <option value="Starting Soon">Starting Soon</option>
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="This week">This week</option>
              <option value="This weekend">This weekend</option>
              <option value="Next week">Next week</option>
              <option value="Custom date range">Custom</option>
            </select>
      
            <select value={selectedType} onChange={handleTypeChange}>
              <option value="Any type">Any type</option>
              <option value="Online">Online</option>
              <option value="In Person">In Person</option>
            </select>
      
            <select value={selectedDistance} onChange={handleDistanceChange}>
              <option value="Any distance">Any distance</option>
              <option value="2 miles">2 miles</option>
              <option value="5 miles">5 miles</option>
              <option value="10 miles">10 miles</option>
              <option value="25 miles">25 miles</option>
              <option value="Custom distance">Custom</option>
            </select>
          </div>
      
          {userFeedback && <div className="feedback">{userFeedback}</div>} 
      
          {events.filter(filterEvents).map((event) => (
            <div key={event.id} className="event">
              <div className="event-content">
                <div className="event-info">
                  <div className="event-type">{event.type}</div>
                  <div className="event-date">{event.date}</div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-group">{event.group}</div>
                  <div className="event-attendees">{event.attendees} attendees</div>
                  <button className="join-now-btn" onClick={() => handleJoinEvent(event)}>Join Now</button>
                </div>
                <div className="event-photo">
                  <img src={event.photo} alt={event.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      );
  }
  
  export default Events;

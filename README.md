

# **Carbon Bigfoot Design Doc**

**Overview**

This project aims to develop a comprehensive application that tracks an individual’s carbon footprint over time, and set target goals on what they want to reduce their carbon footprint to.In addition, users are able to interact with others by friending them and view their progress, as well as making posts on a social media feed where they can gloat about their reduced emissions.


## Focused branches to look for most recent changes:



* landing-server
* client-server

**Prerequisites**

Before you begin, make sure you have the following installed:



* Node.js and npm (Node Package Manager)
* An IDE like Visual Studio Code

**Setting Up the Environment**



1. **Clone the Repository**
        * Clone the project to your local machine.
2. **Switch to Relevant Branches**
        * The project uses two main branches:
            * Landing-server (EJS code that prioritizes the landing page and having a user log in)
            * Client-server (React code that prioritizes post log in )
        * Ensure you switch to these branches as needed.
3. **Environment Variables and Keys**
        * Inside the views folder, add a .env file. The contents for the .env file are provided in a shared Google document.
        * Inside the landing page folder, within the config folder, add a keys.js file. The contents for this file are also in the shared Google document.
4. **Install Dependencies**
        * Run npm i in the following directories:
            * Capping_Ver.1 folder
            * api folder
            * views folder

**Running the Application**



1. **Start the API for MongoDB**
        * Open a terminal in your IDE.
        * Navigate to the Capping_Ver.1 folder.
        * Then, change directory to api using cd api.
        * Run npm start to start the MongoDB API.
2. **Start the React App**
        * Open another terminal in your IDE.
        * Navigate to the views folder.
        * Run npm start to start the React application.

**Important Notes**



    * **Local WiFi vs. Campus Network**
        * The application will work on your local WiFi.
        * If you are editing the React app on a campus network, you may need to use a hotspot or a wired connection due to network restrictions. This is related to the "proxy": "http://localhost:8800/api" line in the package.json file in the views folder.
    * **Authentication through the Client React page setup**
        * The AuthContext.js file can be found inside of the views folder, inside of src, and finally inside of the context file
        * To Authenticate through the React page, for now you will have to go to the AuthContext.js file and change the INITIAL_STATE to whichever user you choose to log in as, for now we have it set to. If you wish to change the logged in user, you will need to change these items according to how they are logged into the MongoDB: _id, username, email: \

        * `const INITIAL_STATE = {`
        * `  user: {`
        * `    // Example user data; replace with actual data or fetch from an API`
        * `    // I just didn't want to log in everytime on a refresh of the page`
        * `    _id: "65653fe314895d141ae456d3",`
        * `    username: "Connor",`
        * `    email: "connorjohnson211@gmail.com",`
        * `    profilePicture: "person/noAvatar.png",`
        * `    coverPicture: "",`
        * `    isAdmin: false,`
        * `    followers: [],`
        * `    followings: [],`
        * `  },`
        * 
        * `   //   _id: "6569432b7a28128a16269a29",`
        * `   //   username: "ahanys",`
        * `   //   email: "abhmind@gmail.com",`
        * `   //   profilePicture: "person/noAvatar.png",`
        * `   //   coverPicture: "",`
        * `   //   isAdmin: false,`
        * `   //   followers: [],`
        * `   //   followings: [],`
        * `   // },`
        * `  isFetching: false,`
        * `  error: false,`
        * `};`

**Additional Documentation**



* Refer to the shared Google document for any additional setup instructions and project documentation.
* To review the accumulated jsdoc documentation, please go to the ‘out’ folder inside of Capping_Ver.1 and use a VSCode extension like ‘Live Server’ to host the index.html file. You must have the index.html file open on your vscode to then host the live server of the file

**Scope**

The current implementation of the project includes a feed where users can make posts of text and photos and other users can like them, A carbon calculator which combines the google maps API and the ClimateIQ API to show users their route and calculate the emissions of their drive, A page in which users can set their own activities an detail the carbon emissions of that activity, and lastly a goals page where users can set their desired carbon emissions and track their progress.

**Objectives**



1. Develop a user-friendly interface for the web.
2. Implement OAuth authentication using platforms like google.
3. Create a calculation engine for carbon footprint in activities such as travel but also custom ones.
4. Design an API for communication between the 2.
5. Incorporate features for progress tracking, comparison with friends, and goal setting.
6. Allow users to create new activities with corresponding carbon footprint information.

**Technical Specifications**

 

**Technology Stack**

**Technical Overview of the EJS Landing Page Implementation**


    **Back-End Infrastructure**



* **Node.js and Express Framework**: The backbone of our server-side application, efficiently managing HTTP requests and responses.
* **Passport.js Authentication**: Integrates Google OAuth for streamlined sign-ins and a local strategy for email-password authentication. Enhanced password security is achieved using both bcrypt and bcryptjs.

    **Database Integration**

* **MongoDB**: Our selected NoSQL database facilitates efficient data storage and retrieval processes.
* **Mongoose**: Employs Mongoose for structured data modeling and efficient query management, ensuring robust interactions with MongoDB.

    **Front-End Development**

* **EJS Templating**: Utilized for dynamic content rendering, significantly improving the interactivity and personalization of the user interface.
* **Express EJS Layouts**: Enhances the structuring and organization of EJS templates, allowing for more modular and maintainable code.

    **Additional Technical Components**

* **Session Management**: Implements express-session and cookie-session for reliable user session tracking, providing a consistent and secure user experience.
* **Flash Messaging**: Integrates express-flash for transient, user-focused messaging, essential for conveying authentication states and other vital user interactions.
* **Data Parsing**: Utilizes body-parser middleware to adeptly handle JSON and URL-encoded data, ensuring smooth data exchange between client and server.

    **Client-Server Communication**

* **Axios**: Incorporated for efficient execution of HTTP requests, facilitating seamless communication between the front and back end.
* **CORS (Cross-Origin Resource Sharing)**: Configured for secure and flexible interactions between different origins. However this was not fully implemented as we could not figure out the correct way to transfer data between the EJS auth and the React auth.

    **Routing and Navigation**

* **Express Routing**: Detailed routes guide users through authentication, user profiles, and content pages such as goals, blogs, about, products, and log-in.

    **Static Content and Layouts**

* **Static File Serving**: Effectively serves static files, paired with the EJS view engine for a visually appealing and organized user interface.
* **HTTP Proxy Middleware**: Employs HTTP-proxy-middleware for advanced proxying capabilities, enhancing the application's connectivity and response handling.

    **Development Tools and Documentation**

* **Nodemon**: Utilized in development for its automatic server restart capabilities upon detecting file changes.
* **Concurrently & JSDoc**: Incorporates concurrently for running multiple scripts simultaneously and jsdoc for generating comprehensive codebase documentation.

**Technical Overview of the React-Based Client Application**


    **Front-End Development**



* **React Framework**: Employs the latest React version for creating a dynamic and responsive user interface.
* **Chakra UI**: Utilized for its robust and modular component library, ensuring a user-friendly and aesthetically pleasing design.
* **Google Maps React API**: Integrated for acquiring geographical data for trip planning and carbon emission calculations.
* **Axios**: Implemented for efficiently handling HTTP requests, connecting the front-end with the back-end services.
* **Timeago.js**: Used for displaying time-related information, such as the timestamp of user posts, in a human-readable format.
* **React Router DOM**: Manages routing within the React application, facilitating seamless navigation.

    **User Interaction and Features**

* **Dynamic User Content**: Users can post pictures, like them, and search for other users using a dedicated search bar.
* **Integration with Google Maps API**: Implemented for acquiring origin and destination data for user trips.
* **Carbon Emission Calculations**: Utilized ClimateIQ API for calculating carbon emissions from user trips. These calculations are stored in a totalCo2E field in MongoDB, facilitating progress tracking against user-set carbon emission goals. Trips are also saved in MongoDB to display as a history on a user’s profile.

    **Authentication and User State Management**

* **Local Login Strategy**: Developed to handle user authentication locally within the React application.
* **AuthContext Provider**: Implemented using React's Context API for managing authentication state, leveraging useReducer and local storage for persisting user data.

    **Back-end Integration**

* **Express.js Framework**: Forms the backbone of the server, handling routing, middleware, and API requests.
* **Mongoose**: Used for MongoDB object modeling, providing a straightforward schema-based solution to model application data.
* **Multer**: Facilitates file uploads, enabling users to upload images seamlessly.
* **Bcrypt**: Ensures secure handling of user passwords through hashing.
* **CORS (Cross-Origin Resource Sharing)**: Configured to allow secure interaction between the front-end and back-end services. However this was not fully implemented as we could not figure out the correct way to transfer data between the EJS auth and the React auth.
* **Nodemon**: Enhances development efficiency by automatically restarting the server upon detecting file changes.
* **Sharp**: For handling and processing image files, optimizing their size and quality for web use.

    **Development and Testing**

* **React Scripts**: Simplifies the management of React application scripts for starting, building, testing, and ejecting configurations.

    **Hosting and Deployment**

* **Back-end Server**: Running on port 8800, ensuring reliable back-end services for the front-end application.
* **React Application**: Hosted and running on port 3000, providing a user-friendly interface.

**Architecture**

**Mongo API Application Structure **


#### **/models**

The models directory is a critical component of the application's data layer, where Mongoose schemas are defined to interact with a MongoDB database. Here's an in-depth look at each model file:



1. **User Model (user-model.js):** This schema defines the User document, including fields for username, email, password, Google ID, registration type, profile and cover pictures, followers, followings, admin status, description, city, and origin. It also includes automatic timestamping for document creation and updates. The username and email fields are marked as unique, ensuring no two users can have the same username or email.
2. **Post Model (post-model.js):** This schema is for Post documents, containing fields for the user ID of the post creator, a description, an image, and an array of likes. Like the User model, it also supports automatic timestamping.
3. **Goal Model (goal-model.js):** The Goal schema includes fields for a user ID (referencing the User model), a numeric goal value, and a unit of measurement. The user ID field is an ObjectId linking to the User model, ensuring each goal is associated with a specific user. Timestamps are also automatically managed.
4. **Event Model (event-model.js):** This schema defines an Event document structure, which includes a user ID (unique and referencing the User model) and an array of events, each with its own event ID, type, date, title, and group. The uniqueness of the user ID implies that each user can have only one Event document.
5. **Carbon Model (carbon-model.js):** The Carbon schema tracks carbon emissions per user. It includes a user ID (unique and referencing the User model), an array of Route documents (each capturing individual carbon emission entries), and a total carbon emissions field. It uses Decimal128 for precise decimal values and also implements automatic timestamping.


### **/public/images**

The public directory contains static images that are served directly to the client. Within this, the images directory includes:



1. /person: Stores images related to user profiles or people.
2. /post: Contains images related to posts or content.
3. /profilePictures: Stores profile pictures for user accounts.

The files within this directory can be used for static purposes; however, it is also the folder that stores all images the user uploads to the site.


### **/routes**

The routes directory organizes the Express server's endpoints, which is crucial for handling client-side requests and communicating with the database through the defined models.



1. **carbon.js: **This file manages the routes for carbon data entries. It defines an endpoint for adding new carbon emission records to a user's profile using the CarbonModel. The route includes functionality to create a new carbon data document or update an existing one by adding new routes and updating the total emissions.
2. **goals.js: **The goals.js router handles the creation and updating of user goals. It provides endpoints to set new goals, update existing ones, and check for the existence of a goal for a specific user, leveraging the GoalModel for database interactions.
3. **auth.js: **In auth.js, user authentication processes like registration and login are implemented. This router uses bcrypt for secure password hashing and the User model to save and retrieve user data from the database.
4. **posts.js: **This router script includes endpoints for managing post-related functionalities such as creating, updating, and deleting posts and liking and retrieving them. It uses the Post and User models to handle requests related to posts.
5. **users.js: **The users.js file contains routes for various user operations, including updating user information, managing follow/unfollow functionality, and searching for users. It also integrates user, goal, and carbon data models to provide comprehensive user data responses.


### **Root Files**



1. **indexApi.js**: This is the main entry point for the API routes.
2. **package.json**: Defines the project dependencies, scripts, and other metadata.
3. **package-lock.json**: Auto-generated file to lock down the versions of installed packages for consistent installs across machines.

**Landing Page Application Structure**


## **/config**

It contains configuration files essential for the application's setup and secure functioning.



1. **keys.js: **Stores configuration keys, such as API keys or secret tokens, are essential for various functionalities within the application.
2. **passport-setup.js:** Configures passport strategies for authenticating users. This could involve setting up OAuth with providers like Google and Facebook and local strategies using email and passwords.


## **/public**

It serves as a container for static files that are publicly accessible to the client's browser.



1. **/blogImages: **Stores images related to blog posts.
2. **/devProfile-image:** Contains developer profile images
3. **/image:** A general directory for various images used across the application.
4. **/js: **Contains the landing page JavaScript files to add interactive features to the web pages.
5. **/styles: **Stores CSS files for styling the application's front end.


## **/routes**

Houses the routing logic of the application, defining how HTTP requests are handled.



1. **auth-routes.js:** Manages authentication routes for login, logout, and registration endpoints. This also manages the re-directs via the Google oAuth to the user's specific page.
2. **profile-routes.js:** Handles routes related to user profiles, such as viewing and editing profile information.


## **/views**

It contains the view templates used to render the HTML sent back to the client, typically managed by a template engine like EJS.



1. **/partials:** This directory includes two .ejs code files:
    1. **footer.ejs:** displays the footer on each page where the partial code is implemented
    2. **header.ejs: **displays the header on each page where the partial code is implemented
2. **404.ejs:** A template for displaying a 404 Not Found page.
3. **about. ejs:** Provides a view for an About page with information about the developers.
4. **blog.ejs: **The template for rendering blog posts. This page displays static images to imagine how the page would look when true-to-life data is implemented.
5. **goals.ejs: **A view for displaying user goals. This page shows fetched user information from MongoDB and indicates the user's name to form a leaderboard. In addition, it is a strategy of setting a goal saved to Mongo when the user places their goal.
6. **index.ejs: **The main landing page of the application.
7. **login.ejs: **The login page template where the user can use our local strategy of login-in/register or choose to log in via Google's oAuth. This page restricts users from creating multiple accounts with the same username and Gmail. The Google OAuth and local strategy also communicate so that two different accounts are not made. Via the two strategies
8. **profile.ejs: **Used to display user profiles.


### **Root-Level Files**



1. **App.js:** Integrating user authentication, database communication, and serving both static and dynamic content. It is configured with routes for authentication (/auth) and user profiles (/profile), as well as API endpoints for the user (/users) and post (/API/posts) data. The server uses the passport for authentication, connects to MongoDB via Mongoose, and sets EJS as the templating engine for rendering views, notably from the landing_Page/views directory.


### **Configuration and Documentation Files**



1. **.gitignore:** Lists files and directories that should be ignored by git version control.
2. **package.json & package-lock.json:** Define the project dependencies and lock them to specific versions.


# React Client-Side Application Structure


## **/src**

Houses the source code for the React components, context, and pages.


### **/components**

Includes React components, each with its CSS file for styling, used for the center display of content.



1. **calculations.jsx:** Utilizes the ClimateIQ API and Google Maps API to request and store the Origin / Destination for a route the user is interested in. The user can pick the Driving, Flying, or Train transportation, which will call its respective function to gather the best data for the route calculated.
2. **events.jsx: **For displaying events currently in your location for you to join. Now, these events are hard-coded to show the user what the page will look like in the future. However, the functionality of entering an event with it, adding to the database, and sending an email to the registered user mail account is all functional. 
3. **feed.jsx:** The main social component of the app is where the user sees a friend's posts and can interact with their friend's posts by liking them.
4. **online.jsx:** A component indicating which users are currently online. It was scrapped in the final UI design but kept as a file for future development to track real-time updates for the app.
5. **post.jsx: **For rendering individual posts. This is displayed right about the user's feed and contains the functionality for the user to post a picture to the feed and their profile. Not only can they upload an image, but also include a caption to the post that they are sharing.
6. **ranking.jsx:** This page's primary purpose is to display the users' tracked progress and contain it on a single page. In this, you can view all of the user's progress in their completed challenges (which is currently pseudo data)
7. **rightbar.jsx:** A sidebar component for displaying the right side of the screen based on what page you are on. Each page has a unique right bar containing functionality corresponding to the center display.
    1. **ProfileRightbar():** Displays the specific information regarding the user's profile. This information includes where they are from, what state they live in, their tracked carbon emission routes, and an edit profile button, which will dynamically change all the features for the user.
    2. **CalculationsRightbar(): **With relation to the Calculations.jsx file, when the user calculates a route, is displayed on the right side of the screen, portraying all of the information of their desired trip, including the indirect and direct carbon emission they will be producing for that trip. Once calculated, the user can add a route to their profile to their profile at the 
    3. **GoalsRightbar():** The goal's right bar is similar to the SetGoal.The jsx feature, however, fetches all the current users' data and displays it on the right. This contains the user's profile picture, name, carbon emission goal, total emissions, and a progress bar to show how they compare to other users visually.
    4. **LeaderboardRightbar(): **This rightbar's primary purpose is to display every user's total amount of points. When a challenges page is created in future implementations, we can fetch information to display an accurate leaderboard related to the number of points a user accumulated by completing challenges.
    5. **GreenRightbar(): **As the Green.jsx files are located inside the page folder; the primary purpose is to portray information about carbon emissions, and the GreenRightbar displays random facts to the user to become more educated on carbon emissions.
8. **setGoal.jsx:** Allows the user to set and update a goal. Once a user selects a goal, a new display will become present, containing information to allow the user to edit their desired goal. This page also includes the user's specific information, their total calculated carbon emissions, and a progress bar to see the user's progression visually.
9. **share.jsx:** The component that made up the sharing a post functionality; this is where you would first select the file you want to upload and then add a caption. You would then click the share button to post it to the social feed.
10. **sidebar.jsx: **A general sidebar component for the application that links all the pages together so the user can constantly visualize where they can route.
11. **suggestions.jsx: **Another way of viewing the accumulated user's goal. Here, the users' progress is replicated from the goals page, ordering the users in most completed goals to least for a more represented ranking feel.
12. **topbar.jsx: **The application's top navigation bar. The components for this would be the functionality to always go to the feed by clicking on the top left logo. The second would be a way to get to the user's profile by clicking the profile picture on the top left. Finally, when searched and selected, the functional search bar would bring up all the user profile pages.


### **/context**

Contains context files for global state management.



1. **AuthActions.js: **Actions for authentication-related state changes.
2. **AuthContext.js:** Provides a React context for authentication.
3. **AuthReducer.js:** Reducer function for handling changes to the authentication state.
4. **climateInterface.js: **Contains the API fetch for climateIq. Here, we see the functionality behind it. Pushing and returning data through their API to gain information on the user's carbon emissions


### **/pages**

React components that represent whole pages within the application.



1. **calculator.jsx: **Designed to handle user interactions related to emissions calculations. It integrates components like Topbar, Sidebar, Rightbar, and a custom Calculations component to create a cohesive interface. The ChakraProvider from Chakra UI provides consistent styling and UI management across the application. This page maintains a state for emissions data using the useState hook, allowing for adding new emissions data entries, which can be passed to the Right Bar component for display. 
2. **events.jsx: **Dedicated page for displaying user events. It incorporates standard layout components such as Topbar and Sidebar to provide a consistent navigation experience. The page's primary content is handled by the Event component, which is responsible for rendering the events-specific data and interactions. 
3. **goals.jsx:** Users can set and manage their personal goals. This page is constructed using a standard layout pattern that includes a top bar for the application's full navigation, a Sidebar for secondary navigation, and a proper bar for additional content or information related to the goals context. The SetGoal component is wrapped in a ChakraProvider, indicating that the page utilizes Chakra UI components for a consistent and themeable design system. 
4. **green.jsx:** It lists everyday activities and their respective carbon emissions, such as driving a car or using a gas lawnmower, and suggests greener alternatives like carpooling or switching to electric lawnmowers. This component integrates a Top Bar, Sidebar, and Right Bar, ensuring a consistent layout with the rest of the application.
5. **home.jsx:** The main dashboard for the setup of the social aspect of the site. This file outlines the structure of how the homepage will be displayed. This component integrates a Top Bar, Sidebar, and Right Bar, ensuring a consistent layout with the rest of the application.
6. **leaderboard.jsx:** Displays a leaderboard, potentially ranking users based on their contributions or achievements.
7. **login.jsx: **The login page, although it was not used in the final UI of the design. This page was made in case we wanted to incorporate React into the entire website and have a before and after authentication.
8. **profile.jsx: **The Profile component is a user-centric page that uses Top Bar and Sidebar for consistent site navigation. The profile information is dynamically loaded using a use-effect hook that fetches data from an API endpoint with Axios, keyed on the username obtained from the URL parameters. The top section displays the user's cover and profile pictures, with default images provided if none are uploaded. The user's name and personal description are also shown. The bottom section includes the Feed component, filtered by the username to authenticate the user's specific posts, and a Right Bar component that shows what was explained in the right bar: ProfileRightbar.
9. **register.jsx:** The registration page, similar to the login page, was also cut from the final UI as we focused on other pages.


### **Root-Level Files**



2. **apiCalls.js:** Manages auth routes based on the request status, success, or failure.
3. **App.js: **The root React component that wraps the entire application.
4. **index.js:** The JavaScript entry point that renders the React application into the DOM.


### **Configuration and Documentation Files**



3. **.env:** A hidden file that contains environment variables for the React application.
4. **.gitignore: **Lists files and directories that should be ignored by git version control.
5. **package.json & package-lock.json:** Define the project dependencies and lock them to specific versions.

**Website Features**

Here are some features the website currently has



1. User Authentication:
    1. OAuth integration for registration.
2. Carbon Footprint Tracking
    2. Ability to calculate and track carbon footprint.
    3. Set targets for reduction.
3. Recommendations
    4. Provide alternate activities with a lower carbon footprint.
4. Social Features
    5. Compare progress with friends.
5. User-generated content
    6. Allow users to create new activities, as well as posts.
6. Joining Events
    7. Set number of event show and when joined, you are given an email confirmation and added to the database for events

**Maintainability**

Tips and notes on maintaining the project

**Code Documentation**



* Continue adding inline comments to display clear intent behind every function and method in the code.
* Maintain and update this readme file so that new developers can stay up to date on the goals and state of the project.
* Regarding Javascript code, a good way to keep up with documentation is using JSDOC 

**Version Control**



* Ensure separation between branches so that different releases may be planned in advance.
* It may be smart to utilize Docker to dockerize all of our content and auto refresh or take from an old version to keep our site always up and running for global users

**Testing**



* Always test before pushing code, and test then test everything once the code is pushed, then test again just to be safe.

**Project Management**



* Utilize Trello or other similar software to track active workloads of every member of the team.
* Consider using github issues to task things out as well
* Maintain a consistent schedule of scrum meetings to ensure no team member has any blockers

**Future Features**



1. Expansion:
    1. Plan for potential expansion into real world use, 
    2. Potential continuation of the project by other groups.
2. A mobile view so that users can take the application on the go
3. A badge-like system to encourage users to make more effort on reducing their emissions
4. API Statistics:
    3. Consider gathering data on API usage by users for application usage, or like spotify wrapped
5. Performance Optimization
6. Change all code to one framework to keep it consistent. 
    4. Preferably you would be changing the landing page into a React page as that will be less intricate. This will also help with authentication between the current ejs page and the client react page
    5. With this change, you will also need to change the server httpd doc so that the server can run react code
7. Add more features within the climateIQ fractionation.
    6.  If you are to read the documentation with climateIQ, you can see that there is a lot more intricate data that the user can input that can drastically change the user’s carbon emission. Example: User’s model car, engine, gas intake, etc..
    7. Also look for features within the api if there is anything that shows the user how to decrease their carbon emissions.
8. Look into an alternative in using the proxy for the mongo api connection between the React site.
    8. This caused a slight issue to our group, issue can be seen above. The proxy connection was no allowing us to use the database on Marist Campus wifi, only when hard wired into the network. 
9. Domain Name
    9. It would be nice to have an actual domain name rather then user an IP address
    10. With this, you might also have to look into an alternative to the server. Currently we are being presented on the Marist private server farm which can only be connected internally from campus. If you are off campus, you must use a vpn service like Cisco Any Connect to have the link between Marist and your Device. This may cause a problem with a domain name if we want this being connected to a global url


# Server Side Structure


## **Overview**

This document provides an overview of our server, including its purpose, specifications, and configuration.


## **Server Details**

Server Name: 10.10.9.5:8080 \
IP Address: 10.10.9.5 \
Operating System: Windows Server 2022 Standard Version 21H2

Hardware Specifications: Intel(R) Xeon(R) CPU E7- 2830  @ 2.13GHz   2.13 GHz  (8 processors), 16GB RAM, 127GB HDD


## **Installed Software**

Major software installed on the server.



* Apache 2.4
* Git 2.42.0.2
* Microsoft Visual Studio Code (User) 1.84.2
* Microsoft Remote Desktop (if connecting through Apple device)
* MongoDB 7.0.2 2008R2Plus SSL (64 bit)
* MongoDB Compass 1.40.4
* Node.js 20.10.0
* Python 3.12.150.0


## **Network Configuration**

The server is listening on port 8080 allowing it to be accessible on 10.10.9.5:8080. There is a reverse proxy that is set to localhost:3000 that means that any request that comes to the server on port 8080 will be forwarded to the specified backend. 


## **Backup and Recovery**

We have an instance of our server on another service called Heroku as our backup in case something happens with the instance on the Marist servers. We are also using Github to host our code as well as keeping it on our local machines.


## **Maintenance**

Maintenance could be performed by the Marist IT members if this project is continued. This would need to be done once a semester as it would be a light load on the server.


## **Troubleshooting**

There are some interruptions between the server and the tunneling into it using RDC. It is possible to just restart RDC and it typically gets fixed. Additionally, there was an issue in the middle of the semester that cut access to the server so that is why we have the secondary server on Heroku.


## **Contact Information**

The contact information for the server is the Marist IT team at [clienttechnologies@marist.edu](mailto:clienttechnologies@marist.edu). If further action is needed you can be in contact with the IT leader of the Carbon Footprint group [collin.ruggeberg1@marist.edu](mailto:collin.ruggeberg1@marist.edu). 

The contact information for the marist capping gmail/outlook/mongo accounts can be accessed through the second google doc shared with only group members and the current professor. If issues occur, please contact the CS leader of the Carbon Footprint group connor.johnson1@marist.edu 

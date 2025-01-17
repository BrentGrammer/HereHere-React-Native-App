# HereHere

React Native App built with Expo and consuming Google Places API with a Node.js backend. Integration with socket.io. Built for Android.

- **NOTE:** This is app is no longer maintained or released due to lack of time to support the project

<p align="center"> <img src="screenshots/herehere1.webp" width="180" height="390" style="margin-right: 10px;"> <img src="screenshots/herehere2.webp" width="180" height="390" style="margin-right: 10px;"> <img src="screenshots/herehere4.webp" width="180" height="390" style="margin-right: 10px;"> <img src="screenshots/herehere5.webp" width="180" height="390"> </p>

## Components

- HereHere-app (The React-Native app)
- HereHere-server (Node.js backend server)

### Technologies used:

- React
- Redux
- redux-thunk
- Expo (using React-Navigation)
- Socket.io library to use WebSockets
- Node.js with Express and Mongoose
- MongoDB for persisting data
- Consumes Google Places API - \* You must have billing enabled for the project in GCP for this to work

### Find out what's happening at a place from those who are there right now!

### Features:

- Users search places in Google Maps and chat live with other users who are there to find out what's going on.
- Users can find out how many people are at a place - if it's crowded or not, what the crowd is like, any special deals going on, what's on the menu, etc. to determine if they want to visit without having to call. Get inside information from people who are there!
- Socket.io for live chat over web sockets
- Search for any place and get auto suggestions through the Google Places API
- Login to save places or use the app without logging in
- Ephemereal chat messages which are cleared every 3 hours - get the latest info on what's going on at a place

## HereHere-server Node.js backend

- Node Backend API for Place Based Chat App HereHere

### Libraries and Technology used:

- [Express](https://expressjs.com/)
- SocketIO for websocket integration
- Express framework for building server and API route controllers
- AWS JavaScript SDK for accessing AWS S3 services and buckets
- MongoDB for persisting conversations and messages
- Mongoose library

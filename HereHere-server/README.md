# Node Backend API for Place Based Chat App HereHere

### NOTE: This is a portfolio piece and is no longer deployed, maintained or updated due to lack of time.

### Libraries and Technology used:

- SocketIO for websocket integration
- Express framework for building server and API route controllers
- AWS JavaScript SDK for accessing AWS S3 services and buckets
- MongoDB for persisting conversations and messages
- Mongoose library

## Deprecated README instructions

## Running in Dev (deprecated):

- On client front end app, change the url in the config to the localhost url
- `npm run dev`

## DEBUGGING:

- Find and log mongo driver version:

```javascript
mongoose.connect(
  keys.MONGO_URI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, db) => {
    var admin = new mongoose.mongo.Admin(mongoose.connection.db);
    admin.buildInfo(function (err, info) {
      console.log("Mongodb driver version: ", info.version);
    });
    if (err) {
      console.log("MongoDB: Unable to connect to the server. Error:", err);
    } else {
      console.log("MongoDB: Connected to Server successfully!");
    }
  }
);
```

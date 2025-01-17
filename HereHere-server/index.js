const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const { startSocketIO } = require("./services/socketIO");

const PORT = process.env.PORT || 5000;

mongoose.connect(
  keys.MONGO_URI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, db) => {
    // var admin = new mongoose.mongo.Admin(mongoose.connection.db);
    // admin.buildInfo(function (err, info) {
    //   console.log("MongoDB Driver Version: ", info.version);
    // });
    if (err) {
      console.log("MongoDB: Unable to connect to the server. Error:", err);
    } else {
      console.log("MongoDB: Connected to Server successfully!");
    }
  }
);

const app = express();
app.set("port", PORT);
const server = require("http").Server(app);

startSocketIO(server);

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const publicPath = path.join(__dirname, "public");

app.get("/privacy", (req, res) => {
  res.sendFile(path.join(publicPath, "privacy_policy.html"));
});

const chatController = require("./controllers/chatController")();
const conversationsController = require("./controllers/conversationsController")();
const userController = require("./controllers/userController")();
const messagesController = require("./controllers/messagesController")();

app.use(
  "/",
  chatController,
  conversationsController,
  userController,
  messagesController
);

server.listen(PORT, () => {
  console.log("server started and listening on port " + PORT);
});

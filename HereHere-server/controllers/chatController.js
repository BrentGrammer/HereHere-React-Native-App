var express = require("express");
var router = express.Router();
const Query = require("../queries/messageQueries");

const chatController = () => {
  router.get("/chat/:placeId", (req, res, next) => {
    const placeId = req.params.placeId;

    console.log("placeId from req", placeId);

    Query.getPlaceMessages(placeId)
      .then((messages) => {
        res.send({ success: true, data: messages });
      })
      .catch((err) => {
        if (err) {
          console.log("Error getting messages for " + placeId, err);
        }
        res.send({
          success: false,
          message: "There was an error getting messages.",
        });
      });
  });

  router.get("/chat/:city/latest-activity", (req, res, next) => {
    const city = decodeURIComponent(req.params.city);
    console.log({ city })

    Query.getLatestActivity(city)
      .then((latestMessages) => {
        res.send({ success: true, data: latestMessages });
      })
      .catch((err) => {
        console.log(`Error getting latest Activity for ${city}`, err);
        res.send({
          success: false,
          message: "There was an error connecting to the server.",
        });
      });
  });

  return router;
};

module.exports = chatController;

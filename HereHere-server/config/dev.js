require('dotenv').config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  JWT_SECRET: process.env.JWT_SECRET,
};
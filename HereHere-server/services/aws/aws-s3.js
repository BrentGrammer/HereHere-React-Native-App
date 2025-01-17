const keys = require("../../config/keys");

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: keys.AWS_ACCESS_KEY_ID, 
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY, 
  region:'us-east-1'
});

const Bucket = keys.S3_BUCKET;

const s3_getSignedAvatarUrl = (userId) => {
  const cacheBuster = Date.now().toString();
  const filename = `avatar${cacheBuster}.jpg`;
  const params = {Bucket, Key: `images/${userId}/${filename}`, ContentType: 'image/jpeg', Expires: 60};

  const promise = new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) {
        console.log(err);
        reject("There was an error.");
      }
      resolve({ url, filename });
    });
  });
  return promise;
};

const s3_deleteObject = (pathToObject) => {
  const params = { Bucket, Key: pathToObject };
  const promise = new Promise((resolve, reject) => {
    s3.deleteObject(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); 
        reject(err);
      } 
      else {
        resolve(data);
      }                   
    });
  });
  return promise;
};
 
module.exports = {
  s3_getSignedAvatarUrl,
  s3_deleteObject
}
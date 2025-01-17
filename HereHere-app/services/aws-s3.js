export const uploadImageToS3 = (filename, fileUri, signedS3Url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", signedS3Url);
    xhr.setRequestHeader("Content-Type", "image/jpeg");
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Image successfully uploaded to S3');
          resolve(true);
        } 
        else {
          console.log('Error while sending the image to S3');
          reject('There was an error uploading the image.');
        }
      }
    };
    xhr.send({ uri: fileUri, type: "image/jpeg", name: filename });
  });
};

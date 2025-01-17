const urls = {
  // for localhost you need to look at your computer ip assigned by the network and use that
  localhost: "http://192.xxx.x.xx:5000", // IP address broadcasted
  herokuProdServer: "url-to-heroku-prod-server",
  herokuStagingServer: "url-to-heroku-staging-server",
};
// Change this to prodServerUrl when deployed
const config = {
  //SERVER_URL: urls.localhost,
  //SERVER_URL: urls.herokuStagingServer
  SERVER_URL: urls.herokuProdServer,
};

export default config;

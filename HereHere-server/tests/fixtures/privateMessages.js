const server = "192.168.0.13";  // change it to the address of your server
const port = 5000; // change it to the port of your server
const data = {
  from: "5c55ee3b81e92327c497e177",
  to: "5c57f84d9c719a35ecfa1ac7",
  text: "This is a second message from Brent to Joe",
  "conversationId": "123"
};
const socket = require("socket.io-client")("http://" + server + ":" + port);

const params = { 
  user: { 
    username: "Brent", 
    userId: "5c55ee3b81e92327c497e177", 
    avatarUrl: null, 
    tagline: 'tagline',
    summary: 'summary' 
  }, 
  room: 'private'
};

const params2 = {
  user: { 
    username: "Joe", 
    userId: "5c57f84d9c719a35ecfa1ac7", 
    avatarUrl: null, 
    tagline: 'tagline',
    summary: 'summary' 
  }, 
  room: 'private'
}

const callback = () => {
  console.log('callback')
}



socket.on("connect", function () {
    console.log("connected");
    socket.emit('join', params, callback);
    socket.emit('join', params2, callback);
    socket.emit("createPrivateMessage", data);
    console.log("data sent");
});
class Users {
  constructor() {
    this.users = [];
    this.socketIds = [];
  }

  addUser(socketId, userData, room) {
    const user = { socketId, userData, room };
    this.users.push(user);
    return user;
  }
  addSocketId(socketId, userId) {
    const entry = { socketId, userId };
    this.socketIds.push(entry);
  }
  removeSocketId(socketId) {
    this.socketIds = this.socketIds.filter(entry => entry.socketId !== socketId);
    return socketId;
  }

  removeUser(socketId) {
    const user = this.getUser(socketId);

    if(user) {
      this.users = this.users.filter(user => user.socketId !== socketId);
    }
    return user;
  }
  getUser(socketId) {
    // return the first user or undefined
    return this.users.filter(user => user.socketId === socketId)[0];
  }
  getSocketId(userId) {
    const entryFound = this.socketIds.filter(entry => entry.userId === userId)[0];
    if (entryFound) {
      return entryFound.socketId;
    }
    return null;
  }
  getUsersList(room) {
    const users = this.users.filter((user) => user.room === room);
    const usersArray = users.map(user => user.userData);
    return usersArray;
  }
}

module.exports = { Users };

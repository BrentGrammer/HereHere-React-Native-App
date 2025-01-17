const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (password) => {
  return bcrypt.genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt);
    });
}
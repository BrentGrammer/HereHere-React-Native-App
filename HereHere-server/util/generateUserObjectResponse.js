module.exports = {
  generateUserObjectResponse: (userFromDatabase, token) => {
    const { _id, username, avatarUrl, email, tagline, summary, city } = userFromDatabase;
    
    const responseObject = {
      userId: _id,
      username,
      avatarUrl,
      email,
      tagline,
      summary,
      city,
      token
    };

    return responseObject;
  }
};
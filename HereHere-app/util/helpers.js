export const sliceAvatarFilename = (avatarUrl) => {
  const sliceStart = avatarUrl.indexOf('avatar');
  const filename = avatarUrl.slice(sliceStart);

  return filename;
}; 

// export const groupMessagesByFromUserId = (messages) => {
//   const groupedMessages = {};

//   messages.forEach(message => {
//     if(!groupedMessages[message.from.userId]) {
//       groupedMessages[message.from.userId] = [];
//     }
//     groupedMessages[message.from.userId].push(message);
//   });

//   return groupedMessages;
// };
const usernames = ['Xander', 'Jared', 'Grace', 'Alex'];
const thoughtText = [
  'Came here multiple times over the past year or so. I have consistently gotten one thing here - a positive experience that invites me to come back time and time again.',
  'The food was good, like slap yo momma good, and our server, Sam PHENOMENAL I wish I could put it in words the way he worked the room, at least 6 tables at once. Never wrote anything down when taking orders, provided menu suggestion, engaged with customers',
  'This place has amazing vibe. People who works here are extremely nice. Food is amazing. My favorite is the spicy ox tail.',
  'This place is definitely a must if you are in Norcross. The food was outstanding and the place has a cool atmosphere, especially in the evenings',
];

const reactionBody = [
  'we are happy to here you like our establishment',
  'our cook and server were very happy to read your coment. I will be sure to give them bonces.',
  'that is my favorite too.',
  'I agree.',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomThought = () => `${getRandomArrItem(thoughtText)}`;

const getRandomUserName = () =>
  `${getRandomArrItem(usernames)}${Math.floor(Math.random() * 10 + 1)}`;

const getRandomReaction = () => `${getRandomArrItem(reactionBody)}`;

module.exports = { getRandomThought, getRandomUserName, getRandomReaction };

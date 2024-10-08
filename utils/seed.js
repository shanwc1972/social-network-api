const connection = require('../config/connection');
const { User, Thought } = require('../models');
const mongoose = require('mongoose');

const usernames = [
  'shakirkan',
  'johnmai',
  'ratanathuy',
  'wesleyliang',
  'lucasbrennan',
  'markbernado',
  'yousifnaaim',
  'sauravsimkhada',
  'rowansullivan',
  'joshwaterhouse',
];

const emaildomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

const thoughttexts = [
  "I can't believe how fast this year is flying by!",
  "Feeling grateful for all the little things in life.",
  "Social media: where everyone’s life looks perfect.",
  "Who else is staying in and binge-watching this weekend?",
  "Can’t wait for the weekend—any plans?",
  "Why is everything so expensive these days?",
  "Remember to take care of your mental health.",
  "Need coffee. Now.",
  "Random fact: Did you know that...?",
  "Feeling nostalgic looking through old photos.",
  "People need to learn how to mind their own business.",
  "Trying to stay positive, even when it’s tough.",
  "Be kind. You never know what someone’s going through.",
  "The food I just made looks too good not to share.",
  "Another day, another hustle.",
  "Why do bad things always happen at the worst possible time?",
  "Traveling is the best therapy.",
  "Can't sleep... any late-night thoughts?",
  "Normalize not having everything figured out in your 20s.",
  "Sometimes you just need to log off and take a break.",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Create a random list of friend IDs for a given user
const createRandomFriendIds = (userIds, currentUserId) => {
  // Filter out the current user ID from the list
  const potentialFriends = userIds.filter((id) => !id.equals(currentUserId));

  // Create a random number of friends (between 1 and 3)
  const numberOfFriends = Math.floor(Math.random() * 3) + 1;

  // Shuffle the potential friends and select the desired number
  const shuffledFriends = potentialFriends.sort(() => 0.5 - Math.random());
  return shuffledFriends.slice(0, numberOfFriends);
};

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Delete the collections if they exist
  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (usersCheck.length) {
    await connection.dropCollection('users');
  }

  // Create empty array to hold the users
  const users = [];

  // Create empty array to hold the thoughts
  const thoughts = [];

  // Loop 10 times -- add users to the usernames array
  for (let i = 0; i < 10; i++) {
    // Get username from the list
    const username = usernames[i];

    // Create a random e-mail based off the username
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@${getRandomArrItem(emaildomains)}`;

    // Push newly created user to the users array
    users.push({
      username,
      email,
    });
  }

  // Loop 20 times to add thoughts to the thoughts array
  for (let i = 0; i < 20; i++) {
    // Get a thought from the list
    const thoughtText = thoughttexts[i];

    // Assign a random username to the thought
    const randomUser = `${getRandomArrItem(usernames)}`;

    // Push newly created thought to thoughts array
    thoughts.push({
      thoughtText,
      username: randomUser,
    });
    
  }

  // Add users to the collection and await the results
  const usersData = await User.create(users);

  // Add thoughts to the collection and await the results
  const thoughtData = await Thought.create(thoughts);

  // Create an array of user ids so that we use it to populate assocaied data 
  const userIds = usersData.map((user) => user._id);

  //Given both user and thought documents, lets populate each user with their assoicate thoughts
  for (let i =0; i < usersData.length; i++) {
    let currentUserId = usersData[i]._id;
    let currentUsername = usersData[i].username;

    //Generate an array of filtered thought ids from the thought documents based ofd the username
    const thoughts = thoughtData
    .filter((thought) => thought.username === currentUsername)
    .map((thought) => thought._id);

    // Update user document with this thoughts list
    await User.findByIdAndUpdate(currentUserId, { thoughts });
  }

  for (let i = 0; i < usersData.length; i++) {
    let currentUserId = usersData[i]._id;

    // Generate a random list of friend IDs
    const friends = createRandomFriendIds(userIds, currentUserId);

    // Update the user document with the friends list
    await User.findByIdAndUpdate(currentUserId, { friends });
  }

  console.info('Seeding complete! 🌱');
  process.exit(0);
});
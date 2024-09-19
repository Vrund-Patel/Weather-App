// const { MongoClient } = require('mongodb');
// const User = require('./models/user');             

// const uri = 'mongodb+srv://WebDev:CL2EUaASi1jMRCpG@webdevfinal/sample_mflix?retryWrites=true&w=majority';

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// export async function getUserData(userId) {
//   await client.connect();
//   const user = await client.db('sample_mflix').collection('users').findOne({ _id: userId });
//   await client.close();
//   return user;
// }

// // export async function appendNewUserData(userId, userData) {
// //   await client.connect();
// //   const usersCollection = client.db('test').collection('users');
// //   const result = await usersCollection.updateOne({ _id: userId }, { $set: userData }, { upsert: true });
// //   await client.close();
// //   return result;
// // }


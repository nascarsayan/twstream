const Twitter = require('twitter');
const Database = require('./db');

require('dotenv').config();

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  request_options: { proxy: 'http://172.16.2.30:8080' }
});
const ind = {
  lat: [6.5546079, 35.6745457],
  lon: [68.1113787, 97.395561]
};
const tags = [
  'vaccination',
  'vaccine',
  'rubella',
  'rotavirus',
  'hpvvaccine',
  'pentavalent'
]
// console.log(client);
client.stream(
  'statuses/filter', {
    track: tags.join(','),
    locations: `${ind.lon[0]},${ind.lat[0]},${ind.lon[1]},${ind.lat[1]}`
  },
  async (stream) => {
    const db = new Database(process.env.MONGO_URI || 'mongodb://localhost:27017', process.env.MONGO_DBNAME || 'twitter');
    await db.connect();
    stream.on('data', async (tweet) => {
      await db.addTweet(tweet);
    });

    stream.on('error', (error) => {
      console.log(error);
    });
  });

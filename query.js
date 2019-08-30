var Twitter = require('twitter');
require('dotenv').config();
const opt = {};
if (process.env.PROXY === 'true') {
  opt.request_options = { proxy: 'http://172.16.2.30:8080' }
}
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  ...opt,
});
// console.log(client);
// console.log(`${(ind.lon[0] + ind.lon[1]) / 2} ${(ind.lat[0] + ind.lat[1]) / 2} 1000mi`)
client.get(
  'search/tweets', {
    q: 'place:b850c1bfd38f30e0 Vaccine',
    count: 50
  },
  function (error, tweets) {
    console.log(JSON.stringify(tweets.statuses.map(t => ({ place: t.place.name, coord: t.place.bounding_box.coordinates, text: t.text })), null, 2));
    // console.log(tweets);
  });

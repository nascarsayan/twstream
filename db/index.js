const MongoClient = require('mongodb').MongoClient;
class Database {

  constructor(uri, dbname) {
    this.uri = uri
    this.dbname = dbname
    this.db = {}
    return this
  }

  async connect() {
    MongoClient.connect(this.uri, { useNewUrlParser: true }, (err, client) => {
      this.db = client.db(this.dbname);
    });

  }

  async addTweet(tweet) {
    await this.db.collection('twstream').insert(tweet);
  }
}

module.exports = Database;

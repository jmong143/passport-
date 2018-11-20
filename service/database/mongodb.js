let mongoose = require('mongoose');
let connectMongoDB = (host, name) => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(`mongodb://${host}/${name}`, { useNewUrlParser: true });
  console.log(`Successfully Connected! Host ${host} DatabaseName: ${name}`)
}
module.exports = connectMongoDB;

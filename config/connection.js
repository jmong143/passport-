
let connection = (db, host, name) => {
  if(db == "mongodb"){
    let mongodb = require('../service/database/mongodb');
    mongodb(host, name)
  }else if(db == "mysql"){

  }else{
    console.log(`Can't find this type of database: ${db}`)
  }
}

module.exports = connection;

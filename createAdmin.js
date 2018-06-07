var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    var dbo = db.db('IGSDB');
    var objAdminDetail = {name: 'admin', pwd: 'admin'};
    dbo.collection('AdminIGS').insertOne(objAdminDetail, function(err, res){
        if(err) throw err;
        console.log(res.insertedCount + ' document inserted.');
    });
    
    db.close();
});
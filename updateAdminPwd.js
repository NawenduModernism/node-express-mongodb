var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var strMsg = '';

/* app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
}); */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

app.route('/updateAdminPwd').post(function(req, res){ 
    var objRes = res;
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db('IGSDB');
        var objQuery = {name: req.body.adminName};
        console.log(req.body.adminName+' *-* '+req.body.adminPassword);
        var objNewAdminDetail = {$set: {pwd: req.body.adminPassword}};
        dbo.collection('AdminIGS').updateOne(objQuery, objNewAdminDetail, function(err, res){
            if(err) throw err;
            strMsg = res.result.nModified + ' document updated.';
            console.log(strMsg + ' *-* ' + req.body.adminName + ' *-* ' + req.body.adminPassword);
            
            if(res.result.nModified == 1)
                objRes.send({msg: 'Admin password updated.'});
            else
                objRes.send({msg: 'Password should be other than last one.'});
        });
        db.close();
    });
});

var server = app.listen(3000, function(){});

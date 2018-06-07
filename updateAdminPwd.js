var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var strMsg = '';

app.route('/updateAdminPwd').get(function(req, res){    
    var objRes = res, objReq = req.query;
    MongoClient.connect(url, function(err, db){
        if(err) throw err;
        var dbo = db.db('IGSDB');
        var objQuery = {name: objReq.name};
        var objNewAdminDetail = {$set: {pwd: objReq.pwd}};
        dbo.collection('AdminIGS').updateOne(objQuery, objNewAdminDetail, function(err, res){
            if(err) throw err;
            strMsg = res.result.nModified + ' document updated.';
            console.log(strMsg + ' *-* ' + objReq.name + ' *-* ' + objReq.pwd);
            if(res.result.nModified == 1)
                objRes.send('Admin password updated.');
            else
                objRes.send('Password should be other than last one.');
        });
        db.close();
    });
});

var server = app.listen(3000, function(){});

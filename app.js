var express = require('express');

var app = express.createServer();

app.get('/code/:code', function(req, res){
    var code = parseInt(req.params.code);
    console.log("Responding with HTTP Status code: " + code);
    res.send("HTTP Status code: " + code, code);
});

var port = process.env.PORT || 8888;

app.listen(port, function(){
    console.log("App starting.... Listening on port: " + port);
});



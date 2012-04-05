var express = require('express');

var app = express.createServer();

app.get('/code/:code', function(req, res){
    var code = req.params.code;
    console.log("Responding with HTTP Status code: " + code);
    res.send("HTTP Status code: " + code, parseInt(code));
});

var port = process.env.PORT || 8888;

app.listen(port, function(){
    console.log("App again.... Listening on port " + port);
});



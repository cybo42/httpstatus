var express = require('express');

var app = express.createServer();

app.get('/code/:code', function(req, res){
    var code = parseInt(req.params.code);
    console.log("Responding with HTTP Status code: " + code);
    
    // Check if client accepts XML
    var acceptHeader = req.headers.accept || '';
    if (acceptHeader.indexOf('application/xml') !== -1) {
        // Send XML response
        res.contentType('application/xml');
        res.send('<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <code>' + code + '</code>\n</response>', code);
    } else {
        // Default to JSON response
        res.send({code: code}, code);
    }
});

var port = process.env.PORT || 8888;

app.listen(port, function(){
    console.log("App starting.... Listening on port: " + port);
});



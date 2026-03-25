var express = require('express');

var app = express();

app.get('/code/:code', function(req, res){
    var code = parseInt(req.params.code);
    console.log("Responding with HTTP Status code: " + code);
    
    // Check if client accepts XML
    var acceptHeader = req.headers.accept || '';
    if (acceptHeader.indexOf('application/xml') !== -1) {
        // Send XML response
        res.type('application/xml');
        res.status(code).send('<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <code>' + code + '</code>\n</response>');
    } else {
        // Default to JSON response
        res.status(code).json({code: code});
    }
});

var port = process.env.PORT || 8888;

app.listen(port, function(){
    console.log("App starting.... Listening on port: " + port);
});



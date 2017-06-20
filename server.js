var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');

var socketio = require('socket.io');
var bodyParser = require('body-parser');
var keys = require('./keys.js');

var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var Particle = require('particle-api-js');

router.use(express.static(path.resolve(__dirname, 'public')));
router.use(bodyParser.json());

var callback = function() {
    console.log('Succesfully logged in!');
};


var particle = new Particle();
var token;

particle.login({
    username: keys.username,
    password: keys.password
}).then(
    function(data) {
        token = data.body.access_token;
        particle.getEventStream({
            deviceId: '4c0032000951343334363138',
            auth: token
        }).then(function(stream) {
            //console.log("logged in!");
            stream.on('event', function(data) {
                console.log("Event: %j", data);
                fs.appendFile('/all-logs.log', JSON.parse(data), (err) => {
                    if (err) throw err;
                });
            });
        }).catch(err => {
            throw err;
        });
    });
server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
io.on('connection', function(socket) {
    fs.readFile(__dirname + '/all-logs.log', (err, data) => {
        if (err) throw err;
        io.sockets.emit('begin', data.toString().split('\n'));
        //console.log("socket connected");
    });
});

fs.watch(__dirname + '/all-logs.log', (type, name) => {
    fs.readFile(__dirname + '/all-logs.log', (err, data) => {
        if (err) throw err;
        io.sockets.emit('update', data.toString().split('\n'));
        //console.log("socket updated");
    });
});
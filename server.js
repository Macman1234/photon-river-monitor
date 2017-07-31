var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');

var socketio = require('socket.io');
var bodyParser = require('body-parser');
var keys = require('./keys.js');

var app = express();
var server = http.Server(app);
var io = socketio(server);

var Particle = require('particle-api-js');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.json());

server.listen('8080');

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
                fs.readFile(__dirname + '/log.json', (err, data) => {
                    if (err) throw err;
                    try {
                        // parse and return json to callback
                        var json = JSON.parse(data);
                        console.log(json.length);
                        json.push('test');
                        fs.writeFile(__dirname + '/log.json', JSON.stringify(json), (err, data) => {
                            if (err) throw err;
                        });
                    } catch (ex) {
                        // catch JSON parsing errors so your app doesn't crash
                        throw err;
                    }
                });
            });
        }).catch(err => {
            throw err;
        });
    }).catch(err => {
    throw err;
});

app.get('/data', function(req, res) {
    fs.readFile(__dirname + '/log.json', (err, data) => {
        if (err) throw err;
        res.send(data);
        //console.log(data);
    });
});

io.on('connection', function(socket) {
    fs.readFile(__dirname + '/log.json', (err, data) => {
        if (err) throw err;
        io.sockets.emit('begin', data.toString());
        //console.log("socket connected");
    });
});

fs.watch(__dirname + '/log.json', (type, name) => {
    fs.readFile(__dirname + '/log.json', (err, data) => {
        if (err) throw err;
        io.sockets.emit('update', data.toString());
        //console.log("socket updated");
    });
});
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
            deviceId: '4f002e001951353338363036',
            auth: token
        }).then(function(stream) {
            stream.on('event', function(data) {
                console.log("Event: %j", data);
                try {
               //        json = JSON.parse(data);
  		       fs.appendFileSync(__dirname + '/log.txt', JSON.stringify(data) + "\n");
                    } catch (ex) {
                        // catch JSON parsing errors so your app doesn't crash
console.log(ex);
                    }
                });
	});
    }).catch(err => {
    throw err;
});

app.get('/data', function(req, res) {
	var array = fs.readFileSync(__dirname + '/log.txt').toString().split("\n");
        var allData = [];
        for (i in array)
        {
           try {
                                json = JSON.parse(array[i]);
			allData.push(json);
           } catch (ex) {
                        // catch JSON parsing errors so your app doesn't crash
                    }
       }
        res.send(allData);
});

io.on('connection', function(socket) {
    fs.readFile(__dirname + '/log.txt', (err, data) => {
        if (err) throw err;
        io.sockets.emit('begin', data.toString());
        //console.log("socket connected");
    });
});


try  {
fs.watch(__dirname + '/log.txt', (type, name) => {
    fs.readFile(__dirname + '/log.txt', (err, data) => {
        if (err) throw err;
        io.sockets.emit('update', data.toString());
        //console.log("socket updated");
    });
});
}
catch (ex)
{

}

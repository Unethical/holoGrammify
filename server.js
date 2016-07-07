var express = require('express');
var app = express();

var	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	fs = require('fs');

app.use(express.static(__dirname + '/vendor'));
app.use(express.static(__dirname + '/'));


server.listen(3000);
console.log('server started at :3000');


app.get('/', function (req, res){
	res.sendFile(__dirname + '/index.html');

});

io.sockets.on('connection', function (socket) {
    socket.on('render-frame', function (data) {
        data.file = data.file.split(',')[1]; // Get rid of the data:image/png;base64 at the beginning of the file data
        var buffer = new Buffer(data.file, 'base64');
        var num = data.frame;
        if(num.lenght < 2){num = "000" + num;}
        if(num.lenght < 3){num = "00" + num;}
        if(num.lenght < 4){num = "0" + num;}
        fs.writeFile(__dirname + '/tmp/frame-' + num + '.png', buffer.toString('binary'), 'binary');
    });
});
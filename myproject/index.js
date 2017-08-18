'use strict';

const Hapi = require('hapi');
const Good = require('good');
const fs = require('fs'),
 path = require('path');
const server = new Hapi.Server();
server.connection({ port: 3000, host: '192.168.4.153' });

server.route({
    method: 'GET',
    path: '/api',
    handler: function (request, reply) {
        const headers = request.headers;
        const name = headers.name;
        const cacheControl = headers['cache-control']

        console.log(name)
        console.log(cacheControl)

        reply(headers);
    }
});




server.route({
    method: 'POST',
    path: '/api/upload',
    config: {
        handler: function (request, reply) {
            const payload = request.payload
            var path = __dirname + "/name.png";
            // var file = fs.createWriteStream(path);
       var writestream = fs.createWriteStream(path);  
        writestream.on('close', function() {  
             
        });  
        payload.photo.pipe(writestream);  
            var data = request.payload;
            var name = data.photo.hapi.filename;
            
            console.log(name);
            console.log(payload);
            reply('Received your data')
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});

server.route({
    method: 'POST',
    path: '/api/uploadFiles',
    config: {
        handler: function (request, reply) {
            const payload = request.payload
            var path = __dirname + "/name.png";
            var test2path = __dirname + "/test2.png"
            // var file = fs.createWriteStream(path);
       var writestream = fs.createWriteStream(path);  
        writestream.on('close', function() {  
             
        });  
    var test2writestream = fs.createWriteStream(test2path);  
        test2writestream.on('close', function() {  
             
        });  
         payload.picture.pipe(writestream);  
        payload.parana.pipe(test2writestream);  
       
        

    
            var data = request.payload;
            // var name = data.photo.hapi.filename;
            
            // console.log(name);
            console.log(payload);
            reply('Received your data')
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});


server.route({
    method: 'POST',
    path: '/api/uploadAlbum',
    config: {
        handler: function (request, reply) {
            const payload = request.payload
    //         var path = __dirname + "/name.png";
    //         var test2path = __dirname + "/test2.png"
    //         // var file = fs.createWriteStream(path);
    //    var writestream = fs.createWriteStream(path);  
    //     writestream.on('close', function() {  
             
    //     });  
    // var test2writestream = fs.createWriteStream(test2path);  
    //     test2writestream.on('close', function() {  
             
    //     });  
    //      payload.picture.pipe(writestream);  
    //     payload.parana.pipe(test2writestream);  
       
        

    
    //         var data = request.payload;
            // var name = data.photo.hapi.filename;
            
            // console.log(name);
            console.log(payload);
            reply('Received your data')
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});

server.route({
    method: 'POST',
    path: '/api/uploadPartMap',
    config: {
        handler: function (request, reply) {
            const payload = request.payload
    //         var path = __dirname + "/name.png";
    //         var test2path = __dirname + "/test2.png"
    //         // var file = fs.createWriteStream(path);
    //    var writestream = fs.createWriteStream(path);  
    //     writestream.on('close', function() {  
             
    //     });  
    // var test2writestream = fs.createWriteStream(test2path);  
    //     test2writestream.on('close', function() {  
             
    //     });  
    //      payload.picture.pipe(writestream);  
    //     payload.parana.pipe(test2writestream);  
       
        

    
    //         var data = request.payload;
            // var name = data.photo.hapi.filename;
            
            // console.log(name);
            console.log(payload);
            reply('Received your data')
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});


server.route({
    method: 'POST',
    path: '/api/login',
    config: {
        handler: function (request, reply) {
            const payload = request.payload
    //         var path = __dirname + "/name.png";
    //         var test2path = __dirname + "/test2.png"
    //         // var file = fs.createWriteStream(path);
    //    var writestream = fs.createWriteStream(path);  
    //     writestream.on('close', function() {  
             
    //     });  
    // var test2writestream = fs.createWriteStream(test2path);  
    //     test2writestream.on('close', function() {  
             
    //     });  
    //      payload.picture.pipe(writestream);  
    //     payload.parana.pipe(test2writestream);  
       
        

    
    //         var data = request.payload;
            // var name = data.photo.hapi.filename;
            
            // console.log(name);
            console.log(payload);
            reply('Received your data')
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});

server.start(function (err) {
    if (err) {
        throw err
    }
    console.log('Server running at: ' + server.info.uri)
})


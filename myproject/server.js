'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

// server.route({
//     method: 'GET',
//     path: '/',
//     handler: function (request, reply) {
//         const headers=request.headers;

//         console.log(headers);

//         reply(headers);
//     }
// });

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});


server.route({
    method: 'post',
    path: '/',
    handler: function (request, reply) {
        const payload=request.payload;

        console.log(payload);


        reply(payload);
    }
});


server.route({  
  method: 'PUT',
  path: '/profile',
  config: {
    handler: function (request, reply) {
      const payload = request.payload

      console.log(payload)

      reply('Received your data')
    },
    payload: {
      maxBytes: 209715200,
      output: 'file',
      parse: true
    }
  }
})
// server.register({
//     register: Good,
//     options: {
//         reporters: {
//             console: [{
//                 module: 'good-squeeze',
//                 name: 'Squeeze',
//                 args: [{
//                     response: '*',
//                     log: '*'
//                 }]
//             }, {
//                 module: 'good-console'
//             }, 'stdout']
//         }
//     }
// }, (err) => {

//     if (err) {
//         throw err; // something bad happened loading the plugin
//     }

//     server.start((err) => {

//         if (err) {
//             throw err;
//         }
//         server.log('info', 'Server running at: ' + server.info.uri);
//     });
// });
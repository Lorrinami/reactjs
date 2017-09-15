"use strict";
const Hapi = require("hapi");
const Good = require("good");
const fs = require("fs"),
  path = require("path");
const server = new Hapi.Server();
const uuidv4 = require("uuid/v4");
var DATA_FILE = __dirname + "/data.json";
server.connection({ port: 3004, host: "192.168.4.153" });
server.route({
  method: "GET",
  path: "/api/timers",
  config: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"]
    },
    handler: function(request, reply) {
      const headers = request.headers;
      const name = headers.name;
      const cacheControl = headers["cache-control"];
      console.log('接收到请求');
      fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
          console.error(err);
        } else {
          const timers = JSON.parse(data);
          reply(timers);
        }
      });
    }
  }
});


server.route({
  method: "POST",
  path: "/api/timer/start",
  config: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"]
    },
    handler: function(request, reply) {
      console.log("start", request.payload.id);
      const payload = request.payload;
      fs.readFile(DATA_FILE, function(err, data) {
        if (err) {
          console.error(err);
        } else {
          const timers = JSON.parse(data);
          for(let i=0;i<timers.length;i++){
            if(timers[i].id==request.payload.id){
                console.log(timers[i]);
              break;
            }
           
          }
        //   console.log('timers',timers)
        //   fs.writeFile(DATA_FILE, JSON.stringify(timers), err => {
        //     if (err) throw err;
        //     console.log("It's saved!");
        //   });
          // reply(timers);
        }
      });

      reply("Received your data");
    },
    payload: {
      //设置如何处理负载请求
      parse: true
    }
  }
});


server.route({
    method: "GET",
    path: "/api/story",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"]
      },
      handler: function(request, reply) {
        const headers = request.headers;
        const name = headers.name;
        const cacheControl = headers["cache-control"];
        console.log('接收到请求');
        fs.readFile( __dirname +"/story.json", function(err, data) {
          if (err) {
            console.error(err);
          } else {
            const story = JSON.parse(data);
            reply(story);
          }
        });
      }
    }
  });

  server.route({
    method: "GET",
    path: "/api/chapter",
    config: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["cache-control", "x-requested-with"]
      },
      handler: function(request, reply) {
          console.log(request);
        const headers = request.headers;
        const name = headers.name;
        const cacheControl = headers["cache-control"];
        console.log('接收到请求');
        fs.readFile( __dirname +"/story.json", function(err, data) {
          if (err) {
            console.error(err);
          } else {
            const story = JSON.parse(data);
            reply(story);
          }
        });
      }
    }
  });


server.start(function(err) {
  if (err) {
    throw err;
  }
  console.log("Server running at: " + server.info.uri);
});

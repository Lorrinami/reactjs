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
      console.log(name);
      console.log(cacheControl);
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
  path: "/api/timers",
  config: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"]
    },
    handler: function(request, reply) {
      console.log("dfd", request.payload);
      const payload = request.payload;

      // var path = __dirname + "/name.png";
      // // var file = fs.createWriteStream(path);
      // var writestream = fs.createWriteStream(path);
      // writestream.on("close", function() {});
      // payload.photo.pipe(writestream);
      // var data = request.payload;
      // var name = data.photo.hapi.filename;

      // console.log(name);
      // console.log(payload);
      reply("Received your data");
    },
    payload: {
      //设置如何处理负载请求
      parse: true
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
          console.log('timers',timers)
          for(let i=0;i<timers.length;i++){
            timers[i].id==request.payload.id;
            console.log('找到了id')
          }
          // fs.writeFile(DATA_FILE, "Hello Node.js", err => {
          //   if (err) throw err;
          //   console.log("It's saved!");
          // });
          // reply(timers);
        }
      });
      // fs.writeFile(DATA_FILE, 'Hello Node.js', (err) => {
      //   if (err) throw err;
      //   console.log('It\'s saved!');
      // });
      // var path = __dirname + "/name.png";
      // // var file = fs.createWriteStream(path);
      // var writestream = fs.createWriteStream(path);
      // writestream.on("close", function() {});
      // payload.photo.pipe(writestream);
      // var data = request.payload;
      // var name = data.photo.hapi.filename;

      // console.log(name);
      // console.log(payload);
      reply("Received your data");
    },
    payload: {
      //设置如何处理负载请求
      parse: true
    }
  }
});

server.route({
  method: "POST",
  path: "/api/timer/stop",
  config: {
    cors: {
      origin: ["*"],
      additionalHeaders: ["cache-control", "x-requested-with"]
    },
    handler: function(request, reply) {
      console.log("stop", request.payload);
      const payload = request.payload;
      // var path = __dirname + "/name.png";
      // // var file = fs.createWriteStream(path);
      // var writestream = fs.createWriteStream(path);
      // writestream.on("close", function() {});
      // payload.photo.pipe(writestream);
      // var data = request.payload;
      // var name = data.photo.hapi.filename;

      // console.log(name);
      // console.log(payload);
      reply("Received your data");
    },
    payload: {
      //设置如何处理负载请求
      parse: true
    }
  }
});
server.route({
  method: "PUT",
  path: "/api/timers",
  handler: function(request, reply) {}
});

server.route({
  method: "DELETE",
  path: "/api/timers",
  handler: function(request, reply) {}
});
server.route({
  method: "POST",
  path: "/api/upload",
  config: {
    handler: function(request, reply) {
      const payload = request.payload;
      var path = __dirname + "/name.png";
      // var file = fs.createWriteStream(path);
      var writestream = fs.createWriteStream(path);
      writestream.on("close", function() {});
      payload.photo.pipe(writestream);
      var data = request.payload;
      var name = data.photo.hapi.filename;

      console.log(name);
      console.log(payload);
      reply("Received your data");
    },
    payload: {
      output: "stream",
      parse: true,
      allow: "multipart/form-data"
    }
  }
});

server.start(function(err) {
  if (err) {
    throw err;
  }
  //    var a=[
  //         {
  //           "title": "Practice squat",
  //           "project": "Gym Chores",
  //           "id": uuidv4(),
  //           "elapsed": 5456099,
  //           "runningSince": Date.now()
  //         },
  //         {
  //           "title": "Bake squash",
  //           "project": "Kitchen Chodres",
  //           "id": uuidv4(),
  //           "elapsed": 1273998,
  //           "runningSince": null
  //         }
  //       ]
  //       fs.writeFile(path.join(DATA_FILE), JSON.stringify(a), function (err) {
  //         if (err) throw err;
  //         console.log("Export Account Success!");
  //     });
  console.log("Server running at: " + server.info.uri);
});

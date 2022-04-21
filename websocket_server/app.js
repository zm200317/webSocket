var express = require('express');
const app = express()
var http = require('http');
var io = require('socket.io');


// 创建server服务
var server = http.createServer(function (req, res) {
  // 配置socket跨域
  var headers = {};
  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
  headers["Access-Control-Allow-Credentials"] = true;
  headers["Access-Control-Max-Age"] = '86400'; // 24 hours
  headers["Access-Control-Allow-Headers"] = "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";
  res.writeHead(200, headers);
  res.end();
});

// 启动服务器  监听 1024 端口
server.listen(1024,function() {
  console.log('server runing at 127.0.0.1:1024')
})

// 启动socket服务
var socket = io.listen(server, {origins: '*:*'});

// 监听客户端连接
socket.on('connection',function(socket) {
  console.log('客户端有连接')

  // 监听客户端断开
  socket.on('disconnect', () => {
    console.log('客户端断开')
  })

  // 给客户端发送消息
  socket.emit('welcome','欢迎连接socket')

  // 监听客户端消息
  socket.on('sendMessage', data => {
    console.log('接收客户端发送数据:', data)
    socket.emit('receiveMessage',data)
  })

  // 监听客户端消息
  socket.on('error', data => {
    console.log('接收客户端error', data)
  })

});

module.exports = app;

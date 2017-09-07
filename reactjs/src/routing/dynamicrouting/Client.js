import React, { Component } from "react";
var fetch = require("node-fetch");
/**
 * 网络请求的工具类
 */
export default class apiClient extends React.Component {
  //构造函数，默认的props，以及state 都可以在这里初始化了
  constructor(props) {
    super(props);
  }

  checkStatus() {
    //这个函数是在client. js中定义的。它检查服务器是否返回 一个错误。如果服务器返回一个错误，checkStatus()将错误记录到控制台
  }

  parseJSON() {
    // 这个函数也在client . js中定义。它接收响应对象 由fetch()发出并返回一个JavaScript对象
  }

  success() {
    // 这是我们作为gettimer()参数传递的函数。getTimers()将 如果服务器成功地返回响应，则调用此函数
  }

  static login() {
   return fetch("http://192.168.4.153:3004/api/timers", {
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json(); //将字符串转换为json对象
        }
      })
      .then(responseJson => {
        this.setToken(json.token)
      })
      .catch(error => {
        console.error(error);
      });
  }

  setToken(token){
      this.token = token;
       
      if(this.us)
  }
}

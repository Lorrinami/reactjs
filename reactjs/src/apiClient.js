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

  static getTimers(callback) {
    fetch("http://192.168.4.153:3004/api/timers", {
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
        callback(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  static postTimers() {
    // var newParams = this.getNewParams(service, params); //接口自身的规范，可以忽略
    fetch("http://192.168.4.153:3004/api/timers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body:JSON.stringify({
          name:'test',
          login:'12345',
      })
    })
      .then(response => {
        if (response.ok) {
            console.log(response);
        //   return response.json();
        }
      })
    //   .then(json => {
    //     if (json.resultCode === "SUCCESS") {
    //       callback(json);
    //     } else {
    //     }
    //   })
      .catch(error => {
        alert(error);
        //ToastAndroid.show("netword error",ToastAndroid.SHORT);
      });
  }

  static startTimer(data){
      fetch('http://192.168.4.153:3004/api/timer/start',{
          method:'POST',
          body:JSON.stringify(data),
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
      }).then()
  }


  static stopTimer(data){
      fetch('http://192.168.4.153:3004/api/timer/stop',{
          method:'POST',
          body:JSON.stringify(data),
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }).then()
  }
  /**
     * 普通的get请求 
     * @param {*} url 地址
     * @param {*} params  参数
     * @param {*} callback  成功后的回调
     */
  static get(url, params, callback) {
    fetch(url, {
      method: "GET",
      body: params
    })
      .then(response => {
        if (response.ok) {
          //如果相应码为200
          return response.json(); //将字符串转换为json对象
        }
      })
      .then(json => {
        //根据接口规范在此判断是否成功，成功后则回调
        if (json.resultCode === "SUCCESS") {
          callback(json);
        } else {
          //否则不正确，则进行消息提示
        }
      })
      .catch(error => {
        // ToastAndroid.show("netword error", ToastAndroid.SHORT);
      });
  }

  /**
     * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url 
     * @param {*} service 
     * @param {*} params 
     * @param {*} callback 
     */
  static post(url, service, params, callback) {
    //添加公共参数
    var newParams = this.getNewParams(service, params); //接口自身的规范，可以忽略

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" //key-value形式
      },
      body: newParams
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        if (json.resultCode === "SUCCESS") {
          callback(json);
        } else {
        }
      })
      .catch(error => {
        alert(error);
        //ToastAndroid.show("netword error",ToastAndroid.SHORT);
      });
  }

  /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url 
     * @param {*} service 
     * @param {*} jsonObj 
     * @param {*} callback 
     */
  static postJson(url, service, jsonObj, callback) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify(jsonObj) //json对象转换为string
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(json => {
        if (json.resultCode === "SUCCESS") {
          callback(json);
        } else {
          //   ToastAndroid.show(json.resultDesc, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        // ToastAndroid.show("netword error", ToastAndroid.SHORT);
      });
  }

  /**
     * 获取当前系统时间 yyyyMMddHHmmss
     */
  static getCurrentDate() {
    var space = "";
    var dates = new Date();
    var years = dates.getFullYear();
    var months = dates.getMonth() + 1;
    if (months < 10) {
      months = "0" + months;
    }

    var days = dates.getDate();
    if (days < 10) {
      days = "0" + days;
    }

    var hours = dates.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }

    var mins = dates.getMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }

    var secs = dates.getSeconds();
    if (secs < 10) {
      secs = "0" + secs;
    }
    var time =
      years +
      space +
      months +
      space +
      days +
      space +
      hours +
      space +
      mins +
      space +
      secs;
    return time;
  }

  /**
     * 设置公共参数
     * @param {*} service  服务资源类型
     * @param {*} oldParams 参数 key-value形式的字符串 
     * @return 新的参数
     */
  static getNewParams(service, oldParams) {
    var newParams = "";
    var currentDate = this.getCurrentDate();
    var MD5KEY = "XXXXXX";
    var digestStr = MD5KEY + service + currentDate + MD5KEY;
    newParams =
      oldParams +
      "&timestamp=" +
      currentDate +
      "&digest=" +
      this.MD5(digestStr);
    return newParams;
  }

  /**
     * 获取当前系统时间 yyyyMMddHH
     */
  static getCurrentDateFormat() {
    var space = "";
    var dates = new Date();
    var years = dates.getFullYear();
    var months = dates.getMonth() + 1;
    if (months < 10) {
      months = "0" + months;
    }

    var days = dates.getDate();
    if (days < 10) {
      days = "0" + days;
    }
    var time = years + space + months + space + days;
    return time;
  }
}

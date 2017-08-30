var fetch = require("node-fetch"); 
export function Fetch(url, options) {
    options.body = JSON.stringify(options.body)
  
    const defer = new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.code === 0) {
            resolve(data) //返回成功数据
          } else {
              if (data.code === 401) {
              //失败后的一种状态
              } else {
              //失败的另一种状态
              }
            reject(data) //返回失败数据
          }
        })
        .catch(error => {
          //捕获异常
          console.log(error.msg)
          reject() 
        })
    })
  
    return defer
  }
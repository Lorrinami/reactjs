import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
import Button from "../forms/Button";
import ButtonTwo from "../forms/ButtonTwo";
import Input from "../forms/Input.jsx";
import ControllInput from "../forms/ControllInput.jsx";
import Form from '../forms/Form.jsx';
const uuidv4 = require("uuid/v4");
var fetch = require("node-fetch"); //fetch网络请求,还有另外一个fetch库，注意区分不同。fetch默认为get请求。


const TimersDashboard = React.createClass({
  getTimers: function(success) {
    return fetch("http://192.168.4.153:3004/api/timers", {
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  checkStatus: function() {
    //这个函数是在client. js中定义的。它检查服务器是否返回 一个错误。如果服务器返回一个错误，checkStatus()将错误记录到控制台
  },
  parseJSON: function() {
    // 这个函数也在client . js中定义。它接收响应对象 由fetch()发出并返回一个JavaScript对象
  },
  success: function() {
    // 这是我们作为gettimer()参数传递的函数。getTimers()将 如果服务器成功地返回响应，则调用此函数
  },
  getInitialState: function() {
    return {
      timers: []
    };
  },
  componentDidMount: function() {
    this.loadTimersFromServer();
    // setInterval(this.loadTimersFromServer, 5000);
  },
  loadTimersFromServer: function() {
    this.getTimers().then((serverTimers) => {
      console.log(serverTimers);
      this.setState({ timers: serverTimers });
    });
  },
  create: function(timer) {
    return {
      title: timer.title,
      project: timer.project,
      id: uuidv4(),
      elapsed: 0,
      runningSince: null
    };
  },
  handleCreateFormSubmit: function(timer) {
    this.createTimer(timer);
  },
  createTimer: function(timer) {
    const t = this.create(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    });
  },
  handleEditFormSubmit: function(attrs) {
    this.updateTimer(attrs);
  },
  handleTrashClick: function(timerId) {
    this.deleteTimer(timerId);
  },
  handleStartClick: function(timerId) {
    this.startTimer(timerId);
  },
  handleStopCLick: function(timerId) {
    this.stopTimer(timerId);
  },
  deleteTimer: function(timerId) {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    });
  },
  startTimer: function(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now
          });
        } else {
          return timer;
        }
      })
    });
  },
  stopTimer: function(timerId) {
    const now = Date.now();
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          });
        } else {
          return timer;
        }
      })
    });
  },
  updateTimer: function(attrs) {
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project
          });
        } else {
          return timer;
        }
      })
    });
  },
  render: function() {
    return (
      <div className="">
        <div className="column">
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopCLick}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
          <Button></Button>
          <ButtonTwo></ButtonTwo>
          <ControllInput></ControllInput>
          <Input></Input>
          <Form></Form>
        </div>
      </div>
    );
  }
});

export default TimersDashboard;

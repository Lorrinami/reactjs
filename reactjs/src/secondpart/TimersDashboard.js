import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
const uuidv4 = require('uuid/v4');

const TimersDashboard = React.createClass({
  getInitialState: function() {
    return {
      timers: [
        {
          title: "Practice squat",
          project: "Gym Chores",
          id: uuidv4(),
          elapsed: 5456099,
          runningSince: Date.now()
        },
        {
          title: "Bake squash",
          project: "Kitchen Chodres",
          id: uuidv4(),
          elapsed: 1273998,
          runningSince: null
        }
      ]
    };
  },
  create: function(timer) {
    return {
        title:timer.title,
        project: timer.project,
          id: uuidv4(),
          elapsed:0,
          runningSince: null
    }
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
  handleEditFormSubmit:function(attrs){
      this.updateTimer(attrs);
  },
  handleTrashClick:function(timerId){
    this.deleteTimer(timerId);
  },
  handleStartClick:function(timerId){
    this.startTimer(timerId)
  },
  handleStopCLick:function(timerId){
    this.stopTimer(timerId);
  },
  deleteTimer:function(timerId){
    this.setState({
      timers:this.state.timers.filter(t=>t.id!==timerId),
    });
  },
  startTimer:function(timerId){
    const now=Date.now();
    this.setState({
      timers:this.state.timers.map((timer)=>{
          if(timer.id===timerId){
            return Object.assign({},timer,{
              runningSince:now,
            });
          }else{
            return timer;
          }
      }),
    });
  },
  stopTimer:function(timerId){
    const now = Date.now();
    this.setState({
      timers:this.state.timers.map((timer)=>{
        if(timer.id === timerId){
          const lastElapsed = now - timer.runningSince;
          return Object.assign({},timer,{
            elapsed:timer.elapsed+lastElapsed,
            runningSince:null,
          })
        }else{
          return timer;
        }
      }),
    });
    },
  updateTimer:function(attrs){
    this.setState({
        timers:this.state.timers.map((timer)=>{
            if(timer.id === attrs.id){
                return Object.assign({},timer,{
                    title:attrs.title,
                    project:attrs.project,
                });
            }else{
                return timer;
            }
        })
    })
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
        </div>
      </div>
    );
  }
});

export default TimersDashboard;

import React from "react";
import EditableTimerList from "./EditableTimerList";
import ToggleableTimerForm from "./ToggleableTimerForm";
let UUID = require("uuid-js");

const TimersDashboard = React.createClass({
  getInitialState: function() {
    return {
      timers: [
        {
          title: "Practice squat",
          project: "Gym Chores",
          id: UUID.create(),
          elapsed: 5456099,
          runningSince: Date.now()
        },
        {
          title: "Bake squash",
          project: "Kitchen Chodres",
          id: UUID.create(),
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
          id: UUID.create(),
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
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
        </div>
      </div>
    );
  }
});

export default TimersDashboard;

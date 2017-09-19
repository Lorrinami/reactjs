import React from "react";
import TimerForm from "./TimerForm";
import "./ToggleableTimerForm.css";
import '../semantic/semantic.css';
const ToggleableTimerForm = React.createClass({
    getInitialState:function(){
        return{
            isOpen:false,
        }
    },
    handleFormOpen:function(){
        this.setState({isOpen:true});
    },
    handleFormClose:function(){
        this.setState({isOpen:false});
    },
    handleFormSubmit:function(timer){
        this.props.onFormSubmit(timer);
        this.setState({isOpen:false});
    },
  render: function() {
    if (this.state.isOpen) {
      return <TimerForm 
              onFormSubmit={this.handleFormSubmit}
              onFormClose={this.handleFormClose} 
            />;
    } else {
      return (
          <div className="ui basic content center aligned segment">
            <button className="ui basic button icon"
            onClick={this.handleFormOpen}>
              <i className="plus icon" />
            </button>
          </div>
      );
    }
  }
});

export default ToggleableTimerForm;

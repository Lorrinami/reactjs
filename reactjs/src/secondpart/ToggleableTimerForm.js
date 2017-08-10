import React from "react";
import TimerForm from "./TimerForm";
import "./ToggleableTimerForm.css";

const ToggleableTimerForm = React.createClass({
  render: function() {
    if (this.props.isOpen) {
      return <TimerForm />;
    } else {
      return (
          <div className="add">
            <button className="">
              添加
              <i className="" />
            </button>
          </div>
      );
    }
  }
});

export default ToggleableTimerForm;

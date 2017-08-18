import React from "react";

const TimerOptionButton = React.createClass({
  render: function() {
    if (this.props.isHover) {
      return (
        <div className="" >
          <span className="redText" onClick={this.props.onHandleTrashClick}>
            删除
            <i className="" />
          </span>
          <span className="blueText" onClick={this.props.onEditClick}>
            编辑
            <i className="" />
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
});

export default TimerOptionButton;

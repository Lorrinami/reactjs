import React from "react";
import '../semantic/semantic.css';
const TimerOptionButton = React.createClass({
  render: function() {
    if (this.props.isHover) {
      return (
        <div className="extra content" >
          <span className="right floated edit icon" onClick={this.props.onEditClick}>
            <i className="edit icon" />
          </span>
          <span className="right floated trash icon" onClick={this.props.onHandleTrashClick}>
            <i className="trash icon" />
          </span>
        </div>
      );
    } else {
      return null;
    }
  }
});

export default TimerOptionButton;

import React from "react";
import './Timer.css';

const Timer = React.createClass({
  millisecondToDate: function(msd) {
    // var time = parseFloat(msd) / 1000;
     var leftsecond = parseInt(msd / 1000);
    if (null != leftsecond && "" != leftsecond&&leftsecond!==0) {
        var day = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);
        day < 10 ? day="0" + day : day;
        hour < 10 ? hour="0"+hour : hour;
        minute < 10 ? minute="0"+minute : minute;
        second < 10 ? second="0"+second : second;
    //   if (time > 60 && time < 60 * 60) {
    //     time =
    //       parseInt(time / 60.0) +
    //       ":" +
    //       parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
    //       "";
    //   } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
    //     time =
    //       parseInt(time / 3600.0) +
    //       ":" +
    //       parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) +
    //       ":" +
    //       parseInt(
    //         (parseFloat(
    //           (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
    //         ) -
    //           parseInt(
    //             (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
    //           )) *
    //           60
    //       ) +
    //       "";
    //   } else {
    //     time = parseInt(time) + "";
    //   }
    return hour+":"+minute+":"+second;
    }else{
        return "00:00:00";
    }
    
  },
  render: function() {
      const elapsedString = this.millisecondToDate(this.props.elapsed);
      return(
        <div className='test'>
            <div className=''>
                <div className= ''>
                    {this.props.title}
                </div>
                <div className=''>
                    {this.props.project}
                </div>
                <div className=''>
                    <h2>
                        {elapsedString}
                    </h2>
                </div>
                <div className=''>
                    <span className='redText'>
                        删除
                        <i className=''></i>
                    </span>
                    <span className='blueText'
                        onClick={this.props.onEditClick}
                    >
                        编辑
                        <i className=''></i>
                    </span>
                </div>
            </div>
            <div className=''>
                Start
            </div>
        </div>
      );
  }
});

export default Timer;

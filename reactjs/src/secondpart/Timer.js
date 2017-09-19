import React from "react";
import './Timer.css';
import TimerActionButton from './TimerActionButton';
import TimerOptionButton from './TimerOptionButton';
import '../semantic/semantic.css';
const Timer = React.createClass({
   getInitialState: function() {
    return {
      hover:false,
    };
  },
  millisecondToDate: function(msd,runningSince) {
    // var time = parseFloat(msd) / 1000;
    if(runningSince!=null){
        msd=msd+(Date.now()-runningSince);
    }
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
  handleTrashClick:function(){
    this.props.onTrashClick(this.props.id);
  },
  componentDidMount:function(){
    this.forceUpdateInterval = setInterval(()=>this.forceUpdate(),50);
  },
  componentWillUnmount:function(){
    clearInterval(this.forceUpdateInterval);
  },
  handleStartClick:function(){
    this.props.onStartClick(this.props.id);
  },
  handleStopClick:function(){
    this.props.onStopClick(this.props.id);
  },
  display:function(){
    this.setState({hover:true,});
  },
  gone:function(){
    this.setState({hover:false,});
  },
  render: function() {
      const elapsedString = this.millisecondToDate(this.props.elapsed,this.props.runningSince);
      return(
        <div className='ui centered card'
        onMouseEnter={this.display} onMouseLeave={this.gone}>
            <div className='content'>
                <div className= 'header'>
                    {this.props.title}
                </div>
                <div className='meta'>
                    {this.props.project}
                </div>
                <div className='center aligned description'>
                    <h2>
                        {elapsedString}
                    </h2>
                </div>
                <TimerOptionButton 
                       onHandleTrashClick={this.handleTrashClick}
                       onEditClick={this.props.onEditClick}
                       isHover={this.state.hover}
                >
                  
                </TimerOptionButton>
            </div>
            <TimerActionButton
                timerIsRunning={!!this.props.runningSince}
                onStartClick={this.handleStartClick}
                onStopClick={this.handleStopClick}
            />
        </div>
      );
  }
});

export default Timer;

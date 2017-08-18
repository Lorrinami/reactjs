import React from 'react';

const TimerActionButton = React.createClass({
    render:function(){
        if(this.props.timerIsRunning){
            return(
                <div
                    className=''
                    onClick={this.props.onStopClick}
                >
                    Stop
                </div>
            );
        }else{
            return(
            <div
                className=''
                onClick={this.props.onStartClick}
            >
                Start
            </div>
            );
        }
    }
})

export default TimerActionButton;
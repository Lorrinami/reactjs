import React from 'react';
import '../semantic/semantic.css';
const TimerActionButton = React.createClass({
    render:function(){
        if(this.props.timerIsRunning){
            return(
                <div
                    className='ui bottom attached red basic button'
                    onClick={this.props.onStopClick}
                >
                    Stop
                </div>
            );
        }else{
            return(
            <div
                className='ui bottom attached blue basic button'
                onClick={this.props.onStartClick}
            >
                Start
            </div>
            );
        }
    }
})

export default TimerActionButton;
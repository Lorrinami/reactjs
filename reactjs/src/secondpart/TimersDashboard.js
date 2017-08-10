import React from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';
let UUID  = require('uuid-js');

const TimersDashboard = React.createClass({
    getInitialState:function(){
        return{
            timers:[
                {
                    title:'Practice squat',
                    project:'Gym Chores',
                    id:UUID.create(),
                    elapsed:5456099,
                    runningSince:Date.now(),
                },
                {
                    title:'Bake squash',
                    project:'Kitchen Chodres',
                    id:UUID.create(),
                    elapsed:1273998,
                    runningSince:null,
                }
            ],
        };
    },
    render:function(){
        return(
            <div className=''>
                <div className='column'>
                    <EditableTimerList timers={this.state.timers}/>
                    <ToggleableTimerForm
                      isOpen={false}
                    />
                </div>
            </div>
        );
    }
})

export default TimersDashboard;
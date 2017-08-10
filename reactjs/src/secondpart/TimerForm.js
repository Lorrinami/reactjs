import React from 'react';
import './TimerForm.css';

const TimerForm = React.createClass({
    render:function(){
        const submitText = this.props.title ? 'Update' :'Create';
        return(
            <div className='border'>
                <div className='margin_top'>
                    <div className=''>
                        <div className=''>
                            <label>Title</label>
                            <input type='text' defaultValue={this.props.title}/>
                        </div>
                        <div className=''>
                            <label>Project</label>
                            <input type='text' defaultValue={this.props.project}/>
                        </div>
                        <div className=''>
                            <button className>
                                {submitText}
                            </button>
                            <button>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default TimerForm;
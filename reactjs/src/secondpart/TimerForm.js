import React from 'react';
import './TimerForm.css';

const TimerForm = React.createClass({
    handleSubmit:function(){
        this.props.onFormSubmit({
            id:this.props.id,
            title:this.refs.title.value,
            project:this.refs.project.value,
        });
    },
    render:function(){
        const submitText = this.props.id ? 'Update' :'Create';
        return(
            <div className='border'>
                <div className='margin_top'>
                    <div className=''>
                        <div className=''>
                            <label>Title</label>
                            <input type='text' ref='title' defaultValue={this.props.title}/>
                        </div>
                        <div className=''>
                            <label>Project</label>
                            <input type='text' ref='project' defaultValue={this.props.project}/>
                        </div>
                        <div className=''>
                            <button className='' onClick={this.handleSubmit}>
                                {submitText}
                            </button>
                            <button onClick={this.props.onFormClose}>
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
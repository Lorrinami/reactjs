import React from 'react';
import Timer from './Timer';
import TimerForm from './TimerForm';

const EditableTimer = React.createClass({
    getInitialState:function(){
        return{
            editFormOpen:false,
        }
    },
    handleEditClick:function(){
        this.openForm();
    },
    handleFormClose:function(){
        this.closeForm();
    },
    handleSubmit:function(timer){
        this.props.onFormSubmit(timer);
        this.closeForm();
    },
    closeForm:function(){
        this.setState({editFormOpen:false});
    },
    openForm:function(){
        this.setState({editFormOpen:true});
    },
    render:function(){
        if(this.state.editFormOpen){
            return(
                <TimerForm
                   id={this.props.id}
                   title={this.props.title}
                   project={this.props.project}
                   onFormSubmit={this.handleSubmit}
                   onFormClose={this.handleFormClose}
                />
            );
        }else{
            return(
                <Timer
                  id={this.props.id}
                  title={this.props.title}
                  project={this.props.project}
                  elapsed={this.props.elapsed}
                  runningSince={this.props.runningSince}
                  onEditClick={this.handleEditClick}
                  onTrashClick={this.props.onTrashClick}
                  onStartClick={this.props.onStartClick}
                  onStopClick={this.props.onStopClick}
                />
            );
        }
    }
});

export default EditableTimer;
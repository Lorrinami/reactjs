import React from 'react';
import PropTypes from 'prop-types';
export default class CourseSelect extends React.Component{

    componentWillReceiveProps(update){//接收prop的修改更新界面
        this.setState({
            department:update.department,
            course:update.course,
        })
    }

    onSelectDepartment(evt){
        const department = evt.target.value;
        const course = null;
        this.setState({department,course});
        this.props.onChange({name:'department',value:department});
        this.props.onChange({name:'course',value:course});

        if(department) this.fetch(department);
    }

    render(){
        return(
            <div>
                {this.renderDepartmentSelect()}
                <br/>
                {this.renderCourseSelect()}
            </div>
        )
    }

    constructor(props){
        super(props);
        this.state={
            department:null,
            course:null,
            courses:[],
            _loading:false,
        }
    }
}

CourseSelect.propTypes={
    department:PropTypes.string,
    course:PropTypes.string,
    onChange:PropTypes.func.isRequired,
}
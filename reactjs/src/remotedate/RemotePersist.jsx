import React from 'react';
import isEmail from 'validator/lib/isEmail';//验证邮箱的外部导入方法
import FieldComponent from '../forms/FieldComponent';
import CourseSelect from '../remotedate/CourseSelect';

export default class ReomtePersist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fields:{},
            fieldErrors:{},
            people:[],
            _loading:false,//表示该组件私有的，parent and child不必要知道的值
            _saveStatus:'READY',//READY,SAVING,SUCCESS,ERROR
        };
    
      }
    onFormSubmit(evt){
        
        const person = this.state.fields;

        evt.preventDefault();

        if(this.validate()) return;
        const people = [...this.state.people,person];
        this.setState({_saveStatus:'SAVING'});
        apiClient.savePeople(people)
            .then(() => {
                this.setState({
                    people:people,
                    fields:{},
                    _saveStatus:'SUCCESS',
                })
            }).catch((err)=>{
                console.error(err);
                this.setState({_saveStatus:'ERROR'});
            })

        // const people=[...this.state.people];
        // const person=this.state.fields;
        // const fieldErrors=this.validate(person);
        // this.setState({fieldErrors});
        // evt.preventDefault();
        // if(Object.keys(fieldErrors).length) return;
        // people.push(person);
        // this.setState({people,fields:{}});
    }
    // onNameChange(evt){
    //     this.setState({name:evt.target.value});
    // }
    onInputChange(name,value,error){
        const fields = this.state.fields;
        const fieldErrors = this.state.fieldErrors;

        fields[name]=value;
        fieldErrors[name] = error;

        this.setState({fields,fieldError,_saveStatus:'READY'});
        // const fields=this.state.fields;
        // fields[evt.target.name]=evt.target.value;
        // this.setState({fields});
    }
    validate(){
        const person=this.state.fields;
        const fieldErrors = this.state.fieldErrors;
        const errMessages = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        
        if(!person.name) return true;
        if(!person.email) return true;
        if(!person.course) return true;
        if(!person.department) return true;
        if(errMessages.length) return true;//确保每个Field都没有返回错误才能通过。

        // if(!person.name) errors.name='Name Required';
        // if(!person.email) errors.email = 'Email Required';
        // if(person.email&&!isEmail(person.email)) errors.email='Invalid Email';
        return false;
    }

    componentWillMount(){//
        this.setState({_loading:true});
        apiClient.loadPeople().then((people) => {
            this.setState({_loading:false,people:people});
        })
    }

    render(){
        if(this.state._loading){
            return <span>加载中...</span>
        }
        return(
            <div>
                <h1>Select Course</h1>

                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <FieldComponent
                        placeholder='Name'
                        name='name'
                        value={this.state.fields.name}
                        onChange={this.onInputChange.bind(this)}
                        validate={(val) => (val ? false : 'Name Required')}
                    />
                    <br/>
                    <FieldComponent
                        placeholder='Email'
                        name='email'
                        value={this.state.fields.email}
                        onChange={this.onInputChange.bind(this)}
                        validate={(val) => (isEmail(val) ? false : 'Invalid Email')}
                    />
                    <br/>
                    <CourseSelect
                        department={this.state.fields.department}
                        course={this.state.fields.course}
                        onChange={this.onInputChange}
                    />
                    <br/>
                    {{
                        SAVING:<input value ='Saving...' type='submit' disable/>,
                        SUCCESS:<input value='Saved!' type='submit' disable/>,
                        ERROR:<input
                            value='Save Failed - Retry?'
                            type='submit'
                            disabled={this.validate()}
                        />,
                        READY:<input 
                            value='Submit'
                            type='submit'
                            disable={this.validate()}
                        />
                    }[this.state._saveStatus]}//处理不同的状态
                    <input type='submit'/>
                </form>
                <div>
                    <h3>People</h3>
                    <ul>
                       {this.state.people.map(({name,email},i)=>
                       <li key={i}>{[name, email ,department, course].join('-')}</li>
                       )} 
                    </ul>
                </div>
            </div>
        )
    }
}
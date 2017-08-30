import React from 'react';
import isEmail from 'validator/lib/isEmail';//验证邮箱的外部导入方法
import FieldComponent from '../forms/FieldComponent';

export default class From extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fields:{},
            fieldErrors:{},
            people:[],
        };
    
      }
    onFormSubmit(evt){
        const people = this.state.people;
        const person = this.state.fields;

        evt.preventDefault();

        if(this.validate()) return;
        
        people.push(person);
        this.setState({people,fields:{}});

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

        this.setState({fields,fieldErrors});
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
        if(errMessages.length) return true;//确保每个Field都没有返回错误才能通过。

        // if(!person.name) errors.name='Name Required';
        // if(!person.email) errors.email = 'Email Required';
        // if(person.email&&!isEmail(person.email)) errors.email='Invalid Email';
        return false;
    }
    render(){
        return(
            <div>
                <h1>FieldComponent</h1>

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
                    <input type='submit'/>
                </form>
                <div>
                    <h3>People</h3>
                    <ul>
                       {this.state.people.map(({name,email},i)=><li key={i}>{name}({email})</li>)} 
                    </ul>
                </div>
            </div>
        )
    }
}
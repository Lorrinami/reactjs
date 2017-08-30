import React from 'react';

export default class Input extends React.Component{
    constructor(props) {
        super(props);
        this.state = {names:['']};
    
      }
    onFormSubmit(evt){
        const name =this.refs.name.value;
        const names=[...this.state.names,name];
        this.setState({names:names});
        this.refs.name.value='';
        evt.preventDefault();//阻止浏览器的默认操作
        console.log(this.refs.name.value);
    }

    render(){
        return(
            <div>
                <h1>Sign Up Sheet</h1>

                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input
                        placeholder='Name'
                        ref='name'
                    />

                    <input type='submit'/>
                </form>
                <div>
                    <h3>Name</h3>
                    <ul>
                       {this.state.names.map((name,i)=><li key={i}>{name}</li>)} 
                    </ul>
                </div>
            </div>
        )
    }
}
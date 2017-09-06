import React from 'react';
import './Switch.css';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';
export default class Switch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            payMethod: BTC
        };
    }

    select(choice){
        return(evt) => {
            this.setState({
                payMethod:choice
            })
        }
    }

    renderChoice(choice){
        let cssClasses = [];

        if(this.state.payMethod === choice) {
            cssClasses.push('active');
        }
        return(
            <div className='choice'
                onClick={this.select(choice)}
                className={cssClasses}
            >
                {choice}
            </div>
        )
    }

    render(){
        return (
            <div className='switch' >
                {this.renderChoice(CREDITCARD)}
                {this.renderChoice(BTC)}
                Pay with : {this.state.payMethod}
            </div>
        )
    }
}
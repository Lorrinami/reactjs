import React from 'react';
import './Switch.css';

const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';
const Choice = function(props) {//通过props来传递数据
    let cssClasses = [];
    if(props.active) {
        cssClasses.push('active');
    }

    return(
        <div className='choice'
            onClick={props.onClick}
            className={cssClasses}
        >
            {props.label}
        </div>
    )
}
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
                <Choice
                  onClick={this.select(CREDITCARD)}
                  active={this.state.payMethod === CREDITCARD}
                  label='Pay with Creditcard'/>

                  <Choice
                    onClick={thi.select(BTC)}
                    active={thi.state.payMethod === BTC}
                    label='Pay with Bitcoin'/>
                Pay with : {thi.state.payMethod}
            </div>
        )
    }
}
import React from 'react';

export default class ButtonTwo extends React.Component{
    onButtonClick(evt){
        const btn=evt.target;
        console.log('The user clicked'+btn.name+':'+btn.value)
    }

    render(){
        return(
            <div>
                <h1>What do you think of React?</h1>
                <button
                    name='button-1'
                    value='great'
                    onClick={this.onButtonClick}
                >
                great
                </button>

                <button
                    name='button-2'
                    value='great'
                    onClick={this.onButtonClick}
                >
                Amazing
                </button>
            </div>
        )
    }
}
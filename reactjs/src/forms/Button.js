import React from 'react';

export default class Button extends React.Component{
    onGreatClick(evt){
        console.log('The user ckicked button-1:great',evt);
    }
    onAmazingClick(evt){
        console.log('The user clicked button-2:amazing',evt);
    }
    render(){
        return(
            <div>
                <h1>What do you think of React?</h1>

                <button
                    name='button-1'
                    value='great'
                    onClick={this.onGreatClick}
                >Great</button>

                <button
                    name='button-2'
                    value='amazing'
                    onClick={this.onAmazingClick}
                >Amazing</button>
            </div>
        );
    }
}
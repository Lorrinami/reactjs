import React from 'react';

export default class App extends React.Component{
    createStore(reducer, initialSta){
        let state = initialSta;
    }

    reducer(state, action) {
        if(action.type === 'ADD_MESSAGE'){
            return{
                messages:state.messages.concat(action.message),
            };
        }else{
            return state;
        }
    }
}
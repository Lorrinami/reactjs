import React from 'react';

export default class ReduxApp extends React.Component{
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }
    render(){
        const messages = store.getState().messages;
        return(
            <div className='ui segement'>
                <MessageView messages={messages}/>
                <MessageInput/>
            </div>
        )
    }
}

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];//定义一个监听器数组
  const subscribe = (listener) => (//添加一个订阅方法，向监听器数组添加一个新的监听
      listeners.push(listener)
  );
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach( l => l());//当state改变时调用每个监听器
  };
  return {
    subscribe,//使外界可以访问
    getState,
    dispatch
  };
}

//reducer必须为纯函数
function reducer(state, action) {
  if (action.type === "ADD_MESSAGE") {
    return {
      messages: state.messages.concat(action.message)
    };
  } else if(action.type === 'DELETE_MESSAGE'){
    return{
      messages:[
          ...state.messages.slice(0,action.index),
          ...state.messages.slice(
              action.index+1,state.messages.length
          ),
      ],
    };
  } else {
    return state;
  }
}

const initialState = { messages : []};
const store = createStore(reducer,initialState);

class Message extends React.Component{
    handleDeleteClick(){
        store.dispatch({
            type: 'DELETE_MESSAGE',
            index: this.props.index,
        });
    }
}

class MessageInput extends React.Component{
    handleSubmit(){
        store.dispatch({
            type: 'ADD_MESSAGE',
            message: this.refs.messageInput.value,
        });
        this.refs.messageInput.value = '';
    }
}
import React from "react";
import '../semantic/semantic.css';
import {createStore,combineReducers} from 'redux';
const uuidv4 = require("uuid/v4");

export default class ReduxPresentational extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads;
    const activeThread = threads.find((t) => t.id === activeThreadId);
    const tabs = threads.map(t => (
      {
        title:t.title,
        active:t.id === activeThreadId,
        id:t.id,
      }
    ));
    return (
      <div className="ui segement">
        <ThreadTabs tabs={tabs}/>
        <ThreadDisplay thread={activeThread}/>
      </div>
    );
  }
}

// function createStore(reducer) {
//   let state = initialState;
//   const listeners = []; //定义一个监听器数组
//   const subscribe = (
//     listener //添加一个订阅方法，向监听器数组添加一个新的监听
//   ) => listeners.push(listener);
//   const getState = () => state;
//   const dispatch = action => {
//     state = reducer(state, action);
//     listeners.forEach(l => l()); //当state改变时调用每个监听器
//   };
//   return {
//     subscribe, //使外界可以访问
//     getState,
//     dispatch
//   };
// }

function threadsReducer(state = [
    {
        id: '1-fca2',
        title: 'Buzz Aldrin',
        messages:messagesReducer(undefined, {}),
    },
    {
        id: '2-be91',
        title: 'Michael Collins',
        messages:messagesReducer(undefined, {}),
    },
], action) {
    switch(action.type) {
        case 'ADD_MESSAGE':
        case 'DELETE_MESSAGE':{
            const threadIndex = findThreadIndex(state,action);
            const oldThread = state[threadIndex];
            const newThread = {//因为必须为纯函数，不能修改原有对象，所以新建对象。
              ...oldThread,
              messages:messagesReducer(oldThread.messages, action),
            };
            return [
                ...state.slice(0, threadIndex),
                newThread,
                ...state.slice(threadIndex + 1, state.length)
              ];
        }
        default: {
            return state;
        }
    }
    
}

function messagesReducer(state = [],action){
    if(action.type === 'ADD_MESSAGE') {
        const newMessage = {
            text:action.text,
            timestamp: Date.now(),
            id: uuidv4(),
        }
        return state.concat(newMessage);
    }else if(action.type === 'DELETE_MESSAGE'){
        const messageIndex = state.findIndex(
            (m) => m.id === action.id
          )
          const messages = [
            ...state.slice(0,messageIndex),
            ...state.slice(
              messageIndex+1, state.length
            ),
          ];
    } else {
        return state;
    }
}

function findThreadIndex(threads, action){
    switch(action.type) {
        case 'ADD_MESSAGE': {
            return threads.findIndex(
                (t) => t.id === action.threadId
            );
        }
        case 'DELETE_MESSAGE': {
            return threads.findIndex(
                (t) => t.messages.find((m) => (
                    m.id === action.id
                ))
            );
        }
    }
}

function activeThreadReducer(state = '1-fca2',action){
   if(action.type === 'OPEN_THREAD'){
        return action.id
    } else {
        return state;
    }
}

// //reducer必须为纯函数
// function reducer(state = {}, action) {
//     return{
//         activeThreadId:activeThreadReducer(state.activeThreadId, action),
//         threads: threadsReducer(state.threads, action),
//     };
// }
const reducer = combineReducers({
    activeThreadId:activeThreadReducer,
    threads: threadsReducer,
})

const store = createStore(reducer);

class MessageInput extends React.Component {
  handleSubmit() {
    store.dispatch({
      type: "ADD_MESSAGE",
      text: this.refs.messageInput.value,
      threadId: this.props.threadId,
    });
    this.refs.messageInput.value = "";
  }
  render() {
    return (
        <div className='ui input'>
            <input
              ref='messageInput'
              type='text'
            >
            </input>
            <button
              onClick={this.handleSubmit.bind(this)}
              className='ui primary button'
              type='submit'
            >Submit</button>
        </div>
    )
  }
}



class ThreadTabs extends React.Component {
    componentDidMount() {
      store.subscribe(() => this.forceUpdate());
    }
    render() {
        const state = store.getState();
        const tabs = state.threads.map(t => (
          {
              title: t.title,
              active: t.id === state.activeThreadId,
              id: t.id,
          }
        ));
        return(
            <Tabs
            tabs={tabs}
            onClick={(id) =>
              store.dispatch({//直接分发事件给store
                type: "OPEN_THREAD",
                id: id
              })}
          />
        )
    }
  }

const Tabs = (props) => {
    return(
        <div className="ui top attached tabular menu">
        {props.tabs.map((tab, index) => (
            <div
            key={index}
            className={tab.active ? "active item" : "item"}
            onClick={() => props.onClick(tab.id)}
            >
            {tab.title}
            </div>
        ))}
        </div>
    )
};



const TextFieldSubmit = (props) => {
    let input;
    return(
        <div className='ui input'>
            <input 
                ref = {node => input = node}
            >
            </input>
            <button
                onClick={() => {
                    props.onSubmit(input.value);
                    input.value = '';
                }}
                className = 'ui primary button'
                type = 'submit'
            >
                Submit
            </button>
        </div>
    )
}

const MessageList = (props) => {
    <div className='ui comments'>
        {
            props.message.map((m,index) => (
                <div
                  className='comment'
                  key={index}
                  onClick={() => props.onClick(m.id)}
                >
                    <div className='text'>
                        {m.text}
                        <span className='metadata'>@{m.timestamp}</span>
                    </div>
                </div>
            ))
        }
    </div>
}


const Thread = (props) => {
    return(
        <div className='ui center aligned basic segment'>
            <MessageList
                messages={props.thread.messages}
                onClick={props.onMessageClick}
            />
            <TextFieldSubmit
                onSubmit={props.onMessageSubmit}
            />
        </div>
    )
}

class ThreadDisplay extends React.Component{
    componentDidMount(){
        store.subscribe(() => this.forceUpdate());
    }

    render(){
        const state = store.getState();
        const activeThreadId = state.activeThreadId;
        const activeThread = state.threads.find(t => t.id === activeThreadId);

        return(
            <Thread
                thread = {activeThread}
                onMessageClick = {(id) => (
                    store.dispatch({
                        type:'DELETE_MESSAGE',
                        id: id,
                    })
                )}
                onMessageSubmit = {(text) => (
                    store.dispatch({
                        type: 'ADD_MESSAGE',
                        text: text,
                        threadId: activeThreadId,
                    })
                )}
                />
        )
    }
}
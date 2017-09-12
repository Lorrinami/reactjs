import React from "react";
import '../semantic/semantic.css';
const uuidv4 = require("uuid/v4");

export default class ReduxApp1 extends React.Component {
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
        <Thread thread={activeThread}/>
      </div>
    );
  }
}

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = []; //定义一个监听器数组
  const subscribe = (
    listener //添加一个订阅方法，向监听器数组添加一个新的监听
  ) => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(l => l()); //当state改变时调用每个监听器
  };
  return {
    subscribe, //使外界可以访问
    getState,
    dispatch
  };
}

//reducer必须为纯函数
function reducer(state, action) {
  if (action.type === "ADD_MESSAGE") {
    const newMessage = {
        text:action.text,
        timestamp:Date.now(),
        id:uuidv4(),
    };
    const threadIndex = state.threads.findIndex(
      (t) => t.id === action.threadId
    );
    const oldThread = state.threads[threadIndex];
    const newThread = {//因为必须为纯函数，不能修改原有对象，所以新建对象。
      ...oldThread,
      messages:oldThread.messages.concat(newMessage),
    }
    return {
      ...state,
      threads: [
        ...state.threads.slice(0, threadIndex),
        newThread,
        ...state.threads.slice(threadIndex + 1, state.threads.length)
      ]
    };
  } else if (action.type === "DELETE_MESSAGE") {
      const threadIndex = state.threads.findIndex(
        (t) => t.messages.find((m) => (
          m.id === action.id
        ))
      );
      const oldThread = state.threads[threadIndex];
      const messageIndex = oldThread.messages.findIndex(
        (m) => m.id === action.id
      )
      const messages = [
        ...oldThread.messages.slice(0,messageIndex),
        ...oldThread.messages.slice(
          messageIndex+1, oldThread.messages.length
        ),
      ];
      const newThread={
        ...oldThread,
        messages:messages,
      };
      return{
        ...state,
        threads:[
          ...state.threads.slice(0,threadIndex),
          newThread,
          ...state.threads.slice(
            threadIndex + 1, state.threads.length
          )
        ]
      };
  }else if(action.type === 'OPEN_THREAD'){
    return{
      ...state,
      activeThreadId: action.id,
    }
  } else {
    return state;
  }
}

const initialState = { 
  activeThreadId: '1-fca2',
  threads: [
  {
    id:'1-fca2',
    title:'Buzz Aldrin',
    messages:[
      {
        text:'Twelve minutes to ignition.',
        timestamp:Date.now(),
        id:uuidv4(),
      }
    ]
  },
  {
    id:'2-be91',
    title:'Michael Collins',
    messages:[],
  }
] };
const store = createStore(reducer, initialState);

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

class Thread extends React.Component{
  handleClick(id) {
    store.dispatch({
      type: "DELETE_MESSAGE",
      id: id,
    });
  }
  render(){
    const messges = this.props.thread.messages.map((message,index) => (
      <div
            className='comment'
            key={index}
            onClick={() => this.handleClick(message.id)}
          >
            <div className='text'>
                {message.text}
                <span className='metadata'>@{message.timestamp}</span>
            </div>
          </div>
    ));
    return(
      <div className='ui center aligned basic segment'>
        <div className='ui comments'>
          {messges}
        </div>
        <MessageInput threadId={this.props.thread.id}/>
      </div>
    )
  }
}

const ThreadTabs = React.createClass({
  handleClick(id){
    store.dispatch({
      type:'OPEN_THREAD',
      id: id,
    });
  },
  render(){
    const tabs = this.props.tabs.map((tab,index) => (
      <div
      key={index}
      className={tab.active ? 'active item' : 'item'}
      onClick={() => this.handleClick(tab.id)}
      >
      {tab.title}
      </div>
    ));
    return(
      <div className='ui top attached tabular menu'>
        {tabs}
      </div>
    )
  }
})

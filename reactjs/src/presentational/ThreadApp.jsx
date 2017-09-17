import React from "react";
import "../semantic/semantic.css";
import { createStore, combineReducers } from "redux";
const uuidv4 = require("uuid/v4");

export const ThreadApp = () => (
  <div className="ui segment">
    <ThreadTabs />
    <ThreadDisplay />
  </div>
);

const TextFieldSubmit = props => {
  let input;
  return (
    <div className="ui input">
      <input ref={node => (input = node)} />
      <button
        onClick={() => {
          props.onSubmit(input.value);
          input.value = "";
        }}
        className="ui primary button"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

const MessageList = (props) => {
  return (
    <div className="ui comments">
      {props.messages.map((m, index) => (
        <div
          className="comment"
          key={index}
          onClick={() => props.onClick(m.id)}
        >
          <div className="text">
            {m.text}
            <span className="metadata">@{m.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Thread = (props) => {
  return (
    <div className="ui center aligned basic segment">
      <MessageList
        messages={props.thread.messages}
        onClick={props.onMessageClick}
      />
      <TextFieldSubmit onSubmit={props.onMessageSubmit} />
    </div>
  );
};

class ThreadDisplay extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const activeThread = state.threads.find(t => t.id === activeThreadId);

    return (
      <Thread
        thread={activeThread}
        onMessageClick={id =>
          store.dispatch({
            type: "DELETE_MESSAGE",
            id: id
          })}
        onMessageSubmit={text =>
          store.dispatch({
            type: "ADD_MESSAGE",
            text: text,
            threadId: activeThreadId
          })}
      />
    );
  }
}

class ThreadTabs extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  render() {
    const state = store.getState();
    const tabs = state.threads.map(t => ({
      title: t.title,
      active: t.id === state.activeThreadId,
      id: t.id
    }));
    return (
      <Tabs
        tabs={tabs}
        onClick={id =>
          store.dispatch({
            //直接分发事件给store
            type: "OPEN_THREAD",
            id: id
          })}
      />
    );
  }
}

const Tabs = (props) => {
  return (
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
  );
};

function threadsReducer(
  state = [
    {
      id: "1-fca2",
      title: "Buzz Aldrin",
      messages: messagesReducer(undefined, {})
    },
    {
      id: "2-be91",
      title: "Michael Collins",
      messages: messagesReducer(undefined, {})
    }
  ],
  action
) {
  switch (action.type) {
    case "ADD_MESSAGE":
    case "DELETE_MESSAGE": {
      const threadIndex = findThreadIndex(state, action);
      const oldThread = state[threadIndex];
      const newThread = {
        //因为必须为纯函数，不能修改原有对象，所以新建对象。
        ...oldThread,
        messages: messagesReducer(oldThread.messages, action)
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

function messagesReducer(state = [], action) {
  if (action.type === "ADD_MESSAGE") {
    const newMessage = {
      text: action.text,
      timestamp: Date.now(),
      id: uuidv4()
    };
    return state.concat(newMessage);
  } else if (action.type === "DELETE_MESSAGE") {
    const messageIndex = state.findIndex(m => m.id === action.id);
    const messages = [
      ...state.slice(0, messageIndex),
      ...state.slice(messageIndex + 1, state.length)
    ];
  } else {
    return state;
  }
}

function findThreadIndex(threads, action) {
  switch (action.type) {
    case "ADD_MESSAGE": {
      return threads.findIndex(t => t.id === action.threadId);
    }
    case "DELETE_MESSAGE": {
      return threads.findIndex(t => t.messages.find(m => m.id === action.id));
    }
  }
}

function activeThreadReducer(state = "1-fca2", action) {
  if (action.type === "OPEN_THREAD") {
    return action.id;
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
  activeThreadId: activeThreadReducer,
  threads: threadsReducer
});

const store = createStore(reducer);

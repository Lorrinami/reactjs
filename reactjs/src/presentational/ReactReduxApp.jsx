import React from "react";
import "../semantic/semantic.css";
import { connect } from "react-redux";
import { createStore, combineReducers } from "redux";
const uuidv4 = require("uuid/v4");

export const ReactReduxApp = () => (
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

const MessageList = props => {
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

const Thread = props => {
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

// class ThreadDisplay extends React.Component {
//   componentDidMount() {
//     store.subscribe(() => this.forceUpdate());
//   }

//   render() {
//     const state = store.getState();
//     const activeThreadId = state.activeThreadId;
//     const activeThread = state.threads.find(t => t.id === activeThreadId);

//     return (
//       <Thread
//         thread={activeThread}
//         onMessageClick={id =>
//           store.dispatch({
//             type: "DELETE_MESSAGE",
//             id: id
//           })}
//         onMessageSubmit={text =>
//           store.dispatch({
//             type: "ADD_MESSAGE",
//             text: text,
//             threadId: activeThreadId
//           })}
//       />
//     );
//   }
// }


// class ThreadTabs extends React.Component {
//   componentDidMount() {
//     store.subscribe(() => this.forceUpdate());
//   }
//   render() {
//     const state = store.getState();
//     const tabs = state.threads.map(t => ({
//       title: t.title,
//       active: t.id === state.activeThreadId,
//       id: t.id
//     }));
//     return (
//       <Tabs
//         tabs={tabs}
//         onClick={id =>
//           store.dispatch({
//             //直接分发事件给store
//             type: "OPEN_THREAD",
//             id: id
//           })}
//       />
//     );
//   }
// }


const Tabs = props => {
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



const mapStateToTabsProps = state => {
  const tabs = state.threads.map(t => ({
    title: t.title,
    active: t.id === state.activeThreadId,
    id: t.id
  }));
  return {
    tabs
  };
};
const mapStateToThreadProps = state => ({
  thread: state.threads.find(t => t.id === state.activeThreadId)
});

const mapDispatchToThreadProps = dispatch => ({
  onMessageClick: id =>
    dispatch(deleteMessage(id)),
  dispatch: dispatch
});
const mergeThreadProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onMessageSubmit: text =>
    dispatchProps.dispatch(addMessage(text, stateProps.thread.id))
});

const mapDispatchToTabsProps = dispatch => ({
  onClick: id =>
    dispatch(openThread(id))
});


//意想不到的坑，注意函数顺序，不能提前调用
const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs);

const ThreadDisplay = connect(
  mapStateToThreadProps,
  mapDispatchToThreadProps,
  mergeThreadProps
)(Thread);

function deleteMessage(id) {
  return {
    type: 'DELETE_MESSAGE',
    id: id,
  };
}

function addMessage(text,threadId){
  return {
    type: 'ADD_MESSAGE',
    text: text,
    threadId: threadId,
  };
}

function openThread(id) {
  return {
    type: 'OPEN_THREAD',
    id: id,
  };
}
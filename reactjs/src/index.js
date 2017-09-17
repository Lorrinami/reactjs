import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ProductList from './ProductList';
import Switch from './advancedcomponent/Switch.jsx';
import StatelessSwitch from './advancedcomponent/StatelessSwitch.jsx';
import TimersDashboard from './secondpart/TimersDashboard';//复杂的交互
import FirstPage from './routing/FirstPage.jsx';//改变url
import SecondPage from './routing/SecondPage.jsx';//使用history
import ThirdPage from './routing/ThirdPage.jsx';//模拟router库的实现
import Fourth from './routing/usinglibrary/ForthPage.jsx';
import ReduxApp from './redux/ReduxApp.jsx';//使用reducer
import ReduxApp1 from './redux/ReduxApp1.jsx';//复杂的聊天界面
import ReduxAppBreakUp from './redux/ReduxAppBreakUp.jsx';//分解reducer
import ReduxPresentational from './presentational/ReduxPresentational.jsx';
import {ThreadApp} from './presentational/ThreadApp.jsx';
import { Provider } from 'react-redux'//1和下一个同时开启
import {ReactReduxApp} from './presentational/ReactReduxApp.jsx';//1
import { createStore, combineReducers } from "redux";
const uuidv4 = require("uuid/v4");
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
ReactDOM.render(<Provider store={store}><ReactReduxApp/></Provider>, document.getElementById('root'));
registerServiceWorker();



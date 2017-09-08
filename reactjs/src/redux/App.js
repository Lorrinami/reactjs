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

// const initialState = { messages : []};
// const store = createStore(reducer,initialState);

// const addMessageAction1 = {
//     type: 'ADD_MESSAGE',
//     message: 'How does it look, Neil?',
// };

// store.dispatch(addMessageAction1);
// const stateV1 = store.getState();

// const addMessageAction2 = {
//     type: 'ADD_MESSAGE',
//     message:'Looking good',
// };

// store.dispatch(addMessageAction2);
// const stateV2 = store.getState();


// const deleteMessageAction = {
//     type : 'DELETE_MESSAGE',
//     index:0,
// }

// store.dispatch(deleteMessageAction);
// const stateV3 = store.getState();

// console.log('State v1:');
// console.log(stateV1);
// console.log('StateV2:');
// console.log(stateV2);
// console.log('State v3:');
// console.log(stateV3);


const initialState = { messages : []};
const store = createStore(reducer,initialState);
const listener = () => {
    console.log(store.getState());
};
store.subscribe(listener);
const addMessageAction1 = {
    type:'ADD_MESSAGE',
    message: 'How do you read ?',
};
store.dispatch(addMessageAction1);

const addMessageAction2 = {
    type: 'ADD_MESSAGE',
    message: 'I read you loud and clear, Houston',
};
store.dispatch(addMessageAction2);

const deleteMessageAction = {
    type: 'DELETE_MESSAGE',
    index: 0,
}
store.dispatch(deleteMessageAction);
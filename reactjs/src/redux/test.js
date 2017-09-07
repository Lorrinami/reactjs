//在浏览器console中运行
function reducer(state, action) {
  if (action.type === "INCREMENT") {
    return state + action.amount;
  } else if (action.type === "DECREMENT") {
    return state - action.amount;
  } else {
    return state;
  }
}

function createStore(reducer) {//state是私有的，外部不可访问
  let state = 0;

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch
  };
}
// const incrementAction = { type: 'INCREMENT' };
//  console.log(reducer(0, incrementAction)); // -> 1
//  console.log(reducer(1, incrementAction)); // -> 2
//  console.log(reducer(5, incrementAction)); // -> 6
// const unknownAction = { type: 'UNKNOWN' };
//  console.log(reducer(5, unknownAction)); // -> 5
//  console.log(reducer(8, unknownAction)); // -> 8cdc
//  const decrementAction = { type: 'DECREMENT' };
//  console.log(reducer(10, decrementAction)); // -> 9
//  console.log(reducer(9, decrementAction)); // -> 8
//  console.log(reducer(5, decrementAction)); // -> 4

// const incrementAction = {
//   type: "INCREMENT",
//   amount: 5
// };
// console.log(reducer(0, incrementAction)); // -> 5
// console.log(reducer(1, incrementAction)); // -> 6
// const decrementAction = {
//   type: "DECREMENT",
//   amount: 11
// };
// console.log(reducer(100, decrementAction));


const store = createStore(reducer);
const incrementAction = {
    type: 'INCREMENT',
    amount: 3,
};
store.dispatch(incrementAction);
console.log(store.getState());//3
store.dispatch(incrementAction);
console.log(store.getState());//6
const decrementAction = {
    type: 'DECREMENT',
    amount: 4,
};

store.dispatch(decrementAction);
console.log(store.getState());//2
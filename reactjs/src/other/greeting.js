export const sayHi = () => (console.log('Hi!'));
export const sayBye = () => (console.log('Bye!'));

const saySomthing = () => (console.log('something!'));
// 使用方法 import {sayHi, sayBye}from './greeting.js'

//另外导出可以使用export{sayHi, sayBye};

//或者另一种导出const Greeting={sayHi,sayBye}; export default Greetings;
//使用为Greeting.sayHi();


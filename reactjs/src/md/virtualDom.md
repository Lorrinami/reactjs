虚拟DOM和阴影DOM，它们是一样的吗?
video 组件





var boldElement = React.createElement('b');
var mountElement = document.querySelector('#root');
// Render the boldElement in the DOM tree
ReactDOM.render(boldElement, mountElement);


React.createElement()接受3个参数
1 .工作DOM元素类型
2。元素的道具
3。元素的子元素
var mountElement = document.querySelector('#root');
// Third argument is the inner text
var boldElement = React.createElement('b', null, "Text (as a string)");
ReactDOM.render(boldElement, mountElement);

ReactDOM.render(boldElement, mountElement, function() {执行后的回调函数 })




 const props = {msg:"Hello", receipient: "World"}等价于
 <Component {...props} />
<!-- essentially the same as this: -->
<Component msg={"Hello"} receipient={"World"} />


 var cssNames = ['box', 'alert']
// and use the array of cssNames in JSX
(<div className={cssNames.join(' ')}></div>)


const klass = classnames({
 box: true, // always apply the box class
 alert: this.props.isAlert, // if a prop is set
 severity: this.state.onHighAlert, // with a state
 timed: false // never apply this class
});
 return (<div className={klass})





 • JSX in Depth⁴⁰ - (Facebook)
• If-Else in JSX⁴¹ - (Facebook)
• React (Virtual) DOM Terminology⁴² - (Facebook)
• What is Virtual DOM⁴³ - (Jack Bishop)
⁴⁰https://facebook.github.io/react/docs/jsx-in-depth.html
⁴¹https://facebook.github.io/react/tips/if-else-in-JSX.html
⁴²https://facebook.github.io/react/docs/glossary.html
⁴³http://jbi.sh/what-is-virtual-dom/
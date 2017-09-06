render(): 每个ReactComponent都需要一个函数
props: 组件的输入参数
context: 组件的全局变量
state: 将本地数据保存到组件的一种方法（影响渲染）
Stateless components:　编写可重用组件的简化方法
children: 如何交互和操作子组件
static: 如何在我们的组件上创建“类方法”


render: 在调用mounted和initialized之后，render()方法将会被调用，提供React对原生组件的虚拟表示
这个render()方法返回一个不属于“实际DOM”的元素，而是对虚拟DOM的描述



props: 不可改变的数据片段，从父母那里获得，相当于方法的参数   passing props

state: 保存数据，component的本地数据，通常state改变，组件需要重新渲染。属于私有属性，可改变。
  constructor(props){ //没有这个方法，组件将被认为是无状态的,允许我们定义组件的初始状态。
        super(props);
        this.state={
            payMethod: BTC
        };
    }
一般来说应该减少state的使用
什么时候使用state: 1. 不能使用fetched从外部取得 2. 不能通过组件传递进来
一般存储未计算的值，而且不需要在应用程序中同步


PropTypes: 验证通过props传递过来的值的方法。string number boolean function object array arrayOf node element shape instanceOf
MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

Default props: 作为在创建任何实例之前调用的getdefault道具()方法，我们不能使用任何实例变量，比如this.props在此方法中。此外，任何复杂对象返回通过getdefaultProps()在所有实例中共享，而不是复制。
MyComponent.defaultProps = {
  name: 'Stranger'
};


Stateless component：无状态组件旨在成为不需要任何特殊功能的轻量级组件
const Header = functioin(props) { //无状态组件并不是一个类，因为他不是ReactElement.只是函数，不能被生命周期方法调用，不能用refs，不能引用DOM
    return (<h1>{props.headerText}</h1>)
}
为什么使用无状态的组件：1.使state最少 2. 性能（因为React不需要跟踪内存中组件实例，进行任何脏检查）
虽然我们不能完全移除状态，但我们至少可以隔离它。这是一种常见的模式React应用程序:尝试将状态拉入一些父组件。


与子组件交流：props.children
一般来说，如果有多个children,this.props.children可以作为组件的列表。
例:
<Container>
    <Article headline='An interesting Article'>
      Content Here
    </Article>
</Container>

const Container = React.createClass({
    render:function(){
        <div className='container'>
            {this.props.children}
        </div>
    }
})

改写之后
const Container = React.createClass({
    propTypes:{
        children:React.PropTypes.oneOfType([
            React.PropTypes.element,
            React.PropTypes.array
        ])
    },
    render:function() {
        return(
            <div className='container'>
                {this.props.children}
            </div>
        );
    }
})

//每次只传入一个孩子
在容器组件内，我们可以处理孩子们总是能够被渲染成 等级的单叶
const Container = React.createClass({
    propTypes:{
        children: React.PropTypes.element.isRequired
    },
    render:function() {
        return(
            <div className='container'>
                {this.props.children}
            </div>
        );
    }
})


让我们重写上一个容器，以便为每个孩子提供一个可配置的包装器组件。 这里的想法是，这个组件需要: 1. A prop component，用来包装每个孩子 2.A prop children 需要包装的名单
const Container = React.createClass({
    propTypes: {
        componernt: React.PropTypes.element.isRequired,
        children: React.PropTypes.element.isRequired
    },

    renderChild: function(childData,index) {
        return React.createElement(
            this.props.component,
            {},
            childData
        );
    },
    render: function() {
        return(
            <div className='container'>
                {React.children.map(
                    this.props.children,
                    this.renderChild
                )}
            </div>
        )
    }
})

对象是一个常规数组 我们想重新排序子元素的顺序。React.Children.toArray()转换 
const Container = React.creat.createClass({
    propTypes:{
        component:React.PropTypes.element.isRequired,
        children: React.PropTypes.element.isRequired
    },
    render: function() {
        const arr = 
            React.Children.toArray(this.props.children);

            return(
                <div className='container'>
                  {arr.sort((a,b) => a.id < b.id)}
                </div>
            )
    }
})



通过使用道具和上下文，我们可以将数据输入到我们的组件中，并使用我们可以使用的PropTypes 明确期望我们要求的数据是什么。
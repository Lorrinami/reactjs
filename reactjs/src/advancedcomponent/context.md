Context:
指定上下文允许我们自动将变量从组件传递到组件，而不是需要在每层都传递我们的道具

使用context是实验性的，它类似于使用全局变量来处理应用中的state,应该尽量少使用上下文，因为会使代码变坏。

当时用context时，React负责将传递组件到树层次中的任意节点，任何组件都可以访问父组件的变量。


为了告知React,我们想要将context从父组件传递给其余的子元素，我们需要在父组件中定义两个属性：
childContextTypes和getChildContext
若要在子元素中取到 context,我们需要在子组件中定义contextTypes
例子：
const Messages = React.createClass({
    childContextTypes:{ //像propTypes只是定义，并没有使用，使用使用getChildContext()方法。
        users: PropTypes.array,
    }

    getChildContext:function(){//类似于getInitialState(),设置context的值。当父组件的state或者props改变时就会被调用。context更新，子组件将会收到更新信息。
        return {                     
            users: this.getUsers()
        }
    }
    propTypes:{
        users:PropTypes.array.isRequired,
        message: PropTypes.array.isRequired
    },
    render: function(){
        return(
            <div>
                <ThreadList/>
                <ChatWindow/>
            </div>
        )
    }
});

const ThreadList = React.createClass({
    contextTypes:{    //因为父组件设置了context属性后，任何子组件都可以接收到，为了抓取context,使用contextTypes来访问
        users: PropTypes.array,
    }
    render: function (){
        return (
            <div>
                <ul>
                    {this.context.users.map((u,idx) => (
                        <UserListing onClick={this.props.onClick}
                            key = {idx}
                            index = {idx}
                            user = {u}
                        />
                    ))}
                </ul>
            </div>
        )
    }
    //如果在组件中使用了contextTypes方法，那么生命周期的方法会有一个额外的参数nextContext
    componentWillReceiveProps(nextProps, nextContext) {
         // ...
    },
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // ...
    },
    componentWillUpdate(nextProps, nextState, nextContext) {
        // ...
    },
    componentDidUpdate(prevProps, prevState, prevContext) {
    // ...
    }
});

const ChatWindow = React.createClass({
    contextTypes:{    //因为父组件设置了context属性后，任何子组件都可以接收到，为了抓取context,使用contextTypes来访问
        users: PropTypes.array,
    }
    render: function (){

    }
});

const ChatMessage = React.createClass({
    contextTypes:{    //因为父组件设置了context属性后，任何子组件都可以接收到，为了抓取context,使用contextTypes来访问
        users: PropTypes.array,
    }
    render: function (){

    }
});

在无状态组件中，context通过第二个参数传递
const ChatHeader = (props,context) => {
    const user = props.participants[0];
    return (
        <div>
            <img src={user.avatar}/>
            <div className={styles.chatWith}>Chat with {user.username}<div/>
        </div>
    )
}
ChatHeader.propTypes = {participants: PropTypes.array}
ChatHeader.contextTypes = {user: PropTypes.array}

context的使用通常是需要检索全局变量的有限情况，例如用户登录。更倾向于使用props
表象组件和容器组件

表象组件不与redux交互，用props调用父组件的函数
表象组件可以是无状态组件，事实上，所有的表象组件都可以是无状态组件

分割ThreadTabs
const ThreadTabs = React.createClass({
  handleClick: function(id) {
    store.dispatch({
      type: "OPEN_THREAD",
      id: id
    });
  },
  render: function() {
    const tabs = this.props.tabs.map((tab, index) => (
      <div
        key={index}
        className={tab.active ? "active item" : "item"}
        onClick={() => this.handleClick(tab.id)}
      >
        {tab.title}
      </div>
    ));
    return <div className="ui top attached tabular menu">{tabs}</div>;
  }
});


所有的容器组件可以直接的分发事件给store，也可以直接在store中取数据

如果ref被设置为一个函数，那么在组件被加载后，React将调用该函数
ref:它向该函数提供的参数是对该元素的DOM节点的引用。
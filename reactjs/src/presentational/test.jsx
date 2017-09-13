class ThreadTabs extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  render() {
      const state = store.getState();
      const tabs = state.threads.map(t => (
        {
            title: t.title,
            active: t.id === state.activeThreadId,
            id: t.id,
        }
      ));
    <Tabs
      tabs={tabs}
      onClick={(id) =>
        store.dispatch({//直接分发事件给store
          type: "OPEN_THREAD",
          id: id
        })}
    />;
  }
}

const Tabs = props => {
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
  </div>;
};

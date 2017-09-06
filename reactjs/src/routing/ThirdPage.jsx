import React from "react";
import PropTypes from "prop-types";
import createHistory from "../../node_modules/history/createBrowserHistory.js";

//how to use
const App = () => {
  <Router>
    <div className="ui text container">
      <h2 className="ui dividing header">Which body of water?</h2>

      <ul>
        <li>
          <Link to="/atlantic">
            <code>/atlantic</code>
          </Link>
        </li>
        <li>
          <Link to="/pacific">
            <code>/pacific</code>
          </Link>
        </li>
      </ul>
      <hr />
      <Match pattern="/atlantic" component={Atlantic} />
      <Match pattern="/pacific" component={Pacific} />
    </div>
  </Router>
};

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>
      The Atlantic Ocean covers approximately 1/5th of the surface of the earth.
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinand Magellan, a Portuguese expolorer, named the ocean 'mar pacifico'
      in 1521, which means peaceful sea.
    </p>
  </div>
);

const Match = ({ pattern, component: Component }, { location }) => {
  const pathname = location.pathname;
  if (pathname.match(pattern)) {
    return <Component />;
  } else {
    return null;
  }
};

//要接收上下文，组件必须白名单，它应该收到的上下文的部分
Match.contextTypes = {
  location: React.PropTypes.object
};
const Link = ({ to, children }, { history }) => (
  <a
    onClick={e => {
      e.preventDefault();
      history.push(to);
    }}
    href={to}
  >
    {children}
  </a>
);
Link.contextTypes = {
  history: React.PropTypes.object
};

export default class ThridPage extends React.Component {
  render() {
    return (
      <Router>
        <div className="ui text container">
          <h2 className="ui dividing header">Which body of water?</h2>

          <ul>
            <li>
              <Link to="/atlantic">
                <code>/atlantic</code>
              </Link>
            </li>
            <li>
              <Link to="/pacific">
                <code>/pacific</code>
              </Link>
            </li>
          </ul>
          <hr />
          <Match pattern="/atlantic" component={Atlantic} />
          <Match pattern="/pacific" component={Pacific} />
        </div>
      </Router>
    );
  }
}

class Router extends React.Component {
  static childContextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object
  };
  //上面的操作等价于
  //Router.childContextTypes

  constructor(props) {
    super(props);

    this.history = createHistory();
    // 强制更新界面
    this.history.listen(() => this.forceUpdate());
  }

  getChildContext() {
    return {
      history: this.history,
      location: window.location
    };
  }

  render() {
    return this.props.children;
  }
}


class Redirect extends React.Component {
    static contextTypes = {
        history:React.PropTypes.object,
    }

    componentDidMount() {
        const history = this.context.history;
        const to = this.props.to;
        history.push(to);
    }

    render(){
        return null;
    }
}
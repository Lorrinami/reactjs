import React from 'react';

import createHistory from '../../node_modules/history/createBrowserHistory.js';

const history = createHistory();

const Atlantic = () =>(
    <div>
        <h3>Atlantic Ocean</h3>
        <p>
            The Atlantic Ocean covers approximately 1/5th of
            the surface of the earth.
        </p>
    </div>
);

const Pacific = () =>(
    <div>
        <h3>Pacific Ocean</h3>
        <p>
            Ferdinand Magellan, a Portuguese expolorer, named 
            the ocean 'mar pacifico' in 1521, which means peaceful sea.
        </p>
    </div>
);
 
const Match = ({pattern, component: Component }) => {
    const pathname = window.location.pathname;
    if(pathname.match(pattern)){
        return(
            <Component />
        );
    }else{
        return null;
    }
}
const Link = ({to, children}) => (
    <a
      onClick={(e) => {
          e.preventDefault();
          history.push(to);
      }}
      href={to}
    >
      {children}
    </a>
);
export default class SecondPage extends React.Component{
    // 当history改变时强制刷新界面
    componentDidMount(){
        history.listen(() => this.forceUpdate());
    }

    render(){
        return(
            <div
              className='ui text container'
            >
                <h2 className='ui dividing header'>
                    Which body of water?
                </h2>

                <ul>
                    <li>
                        <Link to='/atlantic'>
                            <code>/atlantic</code>
                        </Link>
                    </li>
                    <li>
                        <Link to='/pacific'>
                            <code>/pacific</code>
                        </Link>
                    </li>
                </ul>
                <hr />
                <Match pattern='/atlantic' component={Atlantic}/>
                <Match pattern='/pacific' component={Pacific}/>
            </div>
        )
    }
}
import React from 'react';


const App = () => {
    <Router>
        <div
          className='ui text container'
        >
        <Match pattern='/atlantic' component={Atlantic}/>
        <Match pattern='/pacific' component={Pacific}/>
        </div>
    </Router>
}

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

export default class ThridPage extends React.Component{
    
}
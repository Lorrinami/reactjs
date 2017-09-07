import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from '../../../node_modules/react-router-dom';
import Redirect from '../../../node_modules/react-router/Redirect.js';

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
            <li>
              <Link to='/black-sea'>
                <code>/black-sea</code>
              </Link>
            </li>
          </ul>
          <hr />
          <Route  path="/atlantic" component={Atlantic} />
          <Route path="/atlantic/ocean" render={() => (
            <div>
                <h3>Atlantic Ocean - Again</h3>
                <p>
                    The Atlantic Ocean covers approximately 29% of 
                    the world's water surface area.
                </p>
            </div>
          )}/>
          <Route path="/pacific" component={Pacific} />
          <Route path="/black-sea" component={BlackSea}/>
          <Route exact path="/" render={() => (
            <h3>Welcome! Select a body of saline water above.</h3>
          )}/>
        </div>
      </Router>
    );
  }
}

class BlackSea extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        counter: 3,
      }
    }
    componentDidMount(){
      setInterval(() => (
        this.setState({counter:this.state.counter-1})
      ),1000)
    }
    render(){
      return(
        <div>
            <h3>BlackSea</h3>
            <p>Nothing to sea [sic] here ...</p>
            <p>Redirect in {this.state.counter}...</p>
            {
              (this.state.counter<1)?(
                <Redirect to='/'/>
              ):null
            }
        </div>
      )
    }
  }

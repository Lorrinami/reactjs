import React from "react";

import TopBar from "./TopBar";
import AlbumsContainer from "./AlbumsContainer";
import { BrowserRouter as Router, Route, Link } from '../../../node_modules/react-router-dom';
 const App = () => (
  <div className="ui grid">
    <TopBar />
    <div className="spacer row" />
    <div className="row">
      <Route path='/albums' component={AlbumsContainer}/>
    </div>
  </div>
);

export default App;
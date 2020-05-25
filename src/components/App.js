import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Node from './Node'

const App = (props) => {
  return(
    <div className="app">

      <Router>

        <Node path="/" childNodes={[{name:"child1"},{name:"child2"},{name:"child3"},{name:"child4"}]} name="main"></Node>

      </Router>

    </div>
  )
}
export default App;

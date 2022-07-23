
import {BrowserRouter as Router, Link} from 'react-router-dom'
import React from 'react';


const App = () => {
  return (
    <div>
      <Router>
        <Link to="/vue">vue应用</Link>&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/react">react应用</Link>
      </Router>
      <div id="container"></div>
    </div>
  );
};

export default App;
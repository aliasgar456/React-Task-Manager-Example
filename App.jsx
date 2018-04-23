require('jquery')
require('bootstrap')
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Body from './Body/Body.jsx';
import Chart from './Body/Chart.jsx';

class App extends Component {
	constructor() {
		super();
	};
   	render() {
      	return (
          <Router>
          	<div>
                <Header />
                <Switch>
                  <Route exact path='/' component={Body} />
                  <Route exact path='/Chart' component={Chart} />
               </Switch>
           	</div>
          </Router>
      )	;
   	};
}
export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends React.Component {
	constructor(){
		super()
		this.clearLocalStorage = this.clearLocalStorage.bind(this);
	};
	clearLocalStorage(){
      localStorage.removeItem("tasks");
      window.location.reload(true);
    };
    render() {
      return (
         <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light row justify-content-between">
               <div>
               	<i className="fas fa-tasks ml-2"></i>
                <Link to={'/'} className="navbar-brand ml-2">Task</Link>
                <Link to={'/Chart'} className="navbar-brand ml-2">Chart</Link>
               </div>
   			   
              <button className = "btn btn-danger mr-2" type="button" onClick= {this.clearLocalStorage}>Clear Local Storage</button>
			      </nav>
         </div>
      );
    };
}
export default Header;
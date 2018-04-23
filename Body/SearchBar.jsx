



 import React from 'react';

class SearchBar extends React.Component {
   constructor(props){
   	super(props);
   
   };
   render() {
      return (
         <div>
			   <input className="form-control mt-2" onChange={this.props.handleSearch} type="search" placeholder="Search" aria-label="Search" />
         </div>
      );
   }
}
export default SearchBar;
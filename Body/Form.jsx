import React from 'react';

class Form extends React.Component {
   render() {
      return (
         <div>
         	<div>
	            <form className = "col-md-12 offset-md-1" onSubmit = {this.props.addTask}>
				  <div className="form-row">
				    <div className="form-group col-md-8">
				      <input type="text" onChange = {this.props.handleOnChange} className="form-control" value={this.props.form.name} placeholder="Task Name" />
				    </div>
				    <div className="form-group col-md-4">
				      <button type="submit" className="btn btn-primary">+Add Task</button>
				    </div>
				  </div>
				</form>
			</div>
         </div>
      );
   }
}
export default Form;
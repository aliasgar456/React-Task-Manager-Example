import React from 'react';

class List extends React.Component {
   render() {
      return (
         <div>
			<div>	
				<ul className="list-group">
					{this.props.getTaskList().map((listData, listIndex) => 
						<li key={listIndex} className="list-group-item" >
							<span className = "col-md-6"> {listData.name} </span>
							<div className="float-right">
								<select value={listData.status.code} onChange={(e) => {this.props.onStatusUpdate(listData.id, e.target.value)}} className="custom-select col-md-7">
									{this.props.status.map((statusData, statusIndex) =>
										<option key ={statusIndex} value = {statusData.code}> {statusData.title}	</option>
									)}
								</select>
								<div className="btn-group" role="group" aria-label="Basic example">
									<button data-toggle="popover" data-placement="right" title="Log" data-html="true" data-content={this.props.getLogView(listData)} className="btn btn-primary"><i className="fas fa-info"></i></button>
									<button className="btn btn-danger" onClick = {(e) => this.props.onDelete(listData.id)}><i className="fas fa-trash-alt"></i></button>
								</div>
							</div>
						</li>
					)}
				</ul>
				<div className = {this.props.getTaskList().length ? "d-none" : ""}>
					<div className="alert alert-dark" role="alert">
						No Data
					</div>
				</div>
			</div>
         </div>
      );
   }
}
export default List;
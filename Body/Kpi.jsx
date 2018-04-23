import React from 'react';

class Kpi extends React.Component {
   constructor(props){
   	super(props);
   	if(this.props.isAll){
   		this.clonnedStatus = JSON.parse(JSON.stringify(this.props.status))
   		this.clonnedStatus.unshift({
   			title : "All",
   			code : -1
   		})	
   	}
   	this.props.onKpiChange(this.clonnedStatus[0]); 
   };
   render() {
      return (
         <div>
           <div>
				<div className="btn-toolbar col-md-12 offset-md-1" role="toolbar" aria-label="Toolbar with button groups">
				    {this.clonnedStatus.map((buttonData, buttonIndex) =>
				    	<div key={buttonIndex} className="btn-group mr-2" role="group">
					    	<button key={buttonIndex} type="button" onClick={(e) => this.props.onKpiChange(buttonData)} className={this.props.activeKpi.code == buttonData.code ?"btn btn-primary" : "btn btn-secondary"}>
					    		{buttonData.title} {buttonData.code == -1 ? " ( " + this.props.list.length + " ) " : " ( " + this.props.list.filter(function(v){return v.status.code == buttonData.code}).length + " ) "} 
					    	</button>
					    </div>
				    )}
				</div>
			</div>
         </div>
      );
   }
}
export default Kpi;
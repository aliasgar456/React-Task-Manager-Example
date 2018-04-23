import React from 'react';
import PieChart from "react-svg-piechart"
import $ from 'jquery';

class Chart extends React.Component {
	constructor(){
		super();
		var localTaskData = JSON.parse(localStorage.getItem("tasks")),
			uniqueArr = [],
	    	that = this;
	    that.dataArr = [];
	    if(localTaskData && localTaskData.length){
	    	$.each(localTaskData, function(ind, elm){
		    	if(uniqueArr.length){
	    			var status = uniqueArr.filter(function(v){return v.title == elm.status.title})	
	    			if(!status.length){
	    				uniqueArr.push(elm.status);
	    			}
		    	}else{
		    		uniqueArr.push(elm.status);
		    	}
		    })
	    }	
	    $.each(uniqueArr, function(uInd, uElm){
	    	var count = localTaskData.filter(function(v){return v.status.title == uElm.title});
	    	that.dataArr.push({
	    		"title" : count[0].status.title,
	    		"value" : count.length,
	    		"color" : that.dynamicColor()
	    	})
	    })
	    this.dynamicColor = this.dynamicColor.bind(this);
	};
	dynamicColor(){
		var r = Math.floor(Math.random() * 255),
			g = Math.floor(Math.random() * 255),
			b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
	};
    render() {
      	return (
         	<div >
         		<div className = "col-md-12 offset-md-5 mt-5">
			  		<PieChart data={this.dataArr} viewBoxSize= "80"/>
			  	</div>
         	</div>
      	);
    };
}
export default Chart;
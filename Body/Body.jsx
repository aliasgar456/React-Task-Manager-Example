import React from 'react';
import Form from './Form.jsx';
import Kpi from './Kpi.jsx';
import List from './List.jsx';
import SearchBar from './SearchBar.jsx';
import $ from 'jquery';


class Body extends React.Component {
   constructor(){
   	super();
   	this.state = {
   		task: {
   			counter: 0,
   			form: {
   				id : 0,
   				name : "",
   				status : {
   					title : "Open",
   					code : 0
   				},
               createdOn : [{
                  changedStatus : "Open",
                  logDate : new Date().toLocaleString()
               }
               ]  			
   			},
   			list: [],
   			status: [{
		   			title : "Open",
		   			code : 0
					},
		   		{
		   			title : "In Progress",
		   			code : 1
		   		},
		   		{
		   			title : "Completed",
		   			code : 2
		   		}
			   ],
			   activeKpi : {},
            queryText : "",
   		}
   	};
   	this.addTask = this.addTask.bind(this);
   	this.handleOnChange = this.handleOnChange.bind(this);
   	this.onStatusUpdate = this.onStatusUpdate.bind(this);
   	this.onDelete = this.onDelete.bind(this);
   	this.getTaskList = this.getTaskList.bind(this);
   	this.onKpiChange = this.onKpiChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.getLogView = this.getLogView.bind(this);
      var localTaskData = JSON.parse(localStorage.getItem("tasks"));
      if(localTaskData && localTaskData.length){
         this.state.task.list = localTaskData;
      }
      var counterData = JSON.parse(localStorage.getItem("counter"));
      if(counterData){
         this.state.task.counter = counterData;
      }
   };
   componentDidMount(){
      $('[data-toggle="popover"]').popover({
         trigger : 'focus'
      });
   };
   componentDidUpdate(prevProps, prevState) {
     $('[data-toggle="popover"]').popover({
         trigger : 'focus'
      });
   };
   getLogView(e){
      var html = "";
      if(e.createdOn.length){
         $.each(e.createdOn,function(ind,elm){
            html += elm.changedStatus + " : " + elm.logDate + "<Br />";
         })
      }
      return html;
   }
   handleSearch(e){
      this.state.task.queryText = e.target.value,
      this.setState(this.state)
     
   };
   addTask(e){
   	e.preventDefault();
   	this.state.task.form.id = this.state.task.counter
   	this.state.task.counter ++;
   	this.state.task.list.push(JSON.parse(JSON.stringify(this.state.task.form)));
   	this.state.task.form.name = "";
   	this.setState(this.state);
      localStorage.setItem("tasks", JSON.stringify(this.state.task.list));
      localStorage.setItem("counter", JSON.stringify(this.state.task.counter));
   };
   onDelete(id){
   	var oList = this.state.task.list;
   	for(var i = 0; i < oList.length; i++) {
   	    if(oList[i].id == id) {
   	        oList.splice(i, 1);
   	        break;
   	    }
   	}
   	this.setState(this.state);
      localStorage.setItem("tasks", JSON.stringify(this.state.task.list));
   };
   onStatusUpdate (id, statusId){
   	var status = this.state.task.status.filter((v) => {return v.code == statusId})[0],
   		oList = this.state.task.list;
   	for(var i = 0; i < oList.length; i++) {
   	    if(oList[i].id == id) {
   	    	oList[i].status = status;
            oList[i].createdOn.push({
               "changedStatus" : status.title,
               "logDate" : new Date().toLocaleString()      
            })
   	     break;
   	    }
   	}
   	this.setState(this.state);
      localStorage.setItem("tasks", JSON.stringify(this.state.task.list));
   };
   handleOnChange(e, field){
   	this.state.task.form.name = e.target.value;
   	this.setState(this.state);
   };
   getTaskList(){
      return this.state.task.list.filter((v) =>{
         return (this.state.task.activeKpi.code >= 0 ? (v.status.code == this.state.task.activeKpi.code) : true)
         && (this.state.task.queryText ? v.name.includes(this.state.task.queryText) : true)
      });   
      
   };
   onKpiChange(buttonData){
   	this.state.task.activeKpi = buttonData;
   	this.setState(this.state);
   };
   render() {
      return (
         <div className = "container col-md-8 offset-md-2 mt-5">
		    <Form
		    	addTask ={this.addTask}
		    	form ={this.state.task.form} 
		    	handleOnChange = {this.handleOnChange} />
			<Kpi isAll = "true" status ={this.state.task.status}
            list = {this.state.task.list}
				onKpiChange = {this.onKpiChange}
				activeKpi = {this.state.task.activeKpi}/>
         <SearchBar 
            handleSearch = {this.handleSearch}/>
			<List 
				getTaskList ={this.getTaskList}
				status = {this.state.task.status} 
            form = {this.state.task.list}
				onStatusUpdate = {this.onStatusUpdate}
            getLogView = {this.getLogView}            
				onDelete = {this.onDelete}/>
         </div>

      );
   };
}
export default Body;
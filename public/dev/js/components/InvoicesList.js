	"use strict";
	import React, {Component} from "react";
	import {connect} from "react-redux";
	import moment from 'moment'
	import Select from 'react-select'
	import {Link} from 'react-router'
	import * as actions from "../actions/actions"
	import { bindActionCreators } from 'redux';
	import Pagination from 'react-js-pagination';
	import {sortInvoices} from '../utils'

import ReactPaginate from "react-paginate";

	class InvoicesList extends Component {
		constructor(props){
			super(props)
			this.getNewPageNew=this.getNewPageNew.bind(this)
		}
		
		componentWillMount(){
			this.props.actions.loadInvoices()
			this.props.actions.loadCustomer()
		}
		 
		
		getNewPageNew() {
    		this.props.changePageNew(page);
    		this.props.updateNewOrders(
      			page,
      			this.state.newOrderName,
      			this.state.newOrderValue,
    		);
  		};
		render() {
			
			
			return <div className="container">
			<div><Link to="/add"><button className="btn btn-primary">Add New Invoice</button></Link></div>

							<div className="row">
							<div className="col-lg-12">
							{this.props.Invoices.invoices.length>0?

								<div className="table-scrollable">
                               	 	<table className="table table-hover table-striped table-condensed">
                               	 		<thead>
                               	 		<tr>
                               	 			<th>
                               	 			Customer
                               	 				
                               	 			</th>
                               	 			<th>
                               	 			Discount
                               	 				
                               	 			</th>
                               	 			<th>
                               	 			Total
                               	 				
                               	 			</th>
                               	 			<th>
                               	 			Created At
                               	 				
                               	 			</th>
                               	 			<th>
                               	 			Updated At
                               	 				
                               	 			</th>
                               	 			
                               	 			</tr>
                               	 		</thead>
										
										<tbody>
										{this.props.Invoices.invoices.sort(sortInvoices).map((item,key)=>{
											return <tr key={key}>
														<td>{item.customer_id}</td>
														<td>{item.discount}</td>
														<td>{item.total}</td>
														<td>{moment(item.createdAt).format("MMMM Do YYYY, HH:mm:ss")}</td>
														<td>{moment(item.updatedAt).format("MMMM Do YYYY, HH:mm:ss")}</td>
												   </tr>
                               	 				
											})
										}
										</tbody>
								
									</table>
									                                </div>
                                :<h2>Empty</h2>}
								</div>
							
						</div>
							
					</div>
						

		}
	}

	
function mapStateToProps(state) {
  return {
    Invoices: state.Invoices,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesList);
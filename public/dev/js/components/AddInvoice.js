	"use strict";
	import React, {Component} from "react";
	import {connect} from "react-redux";
	import moment from 'moment'
	import Select from 'react-select'
	import {Link, hashHistory} from 'react-router'
	import InputMask from 'react-input-mask';
	import orderBy from 'lodash.orderby'
	import * as actions from "../actions/actions"
	import { bindActionCreators } from 'redux';

	class Posts extends Component {
		constructor(props){
			super(props)
			this.changeValueCustomer=this.changeValueCustomer.bind(this)
			this.changeProductsQuantity=this.changeProductsQuantity.bind(this)
			this.changeValueProducts=this.changeValueProducts.bind(this)
			this.changeValueDiscount=this.changeValueDiscount.bind(this)
			this.addNewInvoice=this.addNewInvoice.bind(this)
			this.interval=this.interval.bind(this)
			this.findTotal=this.findTotal.bind(this)

			this.state={
				customer:null,
				errors:[],
				customers:[],
				products:[],
				product:[],
				total:0,
				discount:0,
				postNewInvoice:false,
				readyToPost:true,
				int:10,
			}
		}
		componentWillMount(){
			this.props.actions.loadCustomer()
			this.props.actions.loadProducts()
			
		}
		interval(){
    		this.setState({int:--this.state.int})
  		}
  		shouldComponentUpdate(){
  			
  			return true
  		}
  		componentDidUpdate(){
  			if(this.state.customer&&this.state.product.length!==0&&this.state.total!==0&&this.state.readyToPost){
					this.Interval=setInterval(this.interval,1000)
					this.setState({readyToPost:false})
					
				
			}
			if(this.state.int===0){
      		clearInterval(this.Interval);
      		this.addNewInvoice()
      		hashHistory.push("/")
      		
    		}
  		}
		componentWillReceiveProps(next){
			if(this.props.Invoices.customers!==next.Invoices.customers){
				let customers=next.Invoices.customers.map(item=>{
					return {label:item.name,value:item.id}
				})
				this.setState({customers:customers})
			}
			if(this.props.Invoices.products!==next.Invoices.products){

				let products=next.Invoices.products.map(item=>{

					return {label:item.name,value:item.id,price:item.price,quantity:0,}
				})
				this.setState({products:products})
			}

			
			
		}
		 changeValueCustomer(e){
		 	let newErrors=this.state.errors
		 		if(newErrors.indexOf("customer")!==-1){
					  newErrors.splice(newErrors.indexOf("customer"),1)
				}
				if(this.Interval){
				clearInterval(this.Interval);	
				this.setState({customer:e,errors:newErrors,int:10,readyToPost:true})
				}else{
					this.setState({customer:e,errors:newErrors})
				}
		}
		findTotal(){
			let total,price,priceWithoutDiscount,discount
			
			total=this.state.product.reduce((sum,item)=>{
				 price=item.price*item.quantity
				
				return sum+price
			},0)
			
			
			if(this.state.discount>0){
				 priceWithoutDiscount=this.state.product.reduce((sum,item)=>{
				 	price=item.price*item.quantity
				
					return sum+price
					},0)
				 	discount=this.state.discount/100
				 	total=priceWithoutDiscount-priceWithoutDiscount*discount
				 
				}
				this.setState({total:total})
		}

		changeValueProducts(e){
			let selectProducts=e.map(item=>{
				if(item.quantity==0){item.quantity=1}
				
				return item
			})

			if(this.Interval){
				clearInterval(this.Interval);	
				this.setState({product:selectProducts,int:10,readyToPost:true},()=>{
				this.findTotal()
				})
			}else{
				this.setState({product:selectProducts},()=>{
					this.findTotal()
				})
			}
		}
		changeProductsQuantity(id,e){
			let int
			let products=this.state.product.map(item=>{
				if(item.value===id){
					item.quantity=+e.target.value
				}
				return item
			})
			if(this.Interval){
				clearInterval(this.Interval);
				this.setState({product:products,int:10,readyToPost:true},()=>{
					this.findTotal()
				})
			}else{
				this.setState({product:products},()=>{
					this.findTotal()
				})
			}
			
		}

		changeValueDiscount(e){
			if(+e.target.value<101){
				if(this.Interval){
				clearInterval(this.Interval);
				this.setState({discount:+e.target.value,int:10,readyToPost:true},()=>{
				this.findTotal()
				})
			}else{
				this.setState({discount:+e.target.value},()=>{
				this.findTotal()
				})
			}
		}
		}

		addNewInvoice(){
			this.props.actions.addInvoice({
				customer_id:this.state.customer.value,
				discount:this.state.discount,
				total:this.state.total})
			this.setState({readyToPost:false})
		}
		


		render() {
			
			
			return <div className="container">
								<div className="row">
								<div className="col-lg-10 col-lg-offset-1">
								<div className="form-group">
								<Link to="/">
								<button className="btn btn-default">Назад к списку клиентов</button>
								</Link>
								</div>
								</div>
								</div>
							<div className="row">
								<div className="col-lg-10 col-lg-offset-1">

									<div className="form-group">

										<Select  
										  	onChange={this.changeValueCustomer}
										  	placeholder="Select Customers"
										  	options={this.state.customers}
										  	value={this.state.customer}/>
									</div>
								</div>
								<div className="col-lg-10 col-lg-offset-1">
									<div className="form-group">

										<Select  
										  	onChange={this.changeValueProducts}
										  	placeholder="Select Products"
										  	options={this.state.products}
										  	multi={true}
										  	value={this.state.product}/>
									</div>
								</div >
								<div className="col-lg-10 col-lg-offset-1">{this.state.product.length>0?

								<div className="table-scrollable">
                               	 	<table className="table table-hover table-striped table-condensed">
                               	 		<thead>
                               	 		<tr>
                               	 			<th>
                               	 			Name
                               	 			</th>
                               	 			<th>
                               	 			Price
                               	 			</th>
                               	 			<th className="text-center">
                               	 			Quantity
                               	 			</th>
                               	 			</tr>
                               	 		</thead>

										
										<tbody>
										{this.state.product.map((item,key)=>{
											return <tr key={key}>
														<td>{item.label}</td>
														
														<td>{item.price}</td>
														<td><input 
														className="form-control text-center"
														type="number"
														value={item.quantity}
														onChange={this.changeProductsQuantity.bind(this,item.value)}/></td>
														
												   </tr>
                               	 				
											})
										}
										</tbody>
								
									</table>
									                                </div>
                                :null}</div>
                                
                                <div className="col-lg-10 col-lg-offset-1">
                                <div className="form-group">
                                		<label className="form-label">Discount, %</label>
										  <input  
										  className="form-control"
										  type="number"
										  onChange={this.changeValueDiscount}
										  placeholder="Discount, %"
										  min="0"
										  max={100}
										  value={this.state.discount}/>
									</div>
									</div>
									<div className="col-lg-10 col-lg-offset-1">
                                		<div className="form-group">
                                		<h3>Total:<span>{this.state.total.toFixed(2)}</span></h3>
                                		</div>
                                	</div>
									<div className="col-lg-10 col-lg-offset-1 text-center">
									{this.Interval?<h3>Invoice will be saved in {this.state.int} seconds</h3>:null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
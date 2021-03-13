import React, { useEffect, useState, useRef } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Messages } from 'primereact/messages';

var targetURI = 'https://handsonexam.herokuapp.com';
var menuitemsURI = targetURI+'/menuitems';
var validatecouponURI = targetURI+'/validatecoupon';

var map = new Map();

function OrderForm(props){

	const messages = useRef(null);

	let [menuitems, setMenuitems] = useState([]);
	let [coupon, setCoupon] = useState('');

	const handlePost = e => {
		e.preventDefault();

		var arr = [];
		map.forEach((value, key) => {
			if(value > 0){
				arr.push({menuItem:{id:key}, quantity: value});
			}
		 });
		 
		if(!arr.length){
			return;
		}

		var data = {
			"items": arr,
		};

		if(coupon){
			axios.get(validatecouponURI+'?coupon='+coupon)
			.then(validationResult => {
				if(validationResult.data ){
					data["coupon"] = {code:coupon};
					
					axios.post(postorderURI, data)
					.then(orderResult => {
						props.history.push({
							pathname: '/summary',
							state:
							{
								data:orderResult.data
							}
						})
					})
				}else{
					messages.current.show([
						{ severity: 'warn', summary: 'Warning', detail: 'Invalid Coupon Code', sticky: false }
					]);
				}
			})
		}else{
			axios.post(postorderURI, data)
			.then(orderResult => {
				props.history.push({
					pathname: '/summary',
					state:
					{
						data:orderResult.data
					}
				})
			})
		}
	}

	useEffect(() => {
		axios.get(menuitemsURI)
    	.then(res => {
			res.data.sort((a,b)=>a.menuCategory.id-b.menuCategory.id);
			setMenuitems(res.data)
    	})
	  }, []);

	const headerTemplate = (menuitems) => {
		return (
			<React.Fragment>
				<span>{menuitems.menuCategory.name}</span>
			</React.Fragment>
		);
	}
	
	const footerTemplate = () => {
		return (
			<React.Fragment>
			</React.Fragment>
		);
	}
	
	var handleCouponChange = event => {
		setCoupon(event.target.value);
	}

	return (
		<>
		<form id="addIndividual" onSubmit={handlePost}>
		<h1>Food Menu</h1>
		<DataTable  value={menuitems}
			rowGroupMode="subheader" groupField="menuCategory.name"
			sortMode="single" sortField="menuCategory.name" sortOrder={1}
			rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
			<Column field="name" header="Name"/>
			<Column field="price" header="Price"/>
			<Column header="Quantity"
				body={(rowData)=><InputNumber id={rowData.id} value={map.get(rowData.id)} onChange={handleQuantityChange}/>}/>
		</DataTable>
		<br/>
		
		<div className="p-field p-grid">
			<label htmlFor="firstname3" className="p-col-fixed" style={{width:'100px'}}>Coupon</label>
			<div className="p-col">
				<InputText id="firstname3" type="text" value={coupon} onChange={handleCouponChange}/>
				<Messages ref={messages} />
			</div>
		</div>
		<br/>
		<br/>
		<Button label="Order" />
		</form>
		</>
	);
}

var handleQuantityChange = event => {
	map.set(event.target.id, event.target.value)
}

var postorderURI = targetURI+'/postorder';

export default withRouter(OrderForm);
import React, { useEffect } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';

var data = [
	{name: "User 1", category: "1"},
	{name: "User 2", category: "1"},
	{name: "User 3", category: "1"},
	{name: "User 4", category: "2"},
	{name: "User 5", category: "2"},
	{name: "User 6", category: "2"},
];

const headerTemplate = (data) => {
	return (
		<React.Fragment>
			<span>{data.category}</span>
		</React.Fragment>
	);
}

const footerTemplate = (data) => {
	return (
		<React.Fragment>
		</React.Fragment>
	);
}

var targetURI = 'https://handsonexam.herokuapp.com';
var menuitemsURI = targetURI+'/menuitems';

function OrderForm(){

	useEffect(() => {
		axios.get(menuitemsURI)
    	.then(res => {
        	console.log(res.data);
    	})
	  });

	return (
		<DataTable sortMode="multiple" value={data} rowGroupMode="subheader" groupField="category"
		rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
			<Column field="name" header="Name"/>
			<Column header="Quantity"

				body={()=><><InputNumber  /></>}/>
		</DataTable>
	);
}

export default OrderForm;
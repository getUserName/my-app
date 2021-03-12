import React, { useEffect, useState } from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';

var targetURI = 'https://handsonexam.herokuapp.com';
var menuitemsURI = targetURI+'/menuitems';

function OrderForm(){

	let [menuitems, setMenuitems] = useState([])

	useEffect(() => {
		axios.get(menuitemsURI)
    	.then(res => {
			res.data.sort((a,b)=>a.menuCategory.id-b.menuCategory.id);
        	console.log(res.data);
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

	return (
		<DataTable  value={menuitems}
			rowGroupMode="subheader" groupField="menuCategory.name"
			sortMode="single" sortField=".menuCategory.name" sortOrder={1}
			rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
			<Column field="name" header="Name"/>
			<Column header="Quantity"

				body={()=><><InputNumber  /></>}/>
		</DataTable>
	);
}

export default OrderForm;
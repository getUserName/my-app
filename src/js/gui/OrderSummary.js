import React from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { withRouter } from 'react-router-dom';

function OrderSummary(props){

    var data = props.location.state.data;
    var total = data.total;
    var totalPlusTax = data.totalPlusTax;
    var totalPlusTaxLessCoupon = data.totalPlusTaxLessCoupon;
    var orderitems = data.items;
    var coupon = data.coupon;
    var couponCode = '';
    if(coupon){
        couponCode = coupon.code;
    }

    const headerTemplate = (orderitems) => {
		return (
			<React.Fragment>
				<span>{orderitems.menuItem.menuCategory.name}</span>
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
		<>
        <h1>Summary</h1>
        <div>Items
        <DataTable  value={orderitems}
			rowGroupMode="subheader" groupField="menuItem.menuCategory.name"
			sortMode="single" sortField="menuItem.menuCategory.name" sortOrder={1}
			rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
			<Column field="menuItem.name" header="Name"/>
            <Column field="menuItem.price" header="Price"/>
            <Column field="menuItem.tax" header="Tax"/>
			<Column field="quantity" header="Quantity"/>
		</DataTable>
        </div>
        <div>Coupon: {couponCode}</div>
        <div>Total: {total}</div>
        <div>Total Plus Tax: {totalPlusTax}</div>
        <div>Total Plus Tax After Coupon Discount: {totalPlusTaxLessCoupon}</div>
		</>
	);
}

export default withRouter(OrderSummary);
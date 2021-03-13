import React from 'react';
import '../../css/App.css';
import OrderForm from './OrderForm.js';
import OrderSummary from './OrderSummary.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route path="/summary">
					<OrderSummary />
				</Route>
        <Route path="/">
        <OrderForm/>
				</Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;

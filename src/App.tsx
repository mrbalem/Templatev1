/** @format */

import React from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import Routes from './Route';
import { RoutesList } from './Config';
const browserHistory = createBrowserHistory();

function App() {
	return (
		<div className='App'>
			<Router history={browserHistory}>
				<Routes routes={RoutesList} />
			</Router>
		</div>
	);
}

export default App;

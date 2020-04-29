/** @format */

import React, { useContext } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
//import { StoreContext } from './context/StoreContext';

export interface RoutesProps {
	routes: any;
}

const Routes: React.SFC<RoutesProps> = props => {
	const { state } = useContext(StoreContext);
	const { routes } = props;
	return (
		<BrowserRouter>
			<Switch>
				{routes.map((ele: any, index: number) => {
					if (ele.isPrivate) {
						return (
							<Route
								exact
								key={index}
								path={state.isLogin ? ele.href : 'not-found'}
								render={() => state.isLogin && ele.component}
								// path={state.login ? ele.href : 'not-found'}
								// render={() => state.login && ele.component}
							/>
						);
					} else {
						return (
							<Route
								exact
								key={index}
								path={ele.href}
								render={() => ele.component}
							/>
						);
					}
				})}

				<Redirect to='/not-found' />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;

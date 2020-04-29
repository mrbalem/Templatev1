/** @format */

import * as React from 'react';
import { Navbar } from './Layout';
import Home from './Views/Home';
import { ListItem } from '@material-ui/core';
import CustomButtons from './components/CustomButton';
import CustomDropdown from './components/CustomDropdown';

type router = {
	href: string;
	component: React.ReactChild;
	isPrivate: boolean;
};

const Logo = () => (
	<div style={{ marginLeft: '5%', flexDirection: 'column' }}>
		<div>
			<span style={{ fontSize: 25, fontWeight: 'bold' }}>Grid</span>
		</div>
		<div style={{ marginTop: -14, marginLeft: 14 }}>
			<span style={{ fontSize: 30, color: 'green', fontWeight: 'bold' }}>
				mall
			</span>
		</div>
	</div>
);

// const LeftIten = [
// 	<ListItem>
// 		<CustomButtons size='sm' color='transparent'>
// 			button
// 		</CustomButtons>
// 	</ListItem>,

// 	<ListItem>
// 		<CustomButtons size='sm' color='danger'>
// 			button
// 		</CustomButtons>
// 	</ListItem>
// ];

const RoutesList: [router] = [
	{
		href: '/',
		component: (
			<div>
				<Navbar
					color='white'
					brand={<Logo />}
					rightLinks={
						<ListItem>
							<CustomButtons size='sm' color='success'>
								Iniciar sesión
							</CustomButtons>
							<CustomButtons size='sm' color='success'>
								Iniciar sesión
							</CustomButtons>
						</ListItem>
					}
				/>
				<Home></Home>
			</div>
		),
		isPrivate: false
	}
];

export { RoutesList };

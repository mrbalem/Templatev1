/** @format */

import * as React from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';

// core component material ui
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	AppBar,
	Toolbar,
	Hidden,
	IconButton,
	Drawer
} from '@material-ui/core';

// @material-ui/icons
import Menu from '@material-ui/icons/Menu';

// core components
import styles from './HeaderStyle';

// [*] change color for Navbar
type color =
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'
	| 'transparent'
	| 'white'
	| 'rose'
	| 'dark';

type changeColorOnScroll = {
	height: number;
	color: color;
};

export interface NavBarProps {
	color: color;
	brand: React.ReactChild | string;
	rightLinks: React.ReactChild;
	leftLinks?: React.ReactChild;
	fixed?: boolean;
	absolute?: boolean;
	changeColorOnScroll?: changeColorOnScroll;
}

// const classNames = require('classnames');

const useStyles = makeStyles(styles);

const NavBar: React.SFC<NavBarProps> = props => {
	const classes = useStyles();

	const {
		color = 'white',
		rightLinks,
		leftLinks,
		fixed,
		absolute,
		brand,
		changeColorOnScroll
	} = props;

	const [MenuLineal, setMenuLineal] = React.useState(false);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const headerColorChange = () => {
		const { color, changeColorOnScroll } = props;
		const windowsScrollTop = window.pageYOffset;
		if (windowsScrollTop > changeColorOnScroll!.height) {
			document.body
				.getElementsByTagName('header')[0]
				.classList.remove(classes[color]);
			document.body
				.getElementsByTagName('header')[0]
				.classList.add(classes[changeColorOnScroll!.color]);
			setMenuLineal(true);
			let navcenter = document.getElementById('navcenter');
			if (navcenter) {
				navcenter.style.display = 'none';
			}
			let toolbar = document.getElementById('toolbar');
			if (toolbar) {
				toolbar.style.minHeight = '60px';
			}
		} else {
			document.body
				.getElementsByTagName('header')[0]
				.classList.add(classes[color]);
			document.body
				.getElementsByTagName('header')[0]
				.classList.remove(classes[changeColorOnScroll!.color]);
			let navcenter = document.getElementById('navcenter');
			if (navcenter) {
				navcenter.style.display = 'block';
			}
			let toolbar = document.getElementById('toolbar');
			if (toolbar) {
				toolbar.style.minHeight = '126px';
			}
			setMenuLineal(false);
		}
	};

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const appBarClasses = classNames({
		[classes.appBar]: true,
		[classes[color]]: color,
		[classes.absolute]: absolute,
		[classes.fixed]: fixed
	});

	const brandComponent =
		typeof brand === 'string' ? (
			<Button className={classes.title}>{brand}</Button>
		) : (
			brand
		);

	React.useEffect(() => {
		if (props.changeColorOnScroll) {
			window.addEventListener('scroll', headerColorChange);
		}
		return function cleanup() {
			if (props.changeColorOnScroll) {
				window.removeEventListener('scroll', headerColorChange);
			}
		};
	});

	return (
		<AppBar className={appBarClasses}>
			<Toolbar className={classes.container}>
				{leftLinks !== undefined ? brandComponent : null}
				<div className={classes.flex}>
					{leftLinks !== undefined ? (
						<Hidden smDown implementation='css'>
							{leftLinks}
						</Hidden>
					) : (
						brandComponent
					)}
				</div>
				<Hidden smDown implementation='css'>
					{rightLinks}
				</Hidden>
				<Hidden mdUp>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerToggle}>
						<Menu />
					</IconButton>
				</Hidden>
			</Toolbar>
			<Hidden mdUp implementation='js'>
				<Drawer
					variant='temporary'
					anchor={'right'}
					open={mobileOpen}
					classes={{
						paper: classes.drawerPaper
					}}
					onClose={handleDrawerToggle}>
					<div className={classes.appResponsive}>
						{leftLinks}
						{rightLinks}
					</div>
				</Drawer>
			</Hidden>
		</AppBar>
	);
};

export default NavBar;

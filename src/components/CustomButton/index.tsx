/** @format */

import * as React from 'react';

// nodejs library that concatenates classes
import classNames from 'classnames';

// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';

import buttonStyle from '../../assets/jss/ButtonStyle';

type color =
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'
	| 'rose'
	| 'white'
	| 'facebook'
	| 'twitter'
	| 'google'
	| 'github'
	| 'transparent';

type size = 'sm' | 'lg';

export interface CustomButtonsProps {
	color: color;
	round?: boolean;
	children: React.ReactChild;
	fullWidth?: boolean;
	disabled?: boolean;
	simple?: boolean;
	size: size;
	block?: boolean;
	link?: boolean;
	justIcon?: boolean;
	onclick?: () => void;
	className?: any;
}

const makeComponentStyles = makeStyles(() => ({
	...buttonStyle
}));

const CustomButtons: React.SFC<CustomButtonsProps> = props => {
	const classes: any = makeComponentStyles();
	const {
		color,
		round,
		children,
		fullWidth,
		disabled,
		simple,
		size,
		block,
		link,
		onclick,
		justIcon,
		className
	} = props;

	const btnClasses = classNames({
		[classes.button]: true,
		[classes[size]]: size,
		[classes[color]]: color,
		[classes.round]: round,
		[classes.fullWidth]: fullWidth,
		[classes.disabled]: disabled,
		[classes.simple]: simple,
		[classes.block]: block,
		[classes.link]: link,
		[classes.justIcon]: justIcon,
		[className]: className
	});
	return (
		<Button onClick={onclick} className={btnClasses}>
			{children}
		</Button>
	);
};

export default CustomButtons;

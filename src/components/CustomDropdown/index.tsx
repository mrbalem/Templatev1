/** @format */

import * as React from 'react';
import styles from '../../assets/jss/customDropdownStyle';
import {
	makeStyles,
	Icon,
	Popper,
	Grow,
	Paper,
	ClickAwayListener,
	MenuList
} from '@material-ui/core';

// nodejs library that concatenates classes
import classNames from 'classnames';
import { RegularButon } from '../CustomButton';

type color =
	| 'primary'
	| 'info'
	| 'success'
	| 'warning'
	| 'danger'
	| 'rose'
	| 'black';

export interface CustomDropdownProps {
	hoverColor?: color;
	buttonText?: React.ReactChild;
	buttonIcon?: any;
	dropdownList: React.ReactChild;
	buttonProps?: any;
	dropup?: boolean;
	//dropdownHeader: PropTypes.node,
	rtlActive?: boolean;
	caret?: boolean;
	left?: boolean;
	noLiPadding?: boolean;
	// function that retuns the selected item
	onClick?: (param: any) => void;
}

const useStyles: any = makeStyles(styles);

const CustomDropdown: React.SFC<CustomDropdownProps> = props => {
	const {
		hoverColor = 'primary',
		buttonText,
		buttonIcon,
		dropdownList,
		buttonProps,
		dropup,
		caret = true,
		onClick,
		left,
		rtlActive
	} = props;

	const [anchorEl, setAnchorEl] = React.useState<any>(null);

	const referencia = React.createRef();

	const handleClick = (event: any) => {
		if (anchorEl && anchorEl.contains(event.target)) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};
	const handleClose = (param: any) => {
		setAnchorEl(null);
		if (onClick) {
			onClick(param);
		}
	};

	const handleCloseAway = (event: any) => {
		if (anchorEl.contains(event.target)) {
			return;
		}
		setAnchorEl(null);
	};

	const classes = useStyles();

	const caretClasses = classNames({
		[classes.caret]: true,
		[classes.caretActive]: Boolean(anchorEl),
		[classes.caretRTL]: rtlActive,
		[classes.hoverColor]: hoverColor
	});

	let icon = null;
	switch (typeof buttonIcon) {
		case 'object':
			icon = <props.buttonIcon className={classes.buttonIcon} />;
			break;
		case 'string':
			icon = <Icon className={classes.buttonIcon}>{props.buttonIcon}</Icon>;
			break;
		default:
			icon = null;
			break;
	}

	const id = { id: 'menu-list' };

	return (
		<div onMouseLeave={handleClose} onMouseEnter={handleClick}>
			<div>
				<RegularButon
					aria-label='Notifications'
					aria-owns={anchorEl ? 'menu-list' : null}
					aria-haspopup='true'
					size='sm'
					{...buttonProps}
					onClick={handleClick}>
					{icon}
					{buttonText !== undefined ? buttonText : null}
					{caret ? <b className={caretClasses} /> : null}
				</RegularButon>
			</div>

			<Popper
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				transition
				disablePortal
				placement={
					dropup
						? left
							? 'top-start'
							: 'top'
						: left
						? 'bottom-start'
						: 'bottom'
				}
				className={classNames({
					[classes.popperClose]: !anchorEl,
					[classes.popperResponsive]: true
				})}>
				{() => (
					<React.StrictMode>
						<Grow
							in={Boolean(anchorEl)}
							ref={referencia}
							style={
								dropup
									? { transformOrigin: '0 100% 0' }
									: { transformOrigin: '0 0 0' }
							}>
							<Paper ref={referencia} className={classes.dropdown}>
								<ClickAwayListener onClickAway={handleCloseAway}>
									<MenuList role='menu' className={classes.menuList}>
										{dropdownList}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					</React.StrictMode>
				)}
			</Popper>
		</div>
	);
};

export default CustomDropdown;

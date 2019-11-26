import sizes from './sizes';
const drawerWidth = 320;
const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	hide: {
		display: 'none'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '10%'
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	buttons: {
		marginRight: '1rem',
		[sizes.down('xs')]: {
			marginRight: '0.5rem'
		}
	},
	button: {
		margin: '0 0.5rem',
		[sizes.down('xs')]: {
			margin: '0 0.2rem',
			padding: '0.3rem'
		}
	},
	link: {
		textDecoration: 'none'
	}
});

export default styles;

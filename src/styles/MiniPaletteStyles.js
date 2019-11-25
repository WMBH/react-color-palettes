export default {
	root: {
		backgroundColor: 'white',
		border: '1px solid black',
		borderRadius: '5px',
		padding: '0.5rem',
		position: 'relative',
		overflowX: 'hidden',
		cursor: 'pointer',
		'&:hover svg': {
			opacity: '1'
		}
	},
	colors: {
		backgroundColor: '#dae1e4',
		height: '100px',
		width: '100%'
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0',
		color: 'black',
		paddingTop: '0.5rem',
		fontSize: '1rem',
		position: 'relative'
	},
	emoji: {
		marginLeft: '0.5rem',
		fontSize: '1.5rem'
	},
	miniBox: {
		height: '25%',
		width: '20%',
		display: 'inline-block',
		margin: '0 auto',
		position: 'relative',
		marginBottom: '-3.5px'
	},
	deleteIcon: {
		color: 'white',
		backgroundColor: '#eb3d30',
		width: '20px',
		position: 'absolute',
		right: '0px',
		top: '0px',
		padding: '3px',
		zIndex: '10',
		opacity: '0'
	}
};

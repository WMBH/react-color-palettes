import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';

const drawerWidth = 320;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
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
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		height: 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: 0
	},
	contentShift: {
		height: '100vh',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: drawerWidth
	}
});

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20
	};
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: 'teal',
			colors: this.props.palettes[0].colors,
			newColorName: ''
		};
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isNameUnique', (value) =>
			this.state.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.state.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	updateCurrentColor = (newColor) => {
		this.setState({ currentColor: newColor.hex });
	};

	addNewColor = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.setState({ colors: [ ...this.state.colors, newColor ], newColorName: '' });
	};

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleSubmitColorPalette = (newPaletteName) => {
		const palette = {
			paletteName: newPaletteName,
			id: newPaletteName.toLowerCase().replace(/ /g, '-'),
			colors: this.state.colors
		};
		this.props.savePalette(palette);
		this.props.history.push('/');
	};

	removeColor = (colorName) => {
		this.setState({
			colors: this.state.colors.filter((color) => color.name !== colorName)
		});
	};

	removeAllColors = () => {
		this.setState({
			colors: []
		});
	};

	addRandomColor = () => {
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		let rand = Math.floor(Math.random() * allColors.length);
		let randColor = allColors[rand];
		console.log(randColor);
		this.setState({ colors: [ ...this.state.colors, randColor ] });
	};

	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex)
		}));
	};

	render() {
		const { classes, maxColors, palettes } = this.props;
		const { open, colors, currentColor, newColorName } = this.state;
		const paletteIsFull = colors.length >= maxColors;

		return (
			<div>
				<PaletteFormNav
					open={open}
					classes={classes}
					palettes={palettes}
					handleSubmit={this.handleSubmitColorPalette}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">Design your palette</Typography>
					<div>
						<Button variant="contained" color="secondary" onClick={this.removeAllColors}>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={this.addRandomColor}
							disabled={paletteIsFull}
						>
							Random Color
						</Button>
					</div>
					<ChromePicker color={currentColor} onChangeComplete={this.updateCurrentColor} />
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							value={newColorName}
							name="newColorName"
							onChange={this.handleChange}
							validators={[ 'required', 'isNameUnique', 'isColorUnique' ]}
							errorMessages={[
								'This field is required',
								'This name already exists',
								'This color already exists'
							]}
						/>
						<Button
							type="submit"
							disabled={paletteIsFull}
							variant="contained"
							color="primary"
							style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
						>
							{paletteIsFull ? 'Palette is full' : 'Add color'}
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						onSortEnd={this.onSortEnd}
						colors={colors}
						removeColor={this.removeColor}
						axis="xy"
					/>
				</main>
			</div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);

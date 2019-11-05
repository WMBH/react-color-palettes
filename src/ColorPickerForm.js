import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	picker: {
		width: '100% !important',
		marginTop: '2rem'
	},
	addColor: {
		width: '100%',
		padding: '1rem',
		marginTop: '1rem',
		fontSize: '1rem'
	},
	colorNameInput: {
		width: '100%'
	}
};
class ColorPickerForm extends Component {
	constructor(props) {
		super(props);
		this.state = { currentColor: 'teal', newColorName: '' };
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isNameUnique', (value) =>
			this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			this.props.colors.every(({ color }) => color !== this.state.currentColor)
		);
	}

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	updateCurrentColor = (newColor) => {
		this.setState({ currentColor: newColor.hex });
	};

	handleSubmit = () => {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName
		};
		this.props.addColor(newColor);
		this.setState({ newColorName: '' });
	};

	render() {
		const { paletteIsFull, classes } = this.props;
		const { currentColor, newColorName } = this.state;
		return (
			<div>
				<ChromePicker color={currentColor} onChange={this.updateCurrentColor} className={classes.picker} />
				<ValidatorForm onSubmit={this.handleSubmit}>
					<TextValidator
						value={newColorName}
						name="newColorName"
						className={classes.colorNameInput}
						onChange={this.handleChange}
						validators={[ 'required', 'isNameUnique', 'isColorUnique' ]}
						errorMessages={[
							'This field is required',
							'This name already exists',
							'This color already exists'
						]}
						variant="filled"
						margin="normal"
						placeholder="Color Name"
					/>
					<div className={classes.buttons}>
						<Button
							type="submit"
							disabled={paletteIsFull}
							variant="contained"
							color="primary"
							className={classes.addColor}
							style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
						>
							{paletteIsFull ? 'Palette is full' : 'Add color'}
						</Button>
					</div>
				</ValidatorForm>
			</div>
		);
	}
}

export default withStyles(styles)(ColorPickerForm);

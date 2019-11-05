import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { getThemeProps } from '@material-ui/styles';

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stage: 'form',
			newPaletteName: ''
		};
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			this.props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
		);
	}

	handleChange = (evt) => {
		this.setState({ [evt.target.name]: evt.target.value });
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	showEmojiPicker = () => {
		this.setState({ stage: 'emoji' });
	};

	savePalette = (emoji) => {
		console.log(emoji.native);
		const newPalette = { paletteName: this.state.newPaletteName, emoji: emoji.native };
		this.props.handleSubmit(newPalette);
	};

	render() {
		const { newPaletteName } = this.state;
		const { hideForm } = this.props;
		return (
			<div>
				<Dialog open={this.state.stage === 'emoji'} onClose={hideForm}>
					<DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
					<Picker onSelect={this.savePalette} />
				</Dialog>
				<Dialog open={this.state.stage === 'form'} onClose={hideForm} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
					<ValidatorForm onSubmit={this.showEmojiPicker}>
						<DialogContent>
							<DialogContentText>Please enter a name for your new palette</DialogContentText>
							<TextValidator
								value={newPaletteName}
								label="Palette Name"
								name="newPaletteName"
								onChange={this.handleChange}
								fullWidth
								margin="normal"
								validators={[ 'required', 'isPaletteNameUnique' ]}
								errorMessages={[ 'Enter a palette name', 'This name is already taken' ]}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={hideForm} color="primary">
								Cancel
							</Button>
							<Button variant="contained" color="primary" type="submit">
								Save Palette
							</Button>
						</DialogActions>
					</ValidatorForm>
				</Dialog>
			</div>
		);
	}
}

export default PaletteMetaForm;

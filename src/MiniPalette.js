import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends Component {
	deletePalette = (evt) => {
		evt.stopPropagation();
		this.props.openDialog(this.props.id);
	};

	render() {
		const { classes, paletteName, emoji, colors, handleRedirect } = this.props;
		const miniBoxes = colors.map((c) => (
			<div className={classes.miniBox} style={{ backgroundColor: c.color }} key={c.name} />
		));
		return (
			<div className={classes.root} onClick={handleRedirect}>
				<DeleteIcon
					className={classes.deleteIcon}
					style={{ transition: 'all 0.3s ease-in-out' }}
					onClick={this.deletePalette}
				/>
				<div className={classes.colors}>{miniBoxes}</div>
				<h5 className={classes.title}>
					{paletteName}
					<span className={classes.emoji}>{emoji}</span>
				</h5>
			</div>
		);
	}
}

export default withStyles(styles)(MiniPalette);

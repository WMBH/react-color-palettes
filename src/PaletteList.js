import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deleteDialogOpen: false,
			deleteId: ''
		};
	}

	handleDelete = () => {
		this.props.deletePalette(this.state.deleteId);
		this.closeDeleteDialog();
	};

	openDeleteDialog = (id) => {
		this.setState({ deleteDialogOpen: true, deleteId: id });
	};

	closeDeleteDialog = () => {
		this.setState({ deleteDialogOpen: false, deleteId: '' });
	};

	redirectToPalette = (id) => {
		this.props.history.push(`/palette/${id}`);
	};
	render() {
		const { palettes, classes, deletePalette } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 className={classes.title}>React Colors</h1>
						<Link to="/palette/new">Create </Link>
					</nav>
					<div className={classes.palettes}>
						{' '}
						{palettes.map((p) => (
							<MiniPalette
								{...p}
								handleRedirect={this.redirectToPalette}
								openDialog={this.openDeleteDialog}
								key={p.id}
								id={p.id}
							/>
						))}
					</div>
				</div>
				<Dialog open={this.state.deleteDialogOpen} onClose={this.closeDeleteDialog}>
					<DialogTitle>Delete this palette?</DialogTitle>
					<List>
						<ListItem button onClick={this.handleDelete}>
							<ListItemAvatar>
								<Avatar>
									<CheckIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Delete</ListItemText>
						</ListItem>
						<ListItem button onClick={this.closeDeleteDialog}>
							<ListItemAvatar>
								<Avatar>
									<CloseIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText>Cancel</ListItemText>
						</ListItem>
					</List>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(PaletteList);

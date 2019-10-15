import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			palettes: seedColors
		};
	}
	findPalette = (id) => {
		return this.state.palettes.find((palette) => {
			return palette.id === id;
		});
	};

	savePalette = (newPalette) => {
		this.setState({ palettes: [ ...this.state.palettes, newPalette ] });
	};

	render() {
		return (
			<Switch>
				<Route
					exact
					path="/palette/new"
					render={(routeProps) => (
						<NewPaletteForm palettes={this.state.palettes} savePalette={this.savePalette} {...routeProps} />
					)}
				/>
				<Route
					exact
					path="/"
					render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />}
				/>
				<Route
					exact
					path="/palette/:id"
					render={(routeProps) => (
						<Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
					)}
				/>
				<Route
					exact
					path="/palette/:paletteId/:colorId"
					render={(routeProps) => (
						<SingleColorPalette
							colorId={routeProps.match.params.colorId}
							palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
						/>
					)}
				/>
			</Switch>

			// <div className="App">
			//     <Palette palette={generatePalette(seedColors[2])} />
			// </div>
		);
	}
}

export default App;

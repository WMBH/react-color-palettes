import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';

class App extends Component {
    findPalette(id) {
        return seedColors.find((palette) => {
            return palette.id === id;
        });
    }
    render() {
        return (
            <Switch>
                <Route exact path="/" render={() => <PaletteList palettes={seedColors} />} />
                <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => (
                        <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
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

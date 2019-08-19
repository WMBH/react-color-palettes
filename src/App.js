import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
    console.log(generatePalette(seedColors[2]));
    return (
        <Switch>
            <Route exact path="/" render={() => <h1>palette list</h1>} />
            <Route exact path="/palette/:id" render={() => <h1>Palette</h1>} />
        </Switch>

        // <div className="App">
        //     <Palette palette={generatePalette(seedColors[2])} />
        // </div>
    );
}

export default App;

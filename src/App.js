import React from 'react';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

function App() {
    console.log(generatePalette(seedColors[2]));
    return (
        <div className="App">
            <Palette palette={generatePalette(seedColors[2])} />
        </div>
    );
}

export default App;

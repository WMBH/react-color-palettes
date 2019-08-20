import React, { Component } from 'react';
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.collectShades(this.props.palette, this.props.colorId);
    }

    collectShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;
        for (const key in allColors) {
            shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
        }
        return shades.slice(1);
    };

    render() {
        const colorBoxes = this._shades.map((c) => (
            <ColorBox key={c.name} name={c.name} background={c.hex} showLink={false} />
        ));
        return (
            <div className="Palette">
                <h1>Adas</h1>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }
}

export default SingleColorPalette;

import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.collectShades(this.props.palette, this.props.colorId);
        this.state = {
            format: 'hex'
        };
    }

    collectShades = (palette, colorToFilterBy) => {
        let shades = [];
        let allColors = palette.colors;
        for (const key in allColors) {
            shades = shades.concat(allColors[key].filter((color) => color.id === colorToFilterBy));
        }
        return shades.slice(1);
    };

    changeFormat = (val) => {
        this.setState({ format: val });
    };

    render() {
        const { format } = this.state;
        const { paletteName, emoji } = this.props.palette;
        const colorBoxes = this._shades.map((c) => (
            <ColorBox key={c.name} name={c.name} background={c[format]} showLink={false} />
        ));
        return (
            <div className="Palette">
                <Navbar changeFormat={this.changeFormat} showSlider={false} />
                <div className="Palette-colors">{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default SingleColorPalette;

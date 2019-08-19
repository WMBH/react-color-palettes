import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
    }

    changeLevel = (level) => {
        this.setState({ level });
    };

    changeFormat = (val) => {
        this.setState({ format: val });
    };

    render() {
        const { level, format } = this.state;
        const { colors, paletteName, emoji } = this.props.palette;
        const colorBoxes = colors[level].map((c) => <ColorBox background={c[format]} name={c.name} />);
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} changeFormat={this.changeFormat} />
                <div className="Palette-colors">{colorBoxes}</div>
                <footer className="Palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>
            </div>
        );
    }
}

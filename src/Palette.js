import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500 };
    }

    changeLevel = (level) => {
        this.setState({ level });
    };

    render() {
        const { level } = this.state;
        const { colors } = this.props.palette;
        const colorBoxes = colors[level].map((c) => <ColorBox background={c.hex} name={c.name} />);
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} />
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }
}

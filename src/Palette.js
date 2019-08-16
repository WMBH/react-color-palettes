import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

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
                {/* nav here */}
                <Slider
                    defaultValue={this.state.level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={this.changeLevel}
                />
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }
}

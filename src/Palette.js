import React, { Component } from 'react';
import Slider from 'rc-slider';
import ColorBox from './ColorBox';
import './Palette.css';
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
                <div className="slider">
                    <Slider
                        defaultValue={this.state.level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={this.changeLevel}
                    />
                </div>
                <div className="Palette-colors">{colorBoxes}</div>
            </div>
        );
    }
}

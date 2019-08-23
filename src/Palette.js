import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import './Palette.css';

const styles = {
    Palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    colors: {
        height: '90%'
    }
};

class Palette extends Component {
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
        const { classes } = this.props;
        const { colors, paletteName, emoji, id } = this.props.palette;
        const colorBoxes = colors[level].map((c) => (
            <ColorBox background={c[format]} name={c.name} key={c.id} id={c.id} paletteId={id} showFullPalette={true} />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar
                    level={level}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    showSlider={true}
                />
                <div className={classes.colors}>{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(Palette);

import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    changeCopyState = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1300);
        });
    };

    render() {
        const { name, background, paletteId, id, showFullPalette, classes } = this.props;
        const { copied } = this.state;

        return (
            <div style={{ background }} className={classes.ColorBox}>
                <div style={{ background }} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} />
                <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{background}</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                    <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                        <button className={classes.copyButton}>Copy</button>
                    </CopyToClipboard>
                </div>
                {showFullPalette && (
                    <Link to={`/palette/${paletteId}/${id}`}>
                        <span className={classes.seeMore}>More</span>
                    </Link>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(ColorBox);

import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';

const MiniPalette = (props) => {
    const { classes, paletteName, emoji, colors, handleRedirect } = props;
    const miniBoxes = colors.map((c) => (
        <div className={classes.miniBox} style={{ backgroundColor: c.color }} key={c.name} />
    ));
    return (
        <div className={classes.root} onClick={handleRedirect}>
            <div className={classes.colors}>{miniBoxes}</div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
};

export default withStyles(styles)(MiniPalette);

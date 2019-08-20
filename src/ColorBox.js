import React, { Component } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';

export default class ColorBox extends Component {
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
        const { name, background, paletteId, id, showLink } = this.props;
        const { copied } = this.state;
        return (
            <div style={{ background }} className="ColorBox">
                <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p>{background}</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                    <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                        <button className="copy-button">Copy</button>
                    </CopyToClipboard>
                </div>
                {showLink && (
                    <Link to={`/palette/${paletteId}/${id}`}>
                        <span className="see-more">More</span>
                    </Link>
                )}
            </div>
        );
    }
}

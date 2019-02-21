import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.css';

// See: https://github.com/Karify/external-svg-sprite-loader

const SpriteIcon = ({ svg, ...rest }) => (
    <i { ...rest }>
        <svg viewBox={ svg.viewBox }>
            <use xlinkHref={ svg.symbol } />
        </svg>
    </i>
);

SpriteIcon.propTypes = {
    svg: PropTypes.object.isRequired,
};

const InlineIcon = ({ svg, ...rest }) => (
    <i { ...rest }
        dangerouslySetInnerHTML={ { __html: svg } } />
);

InlineIcon.propTypes = {
    svg: PropTypes.string.isRequired,
};

export default class Icon extends Component {
    static propTypes = {
        svg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        interactive: PropTypes.bool,
        onClick: PropTypes.func,
        onKeyDown: PropTypes.func,
        className: PropTypes.string,
    };

    render() {
        const { svg, interactive, onKeyDown, className, ...rest } = this.props;
        const finalProps = {
            tabIndex: interactive ? 0 : undefined,
            ...rest,
            onKeyDown: interactive ? this.handleKeyDown : onKeyDown,
            svg,
            className: classNames(styles.icon, interactive && styles.interactive, className),
        };

        return typeof svg === 'string' ?
            <InlineIcon { ...finalProps } /> :
            <SpriteIcon svg={ svg } { ...finalProps } />;
    }

    handleKeyDown = (event) => {
        this.props.onKeyDown && this.props.onKeyDown(event);

        if (event.key === 'Enter' || event.key === ' ') {
            this.props.onClick && this.props.onClick(event);
        }
    };
}

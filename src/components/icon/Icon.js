import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Icon.css';

// See: https://github.com/Karify/external-svg-sprite-loader

const ExternalIcon = ({ svg, ...rest }) => (
    <i { ...rest }>
        <svg viewBox={ svg.viewBox }>
            <use xlinkHref={ svg.symbol } />
        </svg>
    </i>
);

ExternalIcon.propTypes = {
    svg: PropTypes.object.isRequired,
};

const InlineIcon = ({ svg, ...rest }) => (
    <i { ...rest }
        dangerouslySetInnerHTML={ { __html: svg } } />
);

InlineIcon.propTypes = {
    svg: PropTypes.string.isRequired,
};

const Icon = (props) => {
    const { svg, className } = props;
    const finalProps = {
        ...props,
        className: classNames(styles.icon, className),
    };

    return typeof svg === 'string' ?
        <InlineIcon { ...finalProps } /> :
        <ExternalIcon svg={ svg } { ...finalProps } />;
};

Icon.propTypes = {
    svg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
};

export default Icon;

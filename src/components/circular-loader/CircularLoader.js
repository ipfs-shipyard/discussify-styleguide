import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './CircularLoader.css';

const CircularLoader = ({ className, ...rest }) => {
    const finalClassName = classNames(
        styles.circularLoader,
        className
    );

    return (
        <span { ...rest } className={ finalClassName }>
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </span>
    );
};

CircularLoader.propTypes = {
    className: PropTypes.string,
};

export default CircularLoader;

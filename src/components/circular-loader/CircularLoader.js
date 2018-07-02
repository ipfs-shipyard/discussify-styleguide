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
        <div { ...rest } className={ finalClassName }>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
};

CircularLoader.propTypes = {
    className: PropTypes.string,
};

export default CircularLoader;

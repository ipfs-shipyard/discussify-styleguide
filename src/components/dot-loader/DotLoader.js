import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './DotLoader.css';

const DotLoader = ({ className, ...rest }) => {
    const finalClassName = classNames(
        styles.dotLoader,
        className
    );

    return (
        <span { ...rest } className={ finalClassName }>
            <span />
            <span />
            <span />
        </span>
    );
};

DotLoader.propTypes = {
    className: PropTypes.string,
};

export default DotLoader;

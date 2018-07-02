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
        <div { ...rest } className={ finalClassName }>
            <div />
            <div />
            <div />
        </div>
    );
};

DotLoader.propTypes = {
    className: PropTypes.string,
};

export default DotLoader;

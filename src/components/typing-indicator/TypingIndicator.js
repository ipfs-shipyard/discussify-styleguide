import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TypingIndicator.css';

const TypingIndicator = ({ className, ...rest }) => {
    const finalClassName = classNames(
        styles.typingIndicator,
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

TypingIndicator.propTypes = {
    className: PropTypes.string,
};

export default TypingIndicator;

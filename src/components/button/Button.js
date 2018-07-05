import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.css';

const Button = ({ variant, fullWidth, children, className, ...rest }) => {
    const finalClassName = classNames(
        styles.button,
        styles[variant],
        fullWidth && styles.fullWidth,
        className
    );

    return (
        <button { ...rest } className={ finalClassName }>
            <span className={ styles.text }>{ children }</span>
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextButton.css';

const TextButton = ({ variant, icon, iconPosition, children, className, ...rest }) => {
    const finalClassName = classNames(
        styles.textButton,
        styles[variant],
        styles[iconPosition],
        className
    );

    return (
        <button { ...rest } className={ finalClassName }>
            <span className={ styles.text }>{ children }</span>
            { icon ? React.cloneElement(icon, { className: classNames(styles.icon, icon.props.className) }) : null }
        </button>
    );
};

TextButton.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary']),
    children: PropTypes.node.isRequired,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
};

TextButton.defaultProps = {
    iconPosition: 'right',
};

export default TextButton;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './TextButton.css';

const TextButton = ({ icon, iconPosition, children, className, ...rest }) => {
    const finalClassName = classNames(
        styles.textButton,
        styles[iconPosition],
        className
    );

    return (
        <button { ...rest } className={ finalClassName }>
            <span className={ styles.label }>{ children }</span>
            { icon ? React.cloneElement(icon, { className: classNames(styles.icon, icon.props.className) }) : null }
        </button>
    );
};

TextButton.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.element,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    className: PropTypes.string,
};

TextButton.defaultProps = {
    iconPosition: 'right',
};

export default TextButton;

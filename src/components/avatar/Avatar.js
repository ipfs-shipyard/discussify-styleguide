import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PreloadImage from 'react-preload-image';
import getInitials from './initials';
import styles from './Avatar.css';

const Avatar = ({ name, image, lazy, className, ...rest }) => {
    const finalClassName = classNames(styles.avatar, className);

    return (
        <div { ...rest } className={ finalClassName }>
            <span className={ styles.initials }>{ getInitials(name) || '?' }</span>
            { image ? <PreloadImage className={ styles.image } src={ image } lazy={ lazy } /> : null }
        </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    lazy: PropTypes.bool,
    className: PropTypes.string,
};

export default Avatar;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { deburr } from 'lodash';
import PreloadImage from 'react-preload-image';
import styles from './Avatar.css';

const getInitials = (name) => {
    const split = name.split(' ');

    const first = split[0][0];
    const second = split.length > 1 && split[split.length - 1][0];

    return deburr((first + second).trim()).toUpperCase();
};

const Avatar = ({ name, image, lazy, className, ...rest }) => {
    const finalClassName = classNames(styles.avatar, className);

    return (
        <div { ...rest } className={ finalClassName }>
            { getInitials(name) }
            { image ? <PreloadImage className={ styles.image } src={ image } lazy={ lazy } /> : null }
        </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    lazy: PropTypes.bool,
    className: PropTypes.string,
};

export default Avatar;

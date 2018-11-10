import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from '../avatar';
import styles from './Author.css';

const Author = ({ author, myself, preloadAvatarImage, className }) => (
    <div className={ classNames(styles.author, className) }>
        <Avatar
            name={ author.name }
            image={ author.avatar }
            preloadImage={ preloadAvatarImage } />

        <span className={ styles.name }>
            { author.name }
            { myself && ' (You)' }
        </span>
    </div>
);

Author.propTypes = {
    author: PropTypes.object.isRequired,
    myself: PropTypes.bool,
    preloadAvatarImage: PropTypes.bool,
    className: PropTypes.string,
};

export default Author;

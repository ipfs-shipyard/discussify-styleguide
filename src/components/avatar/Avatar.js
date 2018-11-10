import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PreloadImage from 'react-preload-image';
import getInitials from './initials';
import styles from './Avatar.css';

const Image = ({ preloadImage, ...rest }) => preloadImage ?
    <PreloadImage { ...rest } /> :
    <img { ...rest } alt="" />;

Image.propTypes = {
    preloadImage: PropTypes.bool,
};

const Avatar = ({ name, image, preloadImage, className, ...rest }) => {
    const finalClassName = classNames(styles.avatar, className);

    return (
        <div { ...rest } className={ finalClassName }>
            <span className={ styles.initials }>{ getInitials(name) || '?' }</span>
            { image && <Image src={ image } preloadImage={ preloadImage } className={ styles.image } /> }
        </div>
    );
};

Avatar.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    preloadImage: PropTypes.bool,
    className: PropTypes.string,
};

Avatar.defaultProps = {
    preloadImage: true,
};

export default Avatar;

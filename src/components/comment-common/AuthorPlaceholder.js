import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './AuthorPlaceholder.css';

const AuthorPlaceholder = ({ className }) => (
    <div className={ classNames(styles.authorPlaceholder, className) }>
        <div className={ styles.dummyAvatar } />
        <div className={ styles.dummyNameText } />
    </div>
);

AuthorPlaceholder.propTypes = {
    className: PropTypes.string,
};

export default AuthorPlaceholder;

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BrandLogo from '../brand-logo';
import styles from './FloatingD.css';

const FloatingD = ({ className, commentsCount, hasUnread, ...rest }) => {
    const hasComments = commentsCount > 0;
    const finalClassName = classNames(
        styles.floatingD,
        hasComments && hasUnread && styles.hasUnread,
        className
    );

    return (
        <button { ...rest } className={ finalClassName }>
            { hasComments ?
                commentsCount :
                <BrandLogo variant="abbr" className={ styles.logo } /> }
        </button>
    );
};

FloatingD.propTypes = {
    commentsCount: PropTypes.number,
    hasUnread: PropTypes.bool,
    className: PropTypes.string,
};

export default FloatingD;

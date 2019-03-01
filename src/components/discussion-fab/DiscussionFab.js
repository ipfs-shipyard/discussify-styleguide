import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BrandLogo from '../brand-logo';
import styles from './DiscussionFab.css';

const DicussionFab = ({ className, logoClassName, active, commentsCount, hasUnread, ...rest }) => {
    const hasComments = commentsCount > 0;
    const finalClassName = classNames(
        styles.discussionFab,
        active && styles.active,
        hasComments && hasUnread && styles.hasUnread,
        className
    );
    const logoFinalClassName = classNames(styles.logo, logoClassName);

    return (
        <button { ...rest } className={ finalClassName }>
            { hasComments ?
                <span className={ styles.commentsCount }>{ commentsCount }</span> :
                <BrandLogo variant="logomark" className={ logoFinalClassName } /> }
        </button>
    );
};

DicussionFab.propTypes = {
    active: PropTypes.bool,
    commentsCount: PropTypes.number,
    hasUnread: PropTypes.bool,
    className: PropTypes.string,
    logoClassName: PropTypes.string,
};

export default DicussionFab;

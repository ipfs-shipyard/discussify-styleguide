import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import BrandLogo from '../brand-logo';
import styles from './DiscussionFab.css';

const DicussionFab = ({ className, active, commentsCount, hasUnread, ...rest }) => {
    const hasComments = commentsCount > 0;
    const finalClassName = classNames(
        styles.discussionFab,
        active && styles.active,
        hasComments && hasUnread && styles.hasUnread,
        className
    );

    return (
        <button { ...rest } className={ finalClassName }>
            { hasComments ?
                commentsCount :
                <BrandLogo variant="logomark" className={ styles.logo } /> }
        </button>
    );
};

DicussionFab.propTypes = {
    active: PropTypes.bool,
    commentsCount: PropTypes.number,
    hasUnread: PropTypes.bool,
    className: PropTypes.string,
};

export default DicussionFab;

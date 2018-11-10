import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AuthorPlaceholder from './AuthorPlaceholder';
import styles from './BottomBarPlaceholder.css';

const BottomBarPlaceholder = ({ className }) => (
    <div className={ classNames(styles.bottomBarPlaceholder, className) }>
        <AuthorPlaceholder className={ styles.author } />

        <div className={ styles.details }>
            <span className={ styles.dummyDateText } />
            <span className={ styles.dummySeparator } />
            <span className={ styles.dummyActionsText } />
        </div>
    </div>
);

BottomBarPlaceholder.propTypes = {
    className: PropTypes.string,
};

export default BottomBarPlaceholder;

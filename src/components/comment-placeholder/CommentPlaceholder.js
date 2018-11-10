import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { BottomBarPlaceholder } from '../comment-common';
import styles from './CommentPlaceholder.css';

const dummyText = '\n\n';

const CommentPlaceholder = ({ className, ...rest }) => (
    <div { ...rest } className={ classNames(styles.commentPlaceholder, className) }>
        <div className={ styles.content }>
            <pre>{ dummyText }</pre>

            <div className={ styles.dummyTextLine1 } />
            <div className={ styles.dummyTextLine2 } />
        </div>

        <BottomBarPlaceholder className={ styles.bottomBar } />
    </div>
);

CommentPlaceholder.propTypes = {
    className: PropTypes.string,
};

export default CommentPlaceholder;

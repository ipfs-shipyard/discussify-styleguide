import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { RetryIcon } from '../icon';
import { BottomBarPlaceholder } from '../comment-common';
import styles from './CommentError.css';

const CommentError = ({ onRetry, className, ...rest }) => (
    <div { ...rest } className={ classNames(styles.commentError, className) }>
        <div className={ styles.content }>
            <pre className={ styles.message }>
                This comment couldn&#39;t be loaded.
                { '\n\n' }
            </pre>

            <div className={ styles.actions }>
                <RetryIcon
                    interactive
                    onClick={ onRetry }
                    className={ styles.icon } />
            </div>
        </div>

        <BottomBarPlaceholder className={ styles.bottomBar } />
    </div>
);

CommentError.propTypes = {
    onRetry: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default CommentError;

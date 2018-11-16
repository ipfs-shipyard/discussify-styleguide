import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReplyIcon } from '../icon';
import styles from './CommentRepliesHeaderPlaceholder.css';

const CommentRepliesHeaderPlaceholder = ({ withViewMore, className, ...rest }) => (
    <div { ...rest } className={ classNames(styles.commentRepliesHeaderPlaceholder, className) }>
        <div className={ styles.replyingTo }>
            <ReplyIcon className={ styles.replyIcon } />
            <span className={ styles.dummyText } />
            <span className={ styles.fakeText } />
        </div>

        { withViewMore && (
            <div className={ styles.viewMore }>
                <div className={ styles.dummyButton } />
            </div>
        ) }
    </div>
);

CommentRepliesHeaderPlaceholder.propTypes = {
    withViewMore: PropTypes.bool,
    className: PropTypes.string,
};

export default CommentRepliesHeaderPlaceholder;

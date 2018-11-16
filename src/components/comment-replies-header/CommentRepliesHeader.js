import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReplyIcon } from '../icon';
import styles from './CommentRepliesHeader.css';

const CommentRepliesHeader = ({ author, viewMoreCount, onViewMore, className, ...rest }) => (
    <div { ...rest } className={ classNames(styles.commentRepliesHeader, className) }>
        <div className={ styles.replyingTo }>
            <ReplyIcon className={ styles.replyIcon } />
            <span className={ styles.text }>Replying to: { author.name || 'Unnamed' }</span>
        </div>

        { viewMoreCount > 0 && onViewMore && (
            <div className={ styles.viewMore }>
                <button onClick={ onViewMore } className={ styles.button }>
                    View more replies ({ viewMoreCount })
                </button>
            </div>
        ) }
    </div>
);

CommentRepliesHeader.propTypes = {
    author: PropTypes.object.isRequired,
    viewMoreCount: PropTypes.number,
    onViewMore: PropTypes.func,
    className: PropTypes.string,
};

export default CommentRepliesHeader;

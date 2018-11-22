import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { isRequiredIf } from 'prop-type-conditionals';
import styles from './CommentFrame.css';

const ReplyToPlaceholder = () => (
    <div className={ styles.replyToPlaceholder }>
        <span className={ styles.dummyText } />
    </div>
);

const ReplyTo = ({ to }) => (
    <div className={ styles.replyTo }>
        Replying to { to.name || 'Unnamed' }
    </div>
);

ReplyTo.propTypes = {
    to: PropTypes.object.isRequired,
};

const RepliesCountPlaceholder = () => (
    <div className={ styles.repliesCountPlaceholder }>
        <span className={ styles.dummyText } />
    </div>
);

const RepliesCount = ({ total, viewMore, onViewMoreReplies }) => {
    if (viewMore <= 0) {
        return null;
    }

    const repliesText = pluralize('reply', viewMore);

    return (
        <button onClick={ onViewMoreReplies } className={ styles.repliesCount }>
            { viewMore >= total ? `${viewMore} ${repliesText}` : `${viewMore} more ${repliesText}` }
        </button>
    );
};

RepliesCount.propTypes = {
    total: PropTypes.number.isRequired,
    viewMore: PropTypes.number.isRequired,
    onViewMoreReplies: PropTypes.func.isRequired,
};

const CommentFrame = ({ reply, replyTo, replies, repliesCount, onViewMoreReplies, children, className, ...rest }) => (
    <div { ...rest } className={ classNames(styles.commentFrame, className) }>
        { reply && !replyTo && <ReplyToPlaceholder /> }
        { reply && replyTo && <ReplyTo to={ replyTo } /> }
        { children }
        { replies && !repliesCount && <RepliesCountPlaceholder /> }
        { replies && repliesCount && (
            <RepliesCount
                total={ repliesCount.total }
                viewMore={ repliesCount.viewMore }
                onViewMoreReplies={ onViewMoreReplies } />
        ) }
    </div>
);

CommentFrame.propTypes = {
    children: PropTypes.element.isRequired,
    reply: PropTypes.bool,
    replyTo: PropTypes.object,
    replies: PropTypes.bool,
    repliesCount: PropTypes.shape({ total: PropTypes.number.isRequired, viewMore: PropTypes.number.isRequired }),
    onViewMoreReplies: isRequiredIf((props) => props.replies && props.repliesCount, PropTypes.func),
    className: PropTypes.string,
};

export default CommentFrame;

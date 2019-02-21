import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { isRequiredIf } from 'prop-type-conditionals';
import TimeAgo from '../time-ago';
import TextButton from '../text-button';
import { ReplyIcon, EditIcon, RemoveIcon } from '../icon';
import { ModalTrigger, ConfirmModal } from '../modal';
import { Author, AuthorPlaceholder } from '../comment-common';
import styles from './Comment.css';

const ConfirmRemoveModal = (props) => (
    <ConfirmModal
        message="Are you sure you want to remove the comment?"
        confirmText="Yes, remove."
        cancelText="No, cancel."
        { ...props } />
);

const Content = ({ comment, owner, onEdit, onRemove }) => (
    <div className={ styles.content }>
        <pre className={ styles.message }>{ comment.body }</pre>
        { owner && (
            <div className={ styles.actions }>
                <EditIcon
                    interactive
                    onClick={ onEdit }
                    className={ styles.icon } />
                <ModalTrigger modal={ <ConfirmRemoveModal onConfirm={ onRemove } /> }>
                    <RemoveIcon interactive className={ styles.icon } />
                </ModalTrigger>
            </div>
        ) }
    </div>
);

Content.propTypes = {
    comment: PropTypes.object.isRequired,
    owner: PropTypes.bool,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
};

const ContentRemoved = () => (
    <div className={ styles.contentRemoved }>
        <RemoveIcon className={ styles.removeIcon } />
        <span className={ styles.deletedText }>This comment is no longer available</span>
        <TextButton>See history</TextButton>
    </div>
);

const Comment = ({
    comment,
    owner,
    preloadAvatarImage,
    onReply,
    onEdit,
    onRemove,
    className,
    ...rest
}) => {
    const removed = comment.body == null;
    const edited = !removed && comment.updatedAt != null;

    return (
        <div { ...rest } className={ classNames(styles.comment, className) }>
            { removed ?
                <ContentRemoved /> :
                <Content
                    comment={ comment }
                    owner={ owner }
                    onEdit={ onEdit }
                    onRemove={ onRemove } />
            }

            <div className={ styles.bottomBar }>
                { removed ?
                    <AuthorPlaceholder className={ styles.author } /> :
                    <Author
                        author={ comment.author }
                        myself={ owner }
                        preloadAvatarImage={ preloadAvatarImage }
                        className={ styles.author } />
                }

                <div className={ styles.details }>
                    <button
                        className={ styles.info }
                        disabled={ !removed && !edited }>
                        { removed && <span className={ styles.updateStatus }>(Removed)</span> }
                        { edited && <span className={ styles.updateStatus }>(Edited)</span> }
                        <TimeAgo
                            date={ comment.createdAt }
                            format="tiny"
                            className={ styles.date } />
                    </button>

                    <span className={ styles.separator } />

                    <TextButton
                        icon={ <ReplyIcon /> }
                        onClick={ onReply }
                        className={ styles.button }>
                        Reply
                    </TextButton>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    owner: PropTypes.bool,
    preloadAvatarImage: PropTypes.bool,
    onReply: PropTypes.func.isRequired,
    onEdit: isRequiredIf((props) => props.owner, PropTypes.func),
    onRemove: isRequiredIf((props) => props.owner, PropTypes.func),
    className: PropTypes.string,
};

Comment.defaultProps = {
    preloadAvatarImage: true,
};

export default Comment;

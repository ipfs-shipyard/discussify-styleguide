import React, { PureComponent, createRef } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isWhitespace from 'is-whitespace';
import TextareaAutosize from '../textarea-autosize';
import TextButton from '../text-button';
import { ModalTrigger, ConfirmModal } from '../modal';
import { Author } from '../comment-common';
import styles from './CommentInput.css';

const isBodyEmpty = (body) => !body || isWhitespace(body);

const ConfirmCancelEditModal = (props) => (
    <ConfirmModal
        message="Are you sure you want to discard the changes?"
        confirmText="Yes, discard."
        cancelText="No, go back."
        { ...props } />
);

const ConfirmCancelReplyModal = (props) => (
    <ConfirmModal
        message="Are you sure you want to cancel your reply?"
        confirmText="Yes, cancel."
        cancelText="No, go back."
        { ...props } />
);

export default class CommentInput extends PureComponent {
    static propTypes = {
        type: PropTypes.oneOf(['reply', 'edit']),
        author: PropTypes.object.isRequired,
        body: PropTypes.string,
        preloadAvatarImage: PropTypes.bool,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    textareaAutosizeRef = createRef();
    cancelButtonWithConfirmationRef = createRef();
    pendingAction = null;

    constructor(props) {
        super();

        this.state = {
            empty: isBodyEmpty(props.body),
            changed: false,
        };
    }

    render() {
        const { type, body, author, preloadAvatarImage, onSubmit, onCancel, className, ...rest } = this.props;
        const { empty, changed } = this.state;
        const reply = type === 'reply';

        const ConfirmCancelModal = reply ? ConfirmCancelReplyModal : ConfirmCancelEditModal;

        return (
            <div { ...rest } className={ classNames(styles.commentInput, className) }>
                <TextareaAutosize
                    placeholder={ reply ? 'Reply to this comment...' : '' }
                    ref={ this.textareaAutosizeRef }
                    defaultValue={ body }
                    rows={ 1 }
                    maxRows={ 10 }
                    submitOnEnter
                    onFocus={ this.handleTextareaFocus }
                    onSubmit={ this.handleTextareaSubmit }
                    onChange={ this.handleTextareaChange }
                    onAnimationEnd={ this.handleTextareaAnimationEnd }
                    className={ styles.textarea } />

                <div className={ styles.bottomBar }>
                    <Author
                        author={ author }
                        myself
                        preloadAvatarImage={ preloadAvatarImage }
                        className={ styles.author } />

                    <div className={ styles.actions }>
                        <TextButton
                            onMouseDown={ this.handleSaveMouseDown }
                            onClick={ this.handleSaveClick }
                            disabled={ empty }
                            className={ styles.button }>
                            { reply ? 'Send' : 'Save' }
                        </TextButton>

                        <span className={ styles.separator } />

                        { changed ? (
                            <ModalTrigger modal={ <ConfirmCancelModal onConfirm={ onCancel } /> }>
                                <TextButton
                                    ref={ this.cancelButtonWithConfirmationRef }
                                    onMouseDown={ this.handleConfirmCancelMouseDown }
                                    className={ styles.button }>
                                        Cancel
                                </TextButton>
                            </ModalTrigger>
                        ) : (
                            <TextButton
                                onMouseDown={ this.handleCancelMouseDown }
                                onClick={ this.handleCancelClick }
                                className={ styles.button }>
                                    Cancel
                            </TextButton>
                        ) }
                    </div>
                </div>
            </div>
        );
    }

    handleTextareaChange = () => {
        const originalBody = this.props.body || '';
        const body = findDOMNode(this.textareaAutosizeRef.current).value;

        this.setState({
            empty: isBodyEmpty(body),
            changed: originalBody !== body,
        });
    };

    handleTextareaFocus = () => {
        this.pendingAction = null;
    };

    handleTextareaSubmit = () => {
        this.pendingAction = 'submit';
        findDOMNode(this.textareaAutosizeRef.current).blur();
    };

    handleTextareaAnimationEnd = () => {
        this.handlePendingAction();
    };

    handleCancelMouseDown = () => {
        this.pendingAction = 'cancel';
    };

    handleCancelClick = () => {
        this.pendingAction = 'cancel';
        this.handlePendingAction();
    };

    handleConfirmCancelMouseDown = () => {
        this.pendingAction = 'confirmCancel';
    };

    handleSaveMouseDown = () => {
        this.pendingAction = 'submit';
    };

    handleSaveClick = () => {
        this.pendingAction = 'submit';
        this.handlePendingAction();
    };

    handlePendingAction = () => {
        // If textarea is animating, wait till the animation finishes
        if (this.textareaAutosizeRef.current.isAnimating()) {
            return;
        }

        switch (this.pendingAction) {
        case 'submit': {
            const body = findDOMNode(this.textareaAutosizeRef.current).value;

            !isWhitespace(body) && this.props.onSubmit(body);
            break;
        }
        case 'cancel': {
            this.props.onCancel();
            break;
        }
        case 'confirmCancel': {
            findDOMNode(this.cancelButtonWithConfirmationRef.current).click();
            break;
        }
        default:
        }

        this.pendingAction = null;
    };
}

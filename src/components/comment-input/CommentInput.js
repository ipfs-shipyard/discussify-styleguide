import React, { PureComponent, createRef } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import isWhitespace from 'is-whitespace';
import TextareaAutosize from '../textarea-autosize';
import TextButton from '../text-button';
import { ModalTrigger, ConfirmModal } from '../modal';
import { Author } from '../comment-common';
import FocusManager from './FocusManager';
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
        focusOnMount: PropTypes.bool,
        preloadAvatarImage: PropTypes.bool,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    static defaultProps = {
        focusOnMount: true,
    };

    focusManagerRef = createRef();
    textareaAutosizeRef = createRef();

    constructor(props) {
        super();

        this.state = {
            empty: isBodyEmpty(props.body),
            changed: false,
        };
    }

    render() {
        const { type, body, author, focusOnMount, preloadAvatarImage, onSubmit, onCancel, className, ...rest } = this.props;
        const { empty, changed } = this.state;
        const reply = type === 'reply';

        const ConfirmCancelModal = reply ? ConfirmCancelReplyModal : ConfirmCancelEditModal;

        return (
            <FocusManager ref={ this.focusManagerRef } focusOnMount={ focusOnMount }>
                <div { ...rest } className={ classNames(styles.commentInput, className) }>
                    <TextareaAutosize
                        placeholder={ reply ? 'Reply to this comment...' : '' }
                        ref={ this.textareaAutosizeRef }
                        defaultValue={ body }
                        rows={ reply ? 2 : 1 }
                        maxRows={ 10 }
                        onChange={ this.handleTextareaChange }
                        onTransitionEnd={ this.handleTextareaTransitionEnd }
                        className={ styles.textarea } />

                    <div className={ styles.bottomBar }>
                        <Author
                            author={ author }
                            myself
                            preloadAvatarImage={ preloadAvatarImage }
                            className={ styles.author } />

                        <div className={ styles.actions }>
                            <TextButton
                                onMouseDown={ this.handleActionMouseDown }
                                onClick={ this.handleSubmitClick }
                                disabled={ empty }
                                className={ styles.button }>
                                { reply ? 'Send' : 'Save' }
                            </TextButton>

                            <span className={ styles.separator } />

                            { changed ? (
                                <ModalTrigger modal={ <ConfirmCancelModal onConfirm={ onCancel } /> }>
                                    <TextButton
                                        onMouseDown={ this.handleActionMouseDown }
                                        className={ styles.button }>
                                        Cancel
                                    </TextButton>
                                </ModalTrigger>
                            ) : (
                                <TextButton
                                    onMouseDown={ this.handleActionMouseDown }
                                    onClick={ this.handleCancelClick }
                                    className={ styles.button }>
                                    Cancel
                                </TextButton>
                            ) }
                        </div>
                    </div>
                </div>
            </FocusManager>
        );
    }

    isFocused() {
        return this.focusManagerRef.current ? this.focusManagerRef.current.isFocused() : false;
    }

    focus() {
        this.focusManagerRef.current && this.focusManagerRef.current.focus();
    }

    handleActionMouseDown = (event) => {
        // Since the textarea animates, when the mouseup happens the mouse is no longer within the button
        // Because of that we trigger click() manually after the animation ends
        const textareaNode = findDOMNode(this.textareaAutosizeRef.current);
        const textareaFocused = document.activeElement === textareaNode;

        this.buttonToTriggerClick = textareaFocused ? event.currentTarget : null;
    };

    handleCancelClick = () => {
        if (this.buttonToTriggerClick) {
            return;
        }

        this.props.onCancel();
    };

    handleSubmitClick = () => {
        if (this.buttonToTriggerClick) {
            return;
        }

        const textareaNode = findDOMNode(this.textareaAutosizeRef.current);
        const body = textareaNode.value;

        if (!isWhitespace(body)) {
            this.props.onSubmit(body);
        }
    };

    handleTextareaChange = (event) => {
        const originalBody = this.props.body || '';
        const body = event.target.value;

        this.setState({
            empty: isBodyEmpty(body),
            changed: originalBody !== body,
        });
    };

    handleTextareaTransitionEnd = () => {
        if (!this.buttonToTriggerClick) {
            return;
        }

        const buttonToTriggerClick = this.buttonToTriggerClick;

        this.buttonToTriggerClick = null;
        buttonToTriggerClick.click();
    };
}

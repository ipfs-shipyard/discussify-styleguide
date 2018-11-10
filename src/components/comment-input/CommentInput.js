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

const TEXTAREA_TRANSITION_DURATION = 200; // Update this value if the textarea transition changes in the CSS

const isBodyEmpty = (body) => !body || isWhitespace(body);

export default class CommentInput extends PureComponent {
    static propTypes = {
        body: PropTypes.string,
        author: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        className: PropTypes.string,
    };

    textareaAutosizeRef = createRef();

    constructor(props) {
        super();

        this.state = {
            empty: isBodyEmpty(props.body),
            changed: false,
        };
    }

    componentWillUnmount() {
        clearTimeout(this.triggerActionClickTimeout);
    }

    render() {
        const { body, author, className, onCancel, ...rest } = this.props;
        const { empty, changed } = this.state;
        const replying = !body;

        const cancelConfirmModal = changed && (
            <ConfirmModal
                message={ replying ?
                    'Are you sure you want to cancel your reply?' :
                    'Are you sure you want to discard the changes?' }
                confirmText={ replying ? 'Yes, cancel.' : 'Yes, discard.' }
                cancelText="No, go back."
                onConfirm={ onCancel } />
        );

        return (
            <div { ...rest } className={ classNames(styles.commentInput, className) }>
                <TextareaAutosize
                    placeholder={ replying ? 'Reply to this comment...' : '' }
                    ref={ this.textareaAutosizeRef }
                    defaultValue={ body }
                    maxRows={ 10 }
                    onChange={ this.handleTextareaChange }
                    className={ styles.textarea } />

                <div className={ classNames(styles.bottomBar, className) }>
                    <Author
                        author={ author }
                        myself
                        preloadAvatarImage={ replying }
                        className={ styles.author } />

                    <div className={ styles.actions }>
                        <TextButton
                            onMouseDown={ this.handleActionMouseDown }
                            onClick={ this.handleSubmitClick }
                            disabled={ empty }
                            className={ styles.button }>
                            { replying ? 'Send' : 'Save' }
                        </TextButton>

                        <span className={ styles.separator } />

                        { cancelConfirmModal ? (
                            <ModalTrigger modal={ cancelConfirmModal }>
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
        );
    }

    handleTextareaChange = (event) => {
        const originalBody = this.props.body || '';
        const body = event.target.value;

        this.setState({
            empty: isBodyEmpty(body),
            changed: originalBody !== body,
        });
    };

    handleActionMouseDown = (event) => {
        // Since the textarea animates, when the mouseup happens the mouse is no longer within the button
        // Because of that we trigger click() manually after the animation ends
        const textareaNode = findDOMNode(this.textareaAutosizeRef.current);
        const textareaFocused = document.activeElement === textareaNode;

        if (!textareaFocused) {
            return;
        }

        const button = event.currentTarget;

        clearTimeout(this.triggerActionClickTimeout);
        this.triggerActionClickTimeout = setTimeout(() => {
            this.triggerActionClickTimeout = null;
            document.activeElement === button && button.click();
        }, TEXTAREA_TRANSITION_DURATION);
    };

    handleCancelClick = () => {
        if (this.triggerActionClickTimeout) {
            return;
        }

        this.props.onCancel();
    };

    handleSubmitClick = () => {
        if (this.triggerActionClickTimeout) {
            return;
        }

        const textareaNode = findDOMNode(this.textareaAutosizeRef.current);
        const body = textareaNode.value;

        if (!isWhitespace(body)) {
            this.props.onSubmit(body);
        }
    };
}

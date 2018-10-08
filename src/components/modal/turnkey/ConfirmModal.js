import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../button';
import Modal from '../Modal';
import styles from './ConfirmModal.css';

export default class ConfirmModal extends Component {
    static propTypes = {
        message: PropTypes.string,
        cancelText: PropTypes.string,
        confirmText: PropTypes.string,
        onConfirm: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
        // Props from react-modal
        onAfterOpen: PropTypes.func,
        onRequestClose: PropTypes.func,
        shouldFocusAfterRender: PropTypes.bool,
        className: PropTypes.string,
    };

    static defaultProps = {
        message: 'Are you sure?',
        cancelText: 'No',
        confirmText: 'Yes',
        // Props from react-modal
        shouldFocusAfterRender: true,
    };

    render() {
        const {
            message,
            cancelText,
            confirmText,
            onRequestClose,
            className,
            ...rest
        } = this.props;

        return (
            <Modal
                { ...rest }
                onAfterOpen={ this.handleAfterOpen }
                className={ classNames(styles.confirmModal, className) }>
                <div className={ styles.message }>{ message }</div>

                <div className={ styles.actions }>
                    <Button
                        variant="primary"
                        ref={ this.storePrimaryButtonRef }
                        onClick={ this.handleCancelClick }>
                        { cancelText }
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={ this.handleConfirmClick }>
                        { confirmText }
                    </Button>
                </div>
            </Modal>
        );
    }

    storePrimaryButtonRef = (ref) => {
        this.primaryButton = ref;
    };

    handleAfterOpen = () => {
        this.props.shouldFocusAfterRender && findDOMNode(this.primaryButton).focus();
        this.props.onAfterOpen && this.props.onAfterOpen();
    };

    handleConfirmClick = () => {
        this.props.onConfirm();
        this.props.onRequestClose && this.props.onRequestClose();
    };

    handleCancelClick = () => {
        this.props.onCancel && this.props.onCancel();
        this.props.onRequestClose && this.props.onRequestClose();
    };
}

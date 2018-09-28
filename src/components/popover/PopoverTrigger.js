import React, { Component, cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Manager, Reference } from 'react-popper';

export default class PopoverTrigger extends Component {
    static defaultHoverDelay = 200;

    static propTypes = {
        popover: PropTypes.element,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
    };

    constructor() {
        super();

        this.defaultEventProps = {
            onClick: this.handleOpen,
            onMouseEnter: () => this.handleOpen(PopoverTrigger.defaultHoverDelay),
            onMouseLeave: () => this.handleClose(PopoverTrigger.defaultHoverDelay),
        };
    }

    state = { isOpen: false };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isOpen && !prevState.isOpen) {
            this.props.onOpen && this.props.onOpen();
        } else if (!this.state.isOpen && prevState.isOpen) {
            this.props.onClose && this.props.onClose();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.openCloseTimeoutId);
        cancelAnimationFrame(this.scheduleUpdateRequestId);

        if (this.state.isOpen) {
            this.props.onClose && this.props.onClose();
        }
    }

    render() {
        return (
            <Manager>
                <Reference>{ this.renderReference }</Reference>
                { this.renderPopover() }
            </Manager>
        );
    }

    renderReference = ({ ref }) => {
        this.setReferenceRef = ref;

        const { children: trigger } = this.props;
        const { isOpen } = this.state;

        if (typeof trigger === 'function') {
            const element = trigger({
                isOpen,
                open: this.handleOpen,
                cancelOpen: this.handleCancelOpen,
                close: this.handleClose,
                toggle: this.handleToggle,
                defaultEventProps: this.defaultEventProps,
            });

            return cloneElement(element, { ref: this.storeReferenceRef });
        }

        return cloneElement(trigger, {
            ...this.defaultEventProps,
            ref: this.storeReferenceRef,
        });
    };

    renderPopover = () => {
        const { isOpen } = this.state;
        const { popover } = this.props;

        return cloneElement(popover, {
            ref: this.storePopoverRef,
            isOpen,
            onRequestCancelClose: this.handlePopoverRequestCancelClose,
            onRequestClose: this.handlePopoverRequestClose,
        });
    };

    storeReferenceRef = (ref) => {
        this.referenceNode = findDOMNode(ref);

        this.setReferenceRef && this.setReferenceRef(this.referenceNode);
        this.popover && this.popover.setReferenceNode(this.referenceNode);
    };

    storePopoverRef = (ref) => {
        this.popover = ref;
        this.popover && this.popover.setReferenceNode(this.referenceNode);
    };

    handleOpen = (delay) => {
        clearTimeout(this.openCloseTimeoutId);
        this.pendingClose = false;

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ isOpen: true });
        }, delay);
    };

    handleCancelOpen = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handleClose = (delay) => {
        this.pendingClose = true;
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.pendingClose = false;
            this.setState({ isOpen: false });
        }, delay);
    };

    handleToggle = (delay) => {
        if (this.state.isOpen) {
            this.handleClose(delay);
        } else {
            this.handleOpen(delay);
        }
    };

    handlePopoverRequestCancelClose = () => {
        clearTimeout(this.openCloseTimeoutId);
    };

    handlePopoverRequestClose = (e, reason) => {
        const isMouseLeave = reason === 'mouseLeave';

        // If the reason to close is `mouseLeave`, only close it if there's a pending close
        // We only want to "override" de trigger for `escapePress` / `closeOutside`
        if (isMouseLeave && !this.pendingClose) {
            return;
        }

        this.pendingClose = false;
        clearTimeout(this.openCloseTimeoutId);

        this.openCloseTimeoutId = setTimeout(() => {
            this.setState({ isOpen: false });
        }, isMouseLeave ? PopoverTrigger.defaultHoverDelay : 0);
    };
}

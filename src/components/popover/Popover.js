import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import styles from './Popover.css';

const CLOSE_TRANSITION_DURATION = 250; // Must be 50ms higher than the actual CSS duration

export default class Popover extends Component {
    static propTypes = {
        placement: PropTypes.oneOf(['auto', 'top', 'right', 'bottom', 'left']),
        shouldCloseOnEsc: PropTypes.bool,
        shouldCloseOnOutsideClick: PropTypes.bool,
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        children: PropTypes.node.isRequired,
        style: PropTypes.object,
        // The properties below are "private"
        isOpen: PropTypes.bool,
        onRequestCancelClose: PropTypes.func,
        onRequestClose: PropTypes.func,
    };

    static defaultProps = {
        placement: 'auto',
        shouldCloseOnEsc: true,
        shouldCloseOnOutsideClick: true,
    };

    componentDidMount() {
        if (this.props.isOpen) {
            this.addEscapeOutsideListeners();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            if (this.props.isOpen) {
                this.addEscapeOutsideListeners();
            } else {
                this.removeEscapeOutsideListeners();
            }
        }
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.scheduleUpdateRequestId);
        this.removeEscapeOutsideListeners();
    }

    setReferenceRef(ref) {
        this.referenceNode = ref;
    }

    render() {
        const { placement, isOpen } = this.props;

        return (
            <CSSTransition
                in={ isOpen }
                mountOnEnter
                unmountOnExit
                timeout={ CLOSE_TRANSITION_DURATION }
                classNames={ {
                    enterActive: styles.enterActive,
                    enterDone: styles.enterDone,
                    exit: styles.exit,
                } }>
                <Popper placement={ placement }>{ this.renderPopper }</Popper>
            </CSSTransition>
        );
    }

    renderPopper = ({ ref, style, placement, arrowProps, scheduleUpdate }) => {
        // Fix arrow not being positioned correctly in first render
        // See: https://github.com/FezVrasta/react-popper/issues/88
        if (!scheduleUpdate._forced) {
            cancelAnimationFrame(this.scheduleUpdateRequestId);
            this.scheduleUpdateRequestId = requestAnimationFrame(() => scheduleUpdate());

            scheduleUpdate._forced = true;
        }

        const {
            isOpen,
            className,
            contentClassName,
            onRequestCancelClose,
            onRequestClose,
            shouldCloseOnEsc,
            shouldCloseOnOutsideClick,
            children,
            style: styleProp,
            ...rest
        } = this.props;

        return (
            <div
                { ...rest }
                ref={ ref }
                style={ { ...style, ...styleProp } }
                className={ classNames(styles.popover, className) }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                data-placement={ placement }>

                <div className={ styles.container }>
                    <div ref={ this.storeBoxRef } className={ styles.box }>
                        <div className={ classNames(styles.popoverContent, contentClassName) }>{ children }</div>
                    </div>

                    <div ref={ arrowProps.ref } className={ styles.arrow } style={ arrowProps.style } />
                </div>
            </div>
        );
    };

    storeBoxRef= (ref) => {
        this.boxNode = ref;
    };

    addEscapeOutsideListeners() {
        const { shouldCloseOnOutsideClick, shouldCloseOnEsc } = this.props;

        if (shouldCloseOnOutsideClick) {
            document.addEventListener('mousedown', this.handleMouseDown);
            document.addEventListener('mouseup', this.handleMouseUp);
            document.addEventListener('touchstart', this.handleMouseDown);
            document.addEventListener('touchend', this.handleMouseUp);
        }

        if (shouldCloseOnEsc) {
            document.addEventListener('keyup', this.handleKeyUp);
        }
    }

    removeEscapeOutsideListeners() {
        document.removeEventListener('mousedown', this.handleMouseDown);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('touchstart', this.handleMouseDown);
        document.removeEventListener('touchend', this.handleMouseUp);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleMouseEnter = (e) => {
        this.props.onRequestCancelClose && this.props.onRequestCancelClose(e, 'mouseEnter');
    };

    handleMouseLeave = (e) => {
        // If user is selecting text, skip any check!
        if (!this.mouseDownEventTarget) {
            this.props.onRequestClose && this.props.onRequestClose(e, 'mouseLeave');
        }
    };

    handleKeyUp = (e) => {
        if (e.keyCode === 27) {
            this.props.onRequestClose && this.props.onRequestClose(e, 'escapePress');
        }
    };

    handleMouseDown = (e) => {
        this.mouseDownEventTarget = e.target;
    };

    handleMouseUp = (e) => {
        // Use also mouse down event because user might be selecting text and accidently left the popover
        const target = this.mouseDownEventTarget || e.target;

        this.mouseDownEventTarget = undefined;

        // Check if we clicked outside of the popover AND outside the reference as well
        const isOutsideBox = !this.boxNode || !this.boxNode.contains(target);
        const isOutsideReference = !this.referenceNode || !this.referenceNode.contains(target);

        if (isOutsideBox && isOutsideReference) {
            this.props.onRequestClose && this.props.onRequestClose(e, 'clickOutside');
        }
    };
}

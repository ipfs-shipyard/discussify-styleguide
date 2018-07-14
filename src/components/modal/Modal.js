import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactModal from 'react-modal';
import styles from './Modal.css';

const CLOSE_TRANSITION_DURATION = 250; // Must be 50ms higher than the actual CSS duration

const computeClassName = (className, classNameProp) => {
    if (classNameProp) {
        if (classNameProp === 'string') {
            className.base = classNames(className.base, className);
        } else {
            className.base = classNames(className.base, classNameProp.base);
            className.base = classNames(className.base, classNameProp.afterOpen);
            className.base = classNames(className.base, classNameProp.beforeClose);
        }
    }

    return className;
};

export default class Modal extends Component {
    static propTypes = {
        className: PropTypes.string,
        contentClassName: PropTypes.string,
        overlayClassName: PropTypes.string,
        portalClassName: PropTypes.string,
        bodyOpenClassName: PropTypes.string,
        children: PropTypes.node.isRequired,
    };

    static setAppElement = (el) => ReactModal.setAppElement(el);

    render() {
        const {
            className,
            contentClassName,
            overlayClassName,
            portalClassName,
            bodyOpenClassName,
            children,
            ...rest
        } = this.props;
        const finalClassName = computeClassName({
            base: styles.modal,
            afterOpen: styles.afterOpen,
            beforeClose: styles.beforeClose,
        }, className);
        const finalOverlayClassName = computeClassName({
            base: styles.modalOverlay,
            afterOpen: styles.afterOpen,
            beforeClose: styles.beforeClose,
        }, overlayClassName);

        return (
            <ReactModal
                closeTimeoutMS={ CLOSE_TRANSITION_DURATION }
                { ...rest }
                className={ finalClassName }
                overlayClassName={ finalOverlayClassName }
                portalClassName={ classNames(styles.modalPortal, portalClassName) }
                bodyOpenClassName={ classNames(styles.modalBodyOpen, bodyOpenClassName) }>
                <div className={ classNames(styles.content, contentClassName) }>
                    { children }
                </div>
            </ReactModal>
        );
    }
}

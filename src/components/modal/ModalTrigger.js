import React, { Component, Fragment, cloneElement } from 'react';
import PropTypes from 'prop-types';

export default class ModalTrigger extends Component {
    static propTypes = {
        modal: PropTypes.element.isRequired,
        children: PropTypes.func.isRequired,
    };

    state = { isOpen: false };

    render() {
        const { children: trigger, modal } = this.props;
        const { isOpen } = this.state;

        return (
            <Fragment>
                { trigger({
                    isOpen,
                    open: this.handleOpen,
                    close: this.handleClose,
                    toggle: this.handleToggle,
                }) }
                { cloneElement(modal, {
                    isOpen,
                    onRequestClose: this.handleClose,
                }) }
            </Fragment>
        );
    }

    handleOpen = () => this.setState({ isOpen: true });

    handleClose = () => this.setState({ isOpen: false });

    handleToggle = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
}

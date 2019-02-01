import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './FadeTransition.css';

export default class FadeTransition extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        duration: PropTypes.number,
        animateOnMount: PropTypes.bool,
        animateOnUnmount: PropTypes.bool,
        triggerUnmount: PropTypes.bool,
        onAnimationEnd: PropTypes.func,
    };

    static defaultProps = {
        duration: 300,
    };

    static classes = {
        appear: styles.enter,
        appearActive: styles.enterActive,
        enter: styles.enter,
        enterActive: styles.enterActive,
        enterDone: styles.enterDone,
        exit: styles.exit,
        exitActive: styles.exitActive,
    };

    render() {
        const { children, duration, animateOnMount, triggerUnmount } = this.props;

        return (
            <CSSTransition
                mountOnEnter
                appear={ animateOnMount }
                in={ triggerUnmount }
                classNames={ FadeTransition.classes }
                timeout={ duration }
                onEntered={ this.handleOnEntered }
                onExit={ this.handleOnExit }
                onExited={ this.handleOnExited }>
                { children }
            </CSSTransition>
        );
    }

    handleOnEntered = () => this.props.onAnimationEnd(false);

    handleOnExit = () => !this.props.animateOnUnmount && this.props.onAnimationEnd(true);

    handleOnExited = () => this.props.onAnimationEnd(true);
}

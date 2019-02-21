import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import styles from './FadeTransition.css';

const ANIMATION_DURATION = 300;

export default class FadeTransition extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        animateOnMount: PropTypes.bool,
        animateOnUnmount: PropTypes.bool,
        in: PropTypes.bool,
        onAnimationEnd: PropTypes.func,
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
        const { children, animateOnMount, in: in_ } = this.props;

        return (
            <CSSTransition
                mountOnEnter
                appear={ animateOnMount }
                in={ in_ }
                classNames={ FadeTransition.classes }
                timeout={ ANIMATION_DURATION }
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

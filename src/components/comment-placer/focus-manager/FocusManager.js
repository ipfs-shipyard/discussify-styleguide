import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import Observer from '@researchgate/react-intersection-observer';

import styles from './FocusManager.css';

export default class FocusManager extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.node,
        ]).isRequired,
        scrollIntoView: PropTypes.func.isRequired,
        renderImmediately: PropTypes.bool,
        mountAnimationCompleted: PropTypes.bool,
        autofocus: PropTypes.bool,
        className: PropTypes.string,
    };

    state = {
        totallyInView: null,
        inView: null,
    };

    componentDidMount() {
        this.shouldFocusAfterAnimation = true;
    }

    componentDidUpdate() {
        const mustFocusAfterAnimation = this.props.mountAnimationCompleted && this.state.totallyInView && this.shouldFocusAfterAnimation;

        this.focusTimeout = mustFocusAfterAnimation ?
            setTimeout(this.focus, 100) :
            null;
    }

    componentWillUnmount() {
        clearTimeout(this.focusTimeout);
    }

    render() {
        const { renderImmediately, className } = this.props;
        const { totallyInView, inView } = this.state;
        const containerClasses = classNames(styles.container, {
            [styles.scaledDown]: inView === false,
        });

        return (
            <Observer
                threshold={ [0, 1] }
                onChange={ this.handleObserverChange }>
                <div className={ classNames(containerClasses, className) }>
                    { !renderImmediately && totallyInView != null && this.renderChildren() }
                    { renderImmediately && this.renderChildren() }
                </div>
            </Observer>
        );
    }

    renderChildren() {
        const { children } = this.props;
        const { totallyInView, inView } = this.state;

        return typeof children === 'function' ? children({ inView, totallyInView }) : children;
    }

    isFocused = () => (document.activeElement && document.activeElement === this.getTextareaNode());

    focus = () => {
        this.shouldFocusAfterAnimation = false;
        this.focusTextarea();
    };

    getTextareaNode() {
        const node = findDOMNode(this);
        const textareaNode = node && node.querySelector('textarea');

        return textareaNode;
    }

    focusTextarea() {
        const textareaNode = this.getTextareaNode();

        if (textareaNode) {
            textareaNode.focus();
        }
    }

    scrollIntoViewWhenFocused = () => {
        if (!this.state.totallyInView && this.isFocused() && this.props.autofocus) {
            this.props.scrollIntoView();
        }
    };

    handleObserverChange = ({ isIntersecting, intersectionRatio }) => {
        this.setState({
            totallyInView: isIntersecting && intersectionRatio >= 1,
            inView: isIntersecting,
        }, () => {
            this.scrollIntoViewWhenFocused();
        });
    };
}

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
        mountAnimationCompleted: PropTypes.bool,
        autofocus: PropTypes.bool,
        className: PropTypes.string,
    };

    state = {
        totallyInView: undefined,
        inView: true,
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
        const { children, className } = this.props;
        const { totallyInView, inView } = this.state;
        const containerClasses = classNames(styles.container, {
            [styles.scaledDown]: !inView,
        });
        const isChildrenFunction = typeof children === 'function';

        return (
            <Observer
                threshold={ [0, 1] }
                onChange={ this.handleObserverChange }>
                <div className={ classNames(containerClasses, className) }>
                    { typeof totallyInView !== 'undefined' && (
                        isChildrenFunction ? children(totallyInView) : children
                    ) }
                </div>
            </Observer>
        );
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

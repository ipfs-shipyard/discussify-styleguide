import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Observer from '@researchgate/react-intersection-observer';

const FOCUS_WHEN_IN_VIEW_MAX_WAIT = 10000;

export default class FocusManager extends Component {
    static propTypes = {
        focusOnMount: PropTypes.bool,
        children: PropTypes.element.isRequired,
    };

    state = {
        inView: false,
    };

    componentDidMount() {
        if (this.props.focusOnMount) {
            this.focus();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.focusTimeout);
    }

    render() {
        const { children } = this.props;

        return (
            <Observer
                threshold={ 1 }
                onChange={ this.handleObserverChange }>
                { children }
            </Observer>
        );
    }

    isFocused() {
        return document.activeElement && document.activeElement === this.getTextareaNode();
    }

    focus() {
        const { inView } = this.state;

        if (!inView) {
            this.markToFocusWhenInView();
            this.scrollIntoView();
        } else {
            this.cancelFocusWhenInView();
            this.focusTextarea();
        }
    }

    getTextareaNode() {
        const node = findDOMNode(this);
        const textareaNode = node && node.querySelector('textarea');

        return textareaNode;
    }

    scrollIntoView() {
        const node = findDOMNode(this);

        if (node) {
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }

    focusTextarea() {
        const textareaNode = this.getTextareaNode();

        if (textareaNode) {
            textareaNode.focus();
        }
    }

    shouldFocusWhenInView() {
        return !!this.resetFocusWhenInViewTimeout;
    }

    markToFocusWhenInView() {
        clearTimeout(this.resetFocusWhenInViewTimeout);
        this.resetFocusWhenInViewTimeout = setTimeout(() => {
            this.resetFocusWhenInViewTimeout = null;
        }, FOCUS_WHEN_IN_VIEW_MAX_WAIT);
    }

    cancelFocusWhenInView() {
        clearTimeout(this.resetFocusWhenInViewTimeout);
        this.resetFocusWhenInViewTimeout = null;
    }

    handleObserverChange = ({ isIntersecting: inView }) => {
        this.setState({ inView });

        if (inView) {
            if (this.shouldFocusWhenInView()) {
                this.cancelFocusWhenInView();
                this.focusTextarea();
            }
        // Keep the textarea in the viewport if it's focused
        } else if (this.isFocused()) {
            this.scrollIntoView();
        }
    };
}

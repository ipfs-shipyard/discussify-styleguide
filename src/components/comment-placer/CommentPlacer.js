import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import FocusManager from './focus-manager';
import FadeAndGrowTransition from './fade-and-grow-transition';
import FadeTransition from './fade-transition';

export default class CommentPlacer extends Component {
    static propTypes = {
        animateOnMount: PropTypes.bool,
        animateOnUnmount: PropTypes.bool,
        scrollOnMount: PropTypes.bool,
        autofocus: PropTypes.bool,
        children: PropTypes.element.isRequired,
        animation: PropTypes.oneOf(['fade', 'fade-and-grow']),
        className: PropTypes.string,
    };

    static defaultProps = {
        animateOnMount: false,
        animateOnUnmount: false,
        scrollOnMount: false,
        autofocus: false,
        animation: 'fade',
    };

    static getDerivedStateFromProps(props, state) {
        if (props.children) {
            // Store children on state object if children passed as prop is defined
            return {
                animation: props.animation,
                children: props.children,
            };
        } else if (state.children) {
            if (props.animation !== state.animation) {
                return {
                    animation: props.animation,
                    animationHasChanged: true,
                };
            }

            // If children passed as prop is not defined and the previous state has stored children
            // it means the component was already mounted and we must unmount it
            return {
                in: false,
            };
        }

        return null;
    }

    state = {
        animation: null,
        children: null,
        in: true,
        mountAnimationCompleted: false,
        animationHasChanged: false,
    };

    getSnapshotBeforeUpdate() {
        if (this.state.animationHasChanged) {
            this.textareaValue = this.getTextareaValue();
        }

        return null;
    }

    componentDidUpdate() {
        const { animationHasChanged, in: in_ } = this.state;

        // Reset animationHasChanged so that component can unmount normally
        if (animationHasChanged && !this.props.children && in_) {
            this.setTextareaValue(this.textareaValue);
            this.setState({
                animationHasChanged: false,
            });
        }
    }

    render() {
        const { animateOnMount, autofocus, className } = this.props;
        const { children, mountAnimationCompleted } = this.state;

        return (
            <Fragment>
                { children && (
                    <FocusManager
                        scrollIntoView={ this.scrollIntoView }
                        autofocus={ autofocus }
                        renderImmediately={ !animateOnMount }
                        mountAnimationCompleted={ mountAnimationCompleted }
                        className={ className }>
                        { this.renderAnimationComponent() }
                    </FocusManager>
                ) }
            </Fragment>
        );
    }

    renderAnimationComponent = () => {
        const { animation } = this.props;

        return animation === 'fade-and-grow' ?
            this.renderFadeAndGrow() :
            this.renderFade();
    };

    renderFadeAndGrow = () => {
        const { animateOnMount, animateOnUnmount } = this.props;
        const { in: in_, children } = this.state;

        return (
            ({ totallyInView }) => (
                <FadeAndGrowTransition
                    animateOnMount={ animateOnMount && totallyInView }
                    animateOnUnmount={ animateOnUnmount }
                    in={ in_ }
                    onAnimationEnd={ this.handleAnimationEnd }>
                    { children }
                </FadeAndGrowTransition>
            )
        );
    };

    renderFade = () => {
        const { in: in_, children, animationHasChanged } = this.state;
        const { animateOnMount, animateOnUnmount } = this.props;

        return (
            <FadeTransition
                animateOnMount={ animationHasChanged ? false : animateOnMount }
                animateOnUnmount={ animateOnUnmount }
                in={ animationHasChanged ? true : in_ }
                onAnimationEnd={ this.handleAnimationEnd }>
                { children }
            </FadeTransition>
        );
    };

    resetState = () => {
        this.setState({
            animation: null,
            children: null,
            in: true,
            mountAnimationCompleted: false,
            animationHasChanged: false,
        });
    };

    getTextareaValue = () => {
        const textarea = findDOMNode(this).querySelector('textarea');

        return textarea && textarea.value;
    };

    setTextareaValue = (value) => {
        const textarea = findDOMNode(this).querySelector('textarea');

        if (textarea) {
            textarea.value = value;
        }
    };

    scrollIntoView = (elem) => {
        const node = elem ? elem : findDOMNode(this);

        if (node) {
            node.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    };

    handleAnimationEnd = (isUnmounting) => {
        // When animation-out ends, state object must be reset to its initial value
        // When animation-in ends, a scroll into view must happen if needed
        if (isUnmounting) {
            this.resetState();
        } else {
            this.setState({ mountAnimationCompleted: true }, () => {
                if (this.props.scrollOnMount) {
                    this.scrollIntoView();
                }
            });
        }
    };
}

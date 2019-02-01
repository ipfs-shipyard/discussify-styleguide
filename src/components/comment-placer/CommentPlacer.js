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
        animation: PropTypes.oneOf(['fade', 'fade-and-grow']).isRequired,
        className: PropTypes.string,
        listHasScroll: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        animateOnMount: false,
        animateOnUnmount: false,
        scrollOnMount: false,
        autofocus: false,
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
                triggerUnmount: true,
            };
        }

        return null;
    }

    state = {
        animation: null,
        children: null,
        triggerUnmount: false,
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
        const { animationHasChanged, triggerUnmount } = this.state;

        // Reset animationHasChanged so that component can unmount normally
        if (animationHasChanged && !this.props.children && !triggerUnmount) {
            this.setTextareaValue(this.textareaValue);
            this.setState({
                animationHasChanged: false,
            });
        }
    }

    render() {
        const { autofocus, className } = this.props;
        const { children, mountAnimationCompleted } = this.state;

        return (
            <Fragment>
                { children && (
                    <FocusManager
                        scrollIntoView={ this.scrollIntoView }
                        autofocus={ autofocus }
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
        const { animateOnMount, animateOnUnmount, listHasScroll } = this.props;
        const { triggerUnmount, children } = this.state;

        return (
            (inView) => (
                <FadeAndGrowTransition
                    animateOnMount={ animateOnMount && (!listHasScroll || inView) }
                    animateOnUnmount={ animateOnUnmount }
                    triggerUnmount={ triggerUnmount }
                    onAnimationEnd={ this.handleAnimationEnd }>
                    { children }
                </FadeAndGrowTransition>
            )
        );
    };

    renderFade = () => {
        const { triggerUnmount, children, animationHasChanged } = this.state;
        const { animateOnMount, animateOnUnmount } = this.props;

        return (
            <FadeTransition
                animateOnMount={ animationHasChanged ? false : animateOnMount }
                animateOnUnmount={ animateOnUnmount }
                triggerUnmount={ animationHasChanged ? true : !triggerUnmount }
                onAnimationEnd={ this.handleAnimationEnd }>
                { children }
            </FadeTransition>
        );
    };

    resetState = () => {
        this.setState({
            animation: null,
            children: null,
            triggerUnmount: false,
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

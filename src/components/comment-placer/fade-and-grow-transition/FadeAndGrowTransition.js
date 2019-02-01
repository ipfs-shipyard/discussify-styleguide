import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';

export default class FadeAndGrowTransition extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        duration: PropTypes.number,
        animateOnMount: PropTypes.bool,
        animateOnUnmount: PropTypes.bool,
        triggerUnmount: PropTypes.bool,
        onAnimationEnd: PropTypes.func,
    };

    static defaultProps = {
        duration: 300,
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.isMounted) {
            if (props.animateOnMount) {
                return {
                    willAnimate: true,
                };
            }

            return {
                willAnimate: false,
            };
        }
        if (props.triggerUnmount) {
            return {
                willAnimate: props.animateOnUnmount,
            };
        }

        return null;
    }

    state = {
        willAnimate: undefined,
        isMounted: false,
    };

    componentDidMount() {
        this.setState({
            willAnimate: false,
            isMounted: true,
        });
    }

    componentDidUpdate = (_, prevState) => {
        // Simulate animationEnd to scroll to element when animationOnMmount is set to 'false'
        if ((this.state.isMounted !== prevState.isMounted) && !this.props.animateOnMount) {
            this.simulateAnimationEnd(false);
        }
        // Simulate animationEnd to reset parent state when animationOnUnmount is set to 'false'
        if (this.props.triggerUnmount && !this.state.willAnimate) {
            this.simulateAnimationEnd(true);
        }
    };

    render() {
        const { children, duration } = this.props;
        const { willAnimate } = this.state;

        return (
            <AnimateHeight
                height={ willAnimate ? 0 : 'auto' }
                duration={ duration }
                animateOpacity
                onAnimationEnd={ this.handleAnimationEnd }>
                { children }
            </AnimateHeight>
        );
    }

    simulateAnimationEnd = (isUnmounting) => {
        this.props.onAnimationEnd(isUnmounting);
    };

    handleAnimationEnd = (element) => {
        const isUnmounting = element.newHeight === 0;

        this.props.onAnimationEnd(isUnmounting);
    };
}

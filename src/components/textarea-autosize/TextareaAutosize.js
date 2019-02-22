import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isRequiredIf } from 'prop-type-conditionals';
import growElementFn from '@moxy/grow-element-fn';
import { debounce } from 'lodash';
import styles from './TextareaAutosize.css';

const ANIMATION_DURATION = 250;

export default class TextareaAutosize extends Component {
    static propTypes = {
        rows: PropTypes.number,
        maxRows: PropTypes.number,
        animate: PropTypes.bool,
        submitOnEnter: PropTypes.bool,
        onSubmit: isRequiredIf((props) => props.submitOnEnter, PropTypes.func),
        onAnimationEnd: PropTypes.func,
        onTransitionEnd: PropTypes.func,
        onFocus: PropTypes.func,
        onKeyDown: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        rows: 1,
        animate: true,
        submitOnEnter: false,
    };

    textareaRef = createRef();
    animating = false;
    focused = false;

    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate() {
        this.updateSize();
    }

    componentWillUnmount() {
        clearTimeout(this.resetAnimatingTimeout);
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { className, maxRows, animate, submitOnEnter, onSubmit, ...rest } = this.props;
        const finalClassName = classNames(styles.textareaAutosize, animate && styles.animate, className);

        return (
            <textarea
                { ...rest }
                ref={ this.textareaRef }
                onTransitionEnd={ this.handleTransitionEnd }
                onKeyDown={ this.handleKeyDown }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                onChange={ this.handleChange }
                className={ finalClassName } />
        );
    }

    focus() {
        this.textareaRef.current && this.textareaRef.current.focus();
    }

    blur() {
        this.textareaRef.current && this.textareaRef.current.blur();
    }

    isAnimating() {
        return this.animating;
    }

    getValue() {
        return this.textareaRef.current ? this.textareaRef.current.value : null;
    }

    updateSize() {
        this.animating = true;

        // Start a timer in case height will not change by `growElementFn`
        // This ensures that `animating` is reseted and `props.onAnimationEnd` is called
        clearTimeout(this.resetAnimatingTimeout);
        this.resetAnimatingTimeout = setTimeout(this.handleAnimationEnd, ANIMATION_DURATION);

        growElementFn({
            el: this.textareaRef.current,
            minLines: this.props.rows,
            maxLines: this.props.maxRows,
            extraLine: this.focused,
        });
    }

    handleKeyDown = (event) => {
        this.props.onKeyDown && this.props.onKeyDown(event);

        if (event.defaultPrevented || !this.props.submitOnEnter) {
            return;
        }

        // Create new comments when pressing enter without shift
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            this.props.onSubmit();
        }
    };

    handleFocus = (event) => {
        this.focused = true;
        this.updateSize();
        this.props.onFocus && this.props.onFocus(event);
    };

    handleBlur = (event) => {
        this.focused = false;
        this.updateSize();
        this.props.onBlur && this.props.onBlur(event);
    };

    handleChange = (event) => {
        this.updateSize();
        this.props.onChange && this.props.onChange(event);
    };

    handleTransitionEnd = (event) => {
        this.props.onTransitionEnd && this.props.onTransitionEnd(event);
        this.handleAnimationEnd();
    };

    handleAnimationEnd = () => {
        this.animating = false;
        clearTimeout(this.resetAnimatingTimeout);
        this.props.onAnimationEnd && this.props.onAnimationEnd();
    };

    handleResize = debounce(() => this.updateSize(), 500);
}

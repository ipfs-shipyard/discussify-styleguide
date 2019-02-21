import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isRequiredIf } from 'prop-type-conditionals';
import growElementFn from '@moxy/grow-element-fn';
import { debounce } from 'lodash';
import styles from './TextareaAutosize.css';

export default class TextareaAutosize extends Component {
    static propTypes = {
        rows: PropTypes.number,
        maxRows: PropTypes.number,
        animate: PropTypes.bool,
        submitOnEnter: PropTypes.bool,
        onSubmit: isRequiredIf((props) => props.submitOnEnter, PropTypes.func),
        onFocus: PropTypes.func,
        onKeyPress: PropTypes.func,
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

    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', this.handleResize);
    }

    componentDidUpdate() {
        this.updateSize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { className, maxRows, animate, submitOnEnter, onSubmit, ...rest } = this.props;
        const finalClassName = classNames(styles.textareaAutosize, animate && styles.animate, className);

        return (
            <textarea
                { ...rest }
                ref={ this.textareaRef }
                onKeyPress={ this.handleKeyPress }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                onChange={ this.handleChange }
                className={ finalClassName } />
        );
    }

    updateSize() {
        growElementFn({
            el: this.textareaRef.current,
            minLines: this.props.rows,
            maxLines: this.props.maxRows,
            extraLine: this.focused,
        });
    }

    handleKeyPress = (event) => {
        this.props.onKeyPress && this.props.onKeyPress(event);

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

    handleResize = debounce(() => this.updateSize(), 500);
}

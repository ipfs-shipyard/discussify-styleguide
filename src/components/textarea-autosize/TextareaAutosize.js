import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import growElementFn from '@moxy/grow-element-fn';
import { debounce } from 'lodash';
import styles from './TextareaAutosize.css';

export default class TextareaAutosize extends Component {
    static propTypes = {
        rows: PropTypes.number,
        maxRows: PropTypes.number,
        animate: PropTypes.bool,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        rows: 1,
        animate: true,
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
        const { className, maxRows, animate, ...rest } = this.props;
        const finalClassName = classNames(styles.textareaAutosize, animate && styles.animate, className);

        return (
            <textarea
                { ...rest }
                ref={ this.textareaRef }
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

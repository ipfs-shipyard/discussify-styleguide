import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CheckmarkIcon, CrossmarkIcon } from '../icon';
import ProgressBar from './ProgressBar';
import styles from './Button.css';

const FEEDBACK_OUTCOME_VISIBLE_DURATION = 1750;

export default class Button extends Component {
    static propTypes = {
        variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
        fullWidth: PropTypes.bool,
        disabled: PropTypes.bool,
        feedback: PropTypes.oneOf(['loading', 'success', 'error']),
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
    };

    state = {};

    componentDidMount() {
        this.maybeHandleFeedbackChange();
    }

    componentDidUpdate(prevProps) {
        this.maybeHandleFeedbackChange(prevProps.feedback);
    }

    componentWillUnmount() {
        this.clearFeedbackOutcomeTimers();
    }

    render() {
        const { variant, fullWidth, children, className, disabled, ...rest } = this.props;
        const { feedback, feedbackOutcome } = this.state;
        const loading = feedback === 'loading';
        const finalDisabled = disabled || loading;
        const finalClassName = classNames(
            styles.button,
            styles[variant],
            loading && styles.loading,
            styles[feedbackOutcome],
            fullWidth && styles.fullWidth,
            className
        );

        return (
            <button { ...rest } disabled={ finalDisabled } className={ finalClassName }>
                <span className={ styles.textBlock }>{ children }</span>

                <ProgressBar
                    running={ loading }
                    className={ styles.progressBar }
                    onBegin={ this.handleProgressBarBegin }
                    onEnd={ this.handleProgressBarEnd } />

                <span className={ styles.successBlock }>
                    <CheckmarkIcon className={ styles.feedbackIcon } />
                </span>
                <span className={ styles.errorBlock }>
                    <CrossmarkIcon className={ styles.feedbackIcon } />
                </span>
            </button>
        );
    }

    maybeHandleFeedbackChange(prevFeedback) {
        const { feedback } = this.props;

        // Skip if `feedback` hasn't changed
        if (feedback === prevFeedback) {
            return;
        }

        // If feedback prop changed to `success` or `error` without passing through `loading`,
        // force the intermidate `loading` state
        if ((feedback === 'success' || feedback === 'error') && this.state.feedback !== 'loading') {
            this.setState({ feedback: 'loading' }, () => {
                this.setState({ feedback });
            });
        // Otherwise, simply copy the feedback to the state
        } else {
            this.setState({ feedback });
        }
    }

    clearFeedbackOutcomeTimers() {
        clearTimeout(this.resetFeedbackOutcomeTimeoutId);
    }

    handleProgressBarBegin = () => {
        this.clearFeedbackOutcomeTimers();
        this.setState({ feedbackOutcome: undefined });
    };

    handleProgressBarEnd = () => {
        const { feedback } = this.props;

        this.clearFeedbackOutcomeTimers();
        this.setState({ feedbackOutcome: feedback }, () => {
            this.clearFeedbackOutcomeTimers();
            this.resetFeedbackOutcomeTimeoutId = setTimeout(() => {
                this.setState({ feedbackOutcome: undefined });
            }, FEEDBACK_OUTCOME_VISIBLE_DURATION);
        });
    };
}

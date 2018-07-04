import React from 'react';
import PropTypes from 'prop-types';
import JavascriptTimeAgo from 'javascript-time-ago';
import timeAgoEn from 'javascript-time-ago/locale/en';
import { TimeAgo as BaseTimeAgo } from 'react-time-ago';
import toDateInstance from './date';
import getStyleForFormat from './formats';

JavascriptTimeAgo.locale(timeAgoEn);

const TimeAgo = ({ date, format, ...rest }) => {
    date = toDateInstance(date);

    // Invalid date?
    if (!date) {
        return <span>n/a</span>;
    }

    /* eslint-disable react/jsx-no-bind */
    return (
        <BaseTimeAgo { ...rest } locale="en-US" timeStyle={ getStyleForFormat(format) }>
            { date }
        </BaseTimeAgo>
    );
    /* eslint-enable react/jsx-no-bind */
};

TimeAgo.propTypes = {
    date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]),
    format: PropTypes.oneOf(['long', 'short', 'tiny']),
};

TimeAgo.defaultProps = {
    format: 'long',
};

// Remove once https://github.com/catamphetamine/javascript-time-ago/issues/11 is fixed
BaseTimeAgo.propTypes = null;

export default TimeAgo;

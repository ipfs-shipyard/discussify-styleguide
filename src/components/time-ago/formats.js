import { canonical, day, hour, getStep, getDate } from 'javascript-time-ago/modules/gradation';
import { intlDateTimeFormatSupported } from 'javascript-time-ago';

const intlFormatters = {};

const gradation = [
    // Now
    {
        factor: 1,
        unit: 'now',
    },
    // Minutes
    {
        ...getStep(canonical, 'minute'),
        threshold: 45,
    },
    // Hours
    getStep(canonical, 'hour'),
    // If `date` and `now` happened the same year, then only output month and day
    {
        threshold: day - (0.5 * hour),
        format(value, locale) {
            // Can we use `Intl.DateTimeFormat`? Ifo not, default to using relative time
            if (!intlDateTimeFormatSupported()) {
                return;
            }

            if (!intlFormatters[locale]) {
                intlFormatters[locale] = {};
            }

            if (!intlFormatters[locale].thisYear) {
                // "Apr 11" (MMMd)
                intlFormatters[locale].thisYear = new Intl.DateTimeFormat(locale, {
                    month: 'short',
                    day: 'numeric',
                });
            }

            // Output month and day
            return intlFormatters[locale].thisYear.format(getDate(value));
        },
    },
    // If `date` and `now` happened in defferent years, then output day, month and year.
    {
        threshold(now) {
            // Jan 1st of the next year.
            const nextYear = new Date(new Date(now).getFullYear() + 1, 0);

            return (nextYear.getTime() - now) / 1000;
        },
        format(value, locale) {
            // Can we use `Intl.DateTimeFormat`? Ifo not, default to using relative time
            if (!intlDateTimeFormatSupported()) {
                return;
            }
            if (!intlFormatters[locale]) {
                intlFormatters[locale] = {};
            }

            /* istanbul ignore else */
            if (!intlFormatters[locale].other) {
                // "Apr 11, 2017" (yMMMd)
                intlFormatters[locale].other = new Intl.DateTimeFormat(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                });
            }

            // Output day, month and year.
            return intlFormatters[locale].other.format(getDate(value));
        },
    },
];

const formats = {
    long: {
        gradation,
        flavour: ['long_convenient', 'long'],
    },
    short: {
        gradation,
        flavour: 'long_time',
    },
    tiny: {
        gradation,
        flavour: ['tiny', 'short_time', 'narrow', 'short'],
    },
};

const getStyleForFormat = (format) => formats[format];

export default getStyleForFormat;

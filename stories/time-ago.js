import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, date, selectV2 } from '@storybook/addon-knobs';
import { TimeAgo } from '../src';
import readme from '../src/components/time-ago/README.md';

const renderItem = (date, format) => (
    <li>
        <code>{ (new Date(date).toLocaleString()) }</code>
        { ' ' }becomes{ ' ' }
        <code><TimeAgo date={ date } format={ format } /></code>
    </li>
);

const renderList = (format) => (
    <ul>
        { renderItem(Date.now(), format) }
        { renderItem(Date.now() - (5 * 60 * 1000), format) }
        { renderItem(Date.now() - (5 * 60 * 60 * 1000), format) }
        { renderItem(Date.now() - (24 * 60 * 60 * 1000), format) }
        { renderItem(Date.now() - (5 * 24 * 60 * 60 * 1000), format) }
        { renderItem(Date.now() - (12 * 31 * 24 * 60 * 60 * 1000), format) }
        { renderItem('foo', format) }
    </ul>
);

storiesOf('TimeAgo', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Long (default)', () => renderList('long'))
.add('Short', () => renderList('short'))
.add('Tiny', () => renderList('tiny'))
.add('Knobs playground ⚽', () => {
    const format = selectV2('format', ['long', 'short', 'tiny'], 'long');
    const date_ = date('date', new Date(1530652512026));

    return <TimeAgo name={ name } date={ date_ } format={ format } />;
});

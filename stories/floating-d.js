import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import FloatingD from '../src/components/floating-d';
import readme from '../src/components/floating-d/README.md';

storiesOf('FloatingD', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Without comments', () => (
    <FloatingD onClick={ action('clicked') } />
))
.add('With comments', () => (
    <FloatingD commentsCount={ 2 } onClick={ action('click') } />
))
.add('Knobs playground ⚽', () => {
    const active = boolean('active');
    const commentsCount = number('commentsCount');
    const hasUnread = boolean('hasUnread');

    return (
        <FloatingD
            active={ active }
            commentsCount={ commentsCount }
            hasUnread={ hasUnread }
            onClick={ action('click') } />
    );
});

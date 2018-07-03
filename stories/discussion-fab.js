import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import DiscussionFab from '../src/components/discussion-fab';
import readme from '../src/components/discussion-fab/README.md';

storiesOf('DiscussionFab', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Without comments', () => (
    <DiscussionFab onClick={ action('clicked') } />
))
.add('With comments', () => (
    <DiscussionFab commentsCount={ 2 } onClick={ action('click') } />
))
.add('Knobs playground ⚽', () => {
    const active = boolean('active');
    const commentsCount = number('commentsCount');
    const hasUnread = boolean('hasUnread');

    return (
        <DiscussionFab
            active={ active }
            commentsCount={ commentsCount }
            hasUnread={ hasUnread }
            onClick={ action('click') } />
    );
});

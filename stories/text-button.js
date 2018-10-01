import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, selectV2, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { TextButton, ReplyIcon } from '../src';
import readme from '../src/components/text-button/README.md';

storiesOf('TextButton', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard', () => (
    <TextButton variant="primary" onClick={ action('clicked') }>Click me</TextButton>
))
.add('With an icon (right)', () => (
    <TextButton
        variant="primary"
        icon={ <ReplyIcon /> }
        onClick={ action('clicked') }>
        Click me
    </TextButton>
))
.add('With an icon (left)', () => (
    <TextButton
        variant="primary"
        icon={ <ReplyIcon /> }
        iconPosition="left"
        onClick={ action('clicked') }>
        Click me
    </TextButton>
))
.add('Knobs playground ⚽', () => {
    const variant = selectV2('variant', ['primary', 'secondary'], 'primary');
    const iconPosition = selectV2('iconPosition', ['left', 'right'], 'right');
    const disabled = boolean('disabled');
    const children = text('children', 'Click me');

    return (
        <TextButton
            variant={ variant }
            icon={ <ReplyIcon /> }
            iconPosition={ iconPosition }
            disabled={ disabled }
            onClick={ action('clicked') }>
            { children }
        </TextButton>
    );
});

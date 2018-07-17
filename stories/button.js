import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, selectV2, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { Button } from '../src';
import readme from '../src/components/button/README.md';

storiesOf('Button', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Primary', () => (
    <Button variant="primary" onClick={ action('clicked') }>Click me</Button>
))
.add('Secondary', () => (
    <Button variant="secondary" onClick={ action('clicked') }>Click me</Button>
))
.add('Knobs playground ⚽', () => {
    const variant = selectV2('variant', ['primary', 'secondary'], 'primary');
    const disabled = boolean('disabled');
    const fullWidth = boolean('fullWidth');
    const feedback = selectV2('feedback', ['none', 'loading', 'success', 'error'], 'none');
    const children = text('children', 'Click me');

    return (
        <Button
            variant={ variant }
            disabled={ disabled }
            fullWidth={ fullWidth }
            feedback={ feedback || undefined }
            onClick={ action('clicked') }>
            { children }
        </Button>
    );
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, selectV2 } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import Button from '../src/components/button';
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

    return (
        <Button
            variant={ variant }
            disabled={ disabled }
            fullWidth={ fullWidth }
            onClick={ action('clicked') }>
            Click me
        </Button>
    );
});

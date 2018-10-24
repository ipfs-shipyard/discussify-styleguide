import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { KeyboardOnlyOutlines } from '../src';
import readme from '../src/components/keyboard-only-outlines/README.md';

const style = { display: 'block', border: '1px solid gray', marginBottom: '0.5em' };

storiesOf('KeyboardOnlyOutlines', module)
.addDecorator(withReadme(readme))
.add('Usage', () => (
    <KeyboardOnlyOutlines>
        <input type="text" placeholder="Some input" style={ style } />
        <input type="text" placeholder="Other input" style={ style } />
        <textarea placeholder="A textarea" style={ style } />
    </KeyboardOnlyOutlines>
));

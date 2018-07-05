import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import { TypingIndicator } from '../src';
import readme from '../src/components/typing-indicator/README.md';

storiesOf('TypingIndicator', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard', () => (
    <TypingIndicator />
))
.add('Custom color', () => (
    <TypingIndicator style={ { color: 'red' } } />
))
.add('Custom size', () => (
    <TypingIndicator style={ { fontSize: '2rem' } } />
))
.add('Knobs playground ⚽', () => {
    const style = object('style', { color: 'red', fontSize: '2rem' });

    return <TypingIndicator style={ style } />;
});

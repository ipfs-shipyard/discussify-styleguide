import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import CircularLoader from '../src/components/circular-loader';
import readme from '../src/components/circular-loader/README.md';

storiesOf('CircularLoader', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard', () => (
    <CircularLoader />
))
.add('Custom color', () => (
    <CircularLoader style={ { color: 'red' } } />
))
.add('Custom size', () => (
    <CircularLoader style={ { fontSize: 20 } } />
))
.add('Knobs playground ⚽', () => {
    const style = object('style', { color: 'red', fontSize: 20 });

    return <CircularLoader style={ style } />;
});

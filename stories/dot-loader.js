import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import DotLoader from '../src/components/dot-loader';
import readme from '../src/components/dot-loader/README.md';

storiesOf('DotLoader', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard', () => (
    <DotLoader />
))
.add('Custom color', () => (
    <DotLoader style={ { color: 'red' } } />
))
.add('Custom size', () => (
    <DotLoader style={ { fontSize: 20 } } />
))
.add('Knobs playground ⚽', () => {
    const style = object('style', { color: 'red', fontSize: 20 });

    return <DotLoader style={ style } />;
});

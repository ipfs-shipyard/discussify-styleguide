import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text } from '@storybook/addon-knobs';
import Avatar from '../src/components/avatar';
import readme from '../src/components/avatar/README.md';

storiesOf('Avatar', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Without image', () => (
    <Avatar name="André Cruz" />
))
.add('With image', () => (
    <Avatar name="André Cruz" image="https://en.gravatar.com/userimage/102855892/467eb9028a2018993024d612255dc20e.png" />
))
.add('Knobs playground ⚽', () => {
    const name = text('name', 'André Cruz');
    const image = text('image', 'https://en.gravatar.com/userimage/102855892/467eb9028a2018993024d612255dc20e.png');

    return <Avatar name={ name } image={ image } />;
});

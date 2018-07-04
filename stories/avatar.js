import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Avatar } from '../src';
import readme from '../src/components/avatar/README.md';

storiesOf('Avatar', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('With name', () => (
    <Avatar name="André Cruz" />
))
.add('Without name', () => (
    <Avatar />
))
.add('With image', () => (
    <Avatar name="André Cruz" image="https://en.gravatar.com/userimage/102855892/467eb9028a2018993024d612255dc20e.png" />
))
.add('Knobs playground ⚽', () => {
    const name = text('name', 'André Cruz');
    const image = text('image', 'https://en.gravatar.com/userimage/102855892/467eb9028a2018993024d612255dc20e.png');
    const lazy = boolean('lazy');

    return <Avatar name={ name } image={ image } lazy={ lazy } />;
});

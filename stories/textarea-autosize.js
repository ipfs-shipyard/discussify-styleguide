import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withReadme } from 'storybook-readme';
import { TextareaAutosize } from '../src';
import readme from '../src/components/textarea-autosize/README.md';

storiesOf('TextareaAutosize', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Default', () => (
    <TextareaAutosize />
))
.add('5 max rows ', () => (
    <TextareaAutosize maxRows={ 5 } />
))
.add('2 rows, 5 max rows ', () => (
    <TextareaAutosize rows={ 2 } maxRows={ 5 } />
))
.add('Knobs playground ⚽', () => {
    const rows = number('rows', 1);
    const maxRows = number('maxRows', 5);
    const disabled = boolean('disabled');

    return (
        <TextareaAutosize
            rows={ rows }
            maxRows={ maxRows }
            disabled={ disabled }
            onHeightChange={ action('height changed') } />
    );
});

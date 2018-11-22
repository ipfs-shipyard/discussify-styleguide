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
.add('Default (1 row, no max limit)', () => (
    <TextareaAutosize />
))
.add('5 max rows', () => (
    <TextareaAutosize maxRows={ 5 } />
))
.add('2 rows, 5 max rows', () => (
    <TextareaAutosize rows={ 2 } maxRows={ 5 } />
))
.add('Submit on enter', () => (
    <TextareaAutosize submitOnEnter onSubmit={ action('submit') } />
))
.add('Knobs playground ⚽', () => {
    const rows = number('rows', 1);
    const maxRows = number('maxRows', 5);
    const animate = boolean('animate');
    const submitOnEnter = boolean('submitOnEnter');

    return (
        <TextareaAutosize
            rows={ rows }
            maxRows={ maxRows }
            animate={ animate }
            submitOnEnter={ submitOnEnter }
            onSubmit={ action('submit') }
            onFocus={ action('focus') }
            onBlur={ action('blur') }
            onChange={ action('change') } />
    );
});

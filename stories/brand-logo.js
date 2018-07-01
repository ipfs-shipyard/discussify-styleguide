import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, selectV2 } from '@storybook/addon-knobs';
import BrandLogo from '../src/components/brand-logo';
import readme from '../src/components/brand-logo/README.md';

storiesOf('BrandLogo', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Normal', () => (
    <BrandLogo variant="normal" />
))
.add('Normal colored', () => (
    <BrandLogo variant="normal" colored />
))
.add('Abbreviated', () => (
    <BrandLogo variant="abbr" />
))
.add('Abbreviated colored', () => (
    <BrandLogo variant="abbr" colored />
))
.add('Knobs playground ⚽', () => {
    const variant = selectV2('variant', ['normal', 'abbr'], 'normal');
    const colored = boolean('colored');

    return <BrandLogo variant={ variant } colored={ colored } />;
});

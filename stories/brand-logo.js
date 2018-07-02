import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, selectV2, object } from '@storybook/addon-knobs';
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
    const variant = selectV2('variant', ['normal', 'abbr'], 'abbr');
    const colored = boolean('colored');
    const style = object('style', { fill: 'red', fillOpacity: 1, fontSize: 20 });

    return <BrandLogo variant={ variant } colored={ colored } style={ style } />;
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, selectV2, object } from '@storybook/addon-knobs';
import BrandLogo from '../src/components/brand-logo';
import readme from '../src/components/brand-logo/README.md';

storiesOf('BrandLogo', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Horizontal', () => (
    <BrandLogo variant="horizontal" />
))
.add('Vertical', () => (
    <BrandLogo variant="vertical" />
))
.add('Logotype', () => (
    <BrandLogo variant="logotype" />
))
.add('Logomark', () => (
    <BrandLogo variant="logomark" />
))
.add('With brand color', () => (
    <BrandLogo variant="horizontal" colored />
))
.add('Custom size', () => (
    <BrandLogo variant="horizontal" style={ { fontSize: 20 } } />
))
.add('Knobs playground ⚽', () => {
    const variant = selectV2('variant', ['horizontal', 'vertical', 'logotype', 'logomark'], 'horizontal');
    const colored = boolean('colored');
    const style = object('style', { fill: 'red', fillOpacity: 1, fontSize: 20 });

    return <BrandLogo variant={ variant } colored={ colored } style={ style } />;
});

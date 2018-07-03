# BrandLogo

The brand logo.

## Usage

```jsx
import { BrandLogo } from '@discussify/styleguide';

<BrandLogo variant="horizontal" />
```

### Changing the color

You may change the dots color via the `fill` CSS property.   
Additionally, you may tweak the opacity via the `fill-opacity` CSS property.

```jsx
import { BrandLogo } from '@discussify/styleguide';

<BrandLogo variant="horizontal" style={ { fill: 'red' } } />

```
### Changing the size

You may change the icon size via the `fontSize` CSS property.

```jsx
import { BrandLogo } from '@discussify/styleguide';

<BrandLogo variant="horizontal" style={ { fontSize: 20 } } />
```

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| variant | string | *required* | The variant of the button, can be one of: `horizontal`, `vertical`, `logotype`, `logomark` |
| colored | bool | false | True to have the primary brand color applied (otherwise it will inherit from `fill`) |

Any other properties supplied will be spread to the root element.

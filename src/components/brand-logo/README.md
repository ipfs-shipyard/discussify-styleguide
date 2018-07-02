# BrandLogo

The brand logo.

## Usage

```jsx
import { BrandLogo } from '@discussify/styleguide';

<BrandLogo variant="horizontal" />
```

Please read the `Icon` documentation for how to change the color and size of the logos.

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| variant | string | *required* | The variant of the button, can be one of: `horizontal`, `vertical`, `logotype`, `logomark` |
| colored | bool | false | True to have the primary brand color applied (otherwise it will inherit from `fill`) |

Any other properties supplied will be spread to the root element.

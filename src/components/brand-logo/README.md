# BrandLogo

The brand logo, normal and abbreviated.

## Usage

```jsx
import { BrandLogo } from '@discussify/styleguide';

<BrandLogo variant="normal" />
```

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| variant | string | | The variant of the button, can be one of: `normal`, `abbr` |
| colored | bool | false | True to have the primary brand color applied (otherwise it will inherit the `fill`) |

Any other properties supplied will be spread to the root element (native element).

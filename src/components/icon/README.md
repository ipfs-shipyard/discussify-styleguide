# Icon

A SVG icon, accepts inline svgs and svgs sprited with [external-svg-sprite-loader](https://github.com/Karify/external-svg-sprite-loader).

## Usage

**Using a specific icon from the icon set:**

```jsx
import { CloseIcon, ReplyIcon } from '@discussify/styleguide';

<CloseIcon />
<ReplyIcon />
```

Please check the "Icons/Catalogue" under Storybook for the list of available icons.

**Using manually:**

```jsx
import { Icon } from '@discussify/styleguide';
import mySvg from './path/to/my.svg';

<Icon svg={ mySvg } />
```

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| svg | string, object | | The svg contents or the object exported by [external-svg-sprite-loader](https://github.com/Karify/external-svg-sprite-loader) |

Any other properties supplied will be spread to the root element.

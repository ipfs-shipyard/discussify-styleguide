# TimeAgo

Renders relative times in the form of "x ago".

After a pre-defined treshold, dates are rendered in a more standard way.
Moreover, the relative times will be automatically updated as time goes on.

## Usage

```jsx
import { TimeAgo } from '@discussify/styleguide';

<TimeAgo date="2018-07-03T21:06:30.118Z" />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| date | Date, string, number | *required* | The date, can be a Date instance, a parseable date string or a unix timestamp in ms |
| format | string | long | The render format, can be one of: `long`, `short`, `tiny` |

Any other properties supplied will be spread to the root element.

# FloatingD

The Floating "D" used to open the sidebar and display the active discussion status.

## Usage

```jsx
import { FloatingD } from '@discussify/styleguide';

<FloatingD />
```

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| active | bool | false | Enables or disbles active state |
| commentsCount | number | | Number of comments within the discussion |
| hasUnread | bool | false | True if there's unread comments within the discussion |

Any other properties supplied will be spread to the root element.

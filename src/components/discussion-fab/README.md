# DicussionFab

The floating action button used to open the sidebar and display the active discussion status.

*Note*: Fab is an acronym for "floating action button".

## Usage

```jsx
import { DiscussionFab } from '@discussify/styleguide';

<DiscussionFab />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| active | bool | false | Enables or disbles active state |
| commentsCount | number | | Number of comments within the discussion |
| hasUnread | bool | false | True if there's unread comments within the discussion |
| className | string | | CSS classes to apply to the root element |
| logoClassName | string | | CSS classes to apply to the brand logo |

Any other properties supplied will be spread to the root element.

# CommentRepliesHeaderPlaceholder

A placeholder for the replies header to be used while a comment is loading.

## Usage

```jsx
import { CommentRepliesHeaderPlaceholder } from '@discussify/styleguide';

<CommentRepliesHeaderPlaceholder />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| author | object | *required* | The author of the comment that the replies refer to |
| withViewMore | bool | false | Show the right that contains the number of remaining comments |

Any other properties supplied will be spread to the root element.

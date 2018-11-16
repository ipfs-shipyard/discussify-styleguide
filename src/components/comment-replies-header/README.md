# CommentRepliesHeader

A header to be rendered whenever showing replies to a comment.

## Usage

```jsx
import { CommentRepliesHeader } from '@discussify/styleguide';

const author: {
    did: 'did:uport:2odP6zYTh8K95xztx3qpf3RishNXdUFCkH6',
    avatar: 'https://ipfs.infura.io/ipfs/Qme2BurB5BFTLxTqmjUBu7qgsE96iCpf6iJD9MurhBRoSC',
    name: 'André Cruz',
};

<CommentRepliesHeader
    author={ author }
    viewMoreCount={ 10 }
    onViewMore={ handleViewMore }  />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| author | object | *required* | The author of the comment that the replies refer to |
| viewMoreCount | number | 0 | The number of replies that are hidden, where 0 hides the counter |
| onViewMore | bool | | Function to be called when onViewMore is clicked |

Any other properties supplied will be spread to the root element.

Note that if `onViewMore` is not set, the counter will be hidden.

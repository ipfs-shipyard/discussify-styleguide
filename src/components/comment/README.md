# Comment

Renders a comment.

## Usage

```jsx
import { Comment } from '@discussify/styleguide';

const comment = {
    author: {
        did: 'did:uport:2odP6zYTh8K95xztx3qpf3RishNXdUFCkH6',
        avatar: 'https://ipfs.infura.io/ipfs/Qme2BurB5BFTLxTqmjUBu7qgsE96iCpf6iJD9MurhBRoSC',
        name: 'André Cruz',
    },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut rhoncus orci. Nulla non malesuada augue.',
    createdAt: Date.now() - (60 * 5 * 1000),
};

<Comment
    comment={ comment }
    onEdit={ handleEdit }
    onRemove={ handleRemove }
    onReply={ handleReply } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| comment | object | *required* | The comment object |
| owner | bool | false | True if the current logged-in user owns the comment |
| onEdit | func | *required* | Function to call when edit is clicked |
| onRemove | func | *required* | Function to call when remove is clicked |
| onReply | func | *required* | Function to call when reply is clicked |

Any other properties supplied will be spread to the root element.

Whenever `onEdit` gets called, a `CommentInput` component should be rendered in place of this one. But to avoid flickers, such as the avatar image being preloaded, the `Comment` component should be kept but hidden.

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
    onReply={ handleReply } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| comment | object | *required* | The comment object |
| owner | bool | false | True if the current logged-in user owns the comment |
| preloadAvatarImage | bool | true | Enables preloading the author's avatar |
| onReply | func | *required* | Function to call when reply is clicked |
| onEdit | func | *required* if owner | Function to call when edit is clicked |
| onRemove | func | *required* if owner | Function to call when remove is clicked |

Any other properties supplied will be spread to the root element.

Whenever `onEdit` gets called, a `CommentInput` component should be rendered in place of this one. But to avoid flickers, such as the avatar image being preloaded, the `Comment` component should be kept but hidden.

The `preloadAvatarImage` property should be set to `false` when a new reply settled. The reasoning is that this component will be rendered in-place of the `CommentInput` component, which has the avatar image already loaded.

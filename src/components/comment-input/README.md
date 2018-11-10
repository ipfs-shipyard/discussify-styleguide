# CommentInput

A component that should be rendered while editing or replying.

## Usage

```jsx
import { CommentInput } from '@discussify/styleguide';

const me = {
    did: 'did:uport:xxxxxx',
    name: 'André Cruz',
    image: 'https://ipfs.infura.io/ipfs/Qme2BurB5BFTLxTqmjUBu7qgsE96iCpf6iJD9MurhBRoSC'
};

// New reply
<CommentInput
    author={ me }
    onSubmit={ handleSave }
    onCancel={ handleCancel } />

// Editing a comment
<CommentInput
    body="My awesome comment"
    author={ me }
    onSubmit={ handleSave }
    onCancel={ handleCancel } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| author | object | *required* | The author of the comment, usually the logged-in user |
| body | string | | The body of the comment we are editing; if not passed, it's assumed we are replying |
| onSave | func | *required* | Function to call when save/reply is clicked |
| onCancel | func | *required* | Function to call when cancel is clicked |

Any other properties supplied will be spread to the root element.

The preload of the avatar image will be disabled when editing a comment. The reasoning is that this component will be rendered in-place of the `Comment` component, which has the avatar image already loaded.

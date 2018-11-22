# CommentFrame

Wraps a comment, rendering "Replying to" on top of it and "x replies" at the bottom.

## Usage

```jsx
import { CommentFrame } from '@discussify/styleguide';

const comment = {
    author: {
        did: 'did:uport:2odP6zYTh8K95xztx3qpf3RishNXdUFCkH6',
        avatar: 'https://ipfs.infura.io/ipfs/Qme2BurB5BFTLxTqmjUBu7qgsE96iCpf6iJD9MurhBRoSC',
        name: 'André Cruz',
    },
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut rhoncus orci. Nulla non malesuada augue.',
    createdAt: Date.now() - (60 * 5 * 1000),
};

// Is a reply
<CommentFrame
    reply
    replyTo={ comment.author }
    <Comment
        comment={ comment }
        onReply={ handleReply } />
</CommentFrame>

// Is a reply but we don't know to who yet
<CommentFrame
    reply
    <Comment
        comment={ comment }
        onReply={ handleReply } />
</CommentFrame>

// Has replies
<CommentFrame
    replies
    repliesCount={ { total: 2, viewMore: 1 } }>
    <Comment
        comment={ comment }
        onReply={ handleReply } />
</CommentFrame>

// Has replies but we don't know how many yet
<CommentFrame
    replies
    <Comment
        comment={ comment }
        onReply={ handleReply } />
</CommentFrame>
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| children | element | *required* | The comment element to render (Comment, CommentError, CommentPlaceholder) |
| reply | bool | false | True if the comment is a reply to another one |
| replyTo | object | | The author of the comment we are replying to |
| replies | bool | false | True if this comment has replies |
| repliesCount | object ({ total, viewMore }) | | The replies count |
| onViewMoreReplies | func | *required* if replies and repliesCount are set | Function to call when view more replies was clicked |

Any other properties supplied will be spread to the root element.

# Avatar

Avatar to render the user's image, fallbacks to the user's initials.

## Usage

```jsx
import { Avatar } from '@discussify/styleguide';

<Avatar name="André Cruz" />
<Avatar
    name="André Cruz"
    image="https://ipfs.infura.io/ipfs/Qme2BurB5BFTLxTqmjUBu7qgsE96iCpf6iJD9MurhBRoSC" />
```

### Changing the size

You may change the icon size via the `fontSize` CSS property (defaults to `1rem`).

```jsx
import { Avatar } from '@discussify/styleguide';

<Avatar name="André Cruz" style={ { fontSize: '2rem' } } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| name | string | | The user's name |
| image | string | | The user's image |
| preloadImage | bool | true | Show the user's image only when it's loaded |

Any other properties supplied will be spread to the root element.

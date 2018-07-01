# Avatar

Avatar to render the user's image, fallbacking to the user's initials.

## Usage

```jsx
import { Avatar } from '@discussify/styleguide';

<Avatar name="André Cruz" />
<Avatar name="André Cruz" image="https://en.gravatar.com/userimage/102855892/467eb9028a2018993024d612255dc20e.png" />
```

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| name | string | *required* | The user's name |
| image | string | | The user's image |

Any other properties supplied will be spread to the root element.

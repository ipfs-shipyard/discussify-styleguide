# Button

A standard button.

## Usage

```jsx
import { Button } from '@discussify/styleguide';

<Button variant="primary" onClick={ handleClick } />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| variant | string | *required* | The variant of the button, can be one of: `primary`, `secondary` |
| fullWidth | boolean | false | Ocupies 100% width |
| disabled | boolean | false | Sets the disabled state |
| feedback | string | | The feeback to show on the button, can be one of: `loading`, `success` or `error` |

Any other properties supplied will be spread to the root element.

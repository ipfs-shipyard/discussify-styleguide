# Button

A standard button.

## Usage

```jsx
import { Button } from '@discussify/styleguide';

<Button variant="primary" onClick={ handleClick } />
```

## Props

| name | type | default | description |
| -----| ---- | ------- | ----------- |
| variant | string | | The variant of the button, can be one of: `primary`, `secondary` |
| fullWidth | boolean | false | Ocupies 100% width |
| disabled | boolean | Sets the disabled state |

Any other properties supplied will be spread to the root element (native element).

# TextareaAutosize

A textarea component that auto-resizes.

## Usage

```jsx
import { TextareaAutosize } from '@discussify/styleguide';

<TextareaAutosize />
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| maxRows | number | | The number of max rows of the textarea |
| animate | bool | true | Animate the textarea height |

Any other properties supplied will be spread to the root element. One useful textarea property is `rows`, which defines the minimum number of rows within the textarea.

# Modal

A modal dialog.

## Usage

**Standalone**

```jsx
import { Modal } from '@discussify/styleguide';

<Modal isOpen>I'm a text in a modal.</Modal>
```

**With a trigger:**

```jsx
import { Modal, ModalTrigger, Button } from '@discussify/styleguide';

const modal = <Modal isOpen>I'm a text in a modal.</Modal>

<ModalTrigger modal={ modal }>
    { ({ isOpen, toggle }) => <Button variant="primary" onClick={ toggle }>Click me</Button> }
</ModalTrigger>
```

## Modal props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| contentClassName | string | | The CSS class to give to the content wrapper element |

Besides the ones listed above, all properties from [react-modal](http://reactcommunity.org/react-modal/#usage) are also supported.

## ModalTrigger props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| modal | element | *required* | The modal to show |
| children | function | *required* | A render prop function that should return the trigger element |

The `children` function is called with an object with:

```js
{
    isOpen, // Boolean indicating if the modal is open
    open, // Call this to open the modal
    close, // Call this to close the modal
    toggle, // Call this to toggle between open/close
}
```

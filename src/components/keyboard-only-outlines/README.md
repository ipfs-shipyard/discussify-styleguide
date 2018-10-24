# KeyboardOnlyOutlines

A component that enables [keyboard-only-outlines](https://github.com/moxystudio/js-keyboard-only-outlines) so that outlines are only visible when using the keyboard.

## Usage

You should use this component just once in your project:

```jsx
import { KeyboardOnlyOutlines } from '@discussify/styleguide';

<KeyboardOnlyOutlines>
    <MyApp />
</KeyboardOnlyOutlines>
```

## Props

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| stylesheetTarget | DOM Node | Automatic, see below | The DOM node where to insert the stylesheet with styles to disable the outlines |
| styles | string | See [keyboard-only-outlines](https://github.com/moxystudio/js-keyboard-only-outlines) | The styles to apply when a focus event is caused by mouse navigation |

The `stylesheetTarget` is automatically inferred by checking the component's [rootNode](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode). In most cases, this will be `document.head` unless the component is mounted within a shadow root.

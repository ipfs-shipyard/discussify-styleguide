import React, { forwardRef } from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, boolean, text, selectV2 } from '@storybook/addon-knobs';
import { Popover, PopoverTrigger, Button } from '../src';
import readme from '../src/components/popover/README.md';

const LoremIpsumPopver = forwardRef((props, ref) => (
    <Popover
        ref={ ref }
        style={ { maxWidth: 250 } }
        { ...props }>Nullam a felis porta, sollicitudin justo vel, <a href="#foo">dignissim</a> libero</Popover>
));

storiesOf('Popover', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('Standard trigger', () => (
    <PopoverTrigger popover={ <LoremIpsumPopver placement="right" /> }>
        <Button variant="primary">Click or hover me</Button>
    </PopoverTrigger>
))
.add('Custom trigger (click)', () => (
    <PopoverTrigger popover={ <LoremIpsumPopver placement="right" /> }>
        { ({ toggle }) =>
            <Button variant="primary" onClick={ toggle }>Click me</Button> }
    </PopoverTrigger>
))
.add('All placements', () => {
    const styles = {
        container: { maxWidth: 200, margin: '200px auto', textAlign: 'center' },
        button: { marginBottom: 50 },
    };

    return (
        <div style={ styles.container }>
            <PopoverTrigger popover={ <LoremIpsumPopver /> }>
                <Button style={ styles.button } variant="primary">Auto</Button>
            </PopoverTrigger>

            <PopoverTrigger popover={ <LoremIpsumPopver placement="top" /> }>
                <Button style={ styles.button } variant="primary">Top</Button>
            </PopoverTrigger>

            <PopoverTrigger popover={ <LoremIpsumPopver placement="bottom" /> }>
                <Button style={ styles.button } variant="primary">Bottom</Button>
            </PopoverTrigger>

            <PopoverTrigger popover={ <LoremIpsumPopver placement="left" /> }>
                <Button style={ styles.button } variant="primary">Left</Button>
            </PopoverTrigger>

            <PopoverTrigger popover={ <LoremIpsumPopver placement="right" /> }>
                <Button style={ styles.button } variant="primary">Right</Button>
            </PopoverTrigger>
        </div>
    );
})
/* eslint-disable react/jsx-no-bind, react/prop-types */
.add('Knobs playground ⚽', () => {
    const styles = {
        container: { maxWidth: 200, margin: '200px auto', textAlign: 'center' },
    };

    const placement = selectV2('placement', ['auto', 'top', 'right', 'bottom', 'left'], 'auto');
    const trigger = selectV2('trigger', ['standard', 'click', 'click-toggle', 'hover'], 'standard');
    const shouldCloseOnEsc = boolean('shouldCloseOnEsc', true);
    const shouldCloseOnOutsideClick = boolean('shouldCloseOnOutsideClick', true);
    const content = text('popover', 'My awesome popover content');

    const popover = (
        <Popover
            placement={ placement }
            shouldCloseOnEsc={ shouldCloseOnEsc }
            shouldCloseOnOutsideClick={ shouldCloseOnOutsideClick }>
            { content }
        </Popover>
    );

    return (
        <div style={ styles.container }>
            <PopoverTrigger popover={ popover }>
                { (() => {
                    switch (trigger) {
                    case 'click':
                        return ({ open }) => <Button variant="primary" onClick={ open }>Click me</Button>;
                    case 'click-toggle':
                        return ({ toggle }) => <Button variant="primary" onClick={ toggle }>Click me</Button>;
                    case 'hover':
                        return ({ open, close }) => (
                            <Button
                                variant="primary"
                                onMouseEnter={ () => open(PopoverTrigger.defaultHoverDelay) }
                                onMouseLeave={ () => close(PopoverTrigger.defaultHoverDelay) }>Hover me</Button>
                        );
                    default:
                        return <Button variant="primary">Click or hover me</Button>;
                    }
                })() }
            </PopoverTrigger>
        </div>
    );
});
/* eslint-enable react/jsx-no-bind, react/prop-types */

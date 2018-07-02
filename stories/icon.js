import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, object } from '@storybook/addon-knobs';
import * as icons from '../src/components/icon';
import readme from '../src/components/icon/README.md';

const parsedIcons = Object.entries(icons).filter(([name]) => name !== 'default');

const styles = {
    ul: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gridGap: 10,
        padding: 0,
        margin: 0,
        listStyleType: 'none',
    },
    li: {
        border: '1px solid #efefef',
        borderRadius: 4,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        marginBottom: 15,
    },
    usage: {
        fontSize: 12,
    },
};

storiesOf('Icon', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('All icons', () => (
    <ul style={ styles.ul }>
        { parsedIcons.map(([name, Icon]) => (
            <li key={ name } style={ styles.li }>
                <div style={ styles.icon }>
                    <Icon />
                </div>
                <code style={ styles.usage }>{ `<${name} />` }</code>
            </li>
        )) }
    </ul>
))
.add('Custom color', () => (
    <icons.ReplyIcon style={ { fill: 'red' } } />
))
.add('Custom color & opacity', () => (
    <icons.ReplyIcon style={ { fill: 'red', fillOpacity: 0.5 } } />
))
.add('Custom size', () => (
    <icons.ReplyIcon style={ { fontSize: 20 } } />
))
.add('Knobs playground ⚽', () => {
    const style = object('style', { fill: 'red', fillOpacity: 1, fontSize: 20 });

    return <icons.ReplyIcon style={ style } />;
});

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import { withKnobs, object } from '@storybook/addon-knobs';
import * as components from '../src';
import readme from '../src/components/icon/README.md';

const icons = Object.entries(components).filter(([name]) => /.+Icon$/.test(name));
const ReplyIcon = icons.find(([name]) => name === 'ReplyIcon')[1];

const styles = {
    ul: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridGap: 10,
        padding: 0,
        margin: 0,
        listStyleType: 'none',
    },
    li: {
        border: '1px solid #efefef',
        borderRadius: 4,
        padding: 20,
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginBottom: 15,
    },
    usage: {
        fontSize: 13,
    },
};

storiesOf('Icon', module)
.addDecorator(withReadme(readme))
.addDecorator(withKnobs)
.add('All icons', () => (
    <ul style={ styles.ul }>
        { icons.map(([name, Icon]) => (
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
    <ReplyIcon style={ { fill: 'red' } } />
))
.add('Custom opacity', () => (
    <ReplyIcon style={ { fillOpacity: 0.5 } } />
))
.add('Custom size', () => (
    <ReplyIcon style={ { fontSize: '4.8rem' } } />
))
.add('Knobs playground ⚽', () => {
    const style = object('style', { fill: 'red', fillOpacity: 1, fontSize: '4.8rem' });

    return <ReplyIcon style={ style } />;
});

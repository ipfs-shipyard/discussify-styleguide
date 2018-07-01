import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import * as icons from '../src/components/icon';
import readme from '../src/components/icon/README.md';

const iconsWithoutDefault = Object.entries(icons).filter(([name]) => name !== 'default');

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
        textAlign: 'center',
        marginBottom: 15,
    },
};

storiesOf('Icon', module)
.addDecorator(withReadme(readme))
.add('Catalogue', () => (
    <ul style={ styles.ul }>
        { iconsWithoutDefault.map(([name, Icon]) => (
            <li key={ name } style={ styles.li }>
                <div style={ styles.icon }>
                    <Icon />
                </div>
                <code>{ `<${name} />` }</code>
            </li>
        )) }
    </ul>
));

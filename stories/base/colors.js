import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import marked from 'marked';
import { uniqWith, camelCase } from 'lodash';
import colors from './colors.css';

const parsedColors = uniqWith(Object.entries(colors), ([name1], [name2]) => name1 === camelCase(name2));

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
        position: 'relative',
        border: '1px solid #efefef',
        borderRadius: 4,
        height: 140,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    name: {
        fontSize: 14,
        padding: 10,
        background: 'rgba(255, 255, 255, 0.7)',
        color: '#000',
    },
    docsPreview: {
        marginBottom: 50,
    },
};

storiesOf('base/Colors', module)
.addDecorator(withReadme(marked(`
# Colors

Discussify's color pallete.

You may use these colors in CSS files like so:

\`\`\`css
@import "variables";

.my-div {
    color: var(--color-science-blue);
}
\`\`\`
`)))
.add('All colors', () => (
    <ul style={ styles.ul }>
        { parsedColors.map(([name, className]) => (
            <li key={ name } style={ styles.li } className={ className }>
                <code style={ styles.name }>{ name }</code>
            </li>
        )) }
    </ul>
));

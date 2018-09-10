import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import marked from 'marked';
import styles from './typography.css';

/* eslint-disable max-len */
storiesOf('base/Typography', module)
.addDecorator(withReadme(marked(`
# Typography

Discussify's typography, including headings, regular text and links.

There's a set of CSS mixins to apply styles in elements other than the native HTML ones.
Take a look at \`src/styles/imports/mixins/typography.css\` for the available mixins.
There's also some CSS mixins related to text processing at \`src/styles/imports/mixins/text.css\`.

You may use the typography CSS mixins like so:

\`\`\`css
@import "@discussify/styleguide/styles/mixins/typography";

.my-heading {
    @mixin typography-h1 rem;
}

.my-paragraph {
    @mixin typography-body-2 rem;
}
\`\`\`
`)))
.add('All variants', () => (
    <div>
        <div className={ styles.h1 }>h1 - Some cool title</div>
        <div className={ styles.h2 }>h2 - Some cool title</div>
        <div className={ styles.h3 }>h3 - Some cool title</div>
        <div className={ styles.h4 }>h4 - Some cool title</div>
        <div className={ styles.h5 }>h5 - Some cool title</div>
        <div className={ styles.body1 }>body-1 (default) - The quick brown-fox jumps over the lazy dog.</div>
        <div className={ styles.body2 }>body-2 - The quick brown-fox jumps over the lazy dog.</div>
        <div className={ styles.caption }>caption - The quick brown-fox jumps over the lazy dog.</div>
        <div className={ styles.overline }>overline - The quick brown-fox jumps over the lazy dog.</div>
    </div>
))
.add('Links', () => (
    <p>The quick <a href="#foo">brown-fox</a> jumps over the lazy dog.</p>
))
.add('Complete document', () => (
    <div>
        <h1>Heading 1</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing <a href="#foo">elit</a>. Vestibulum eu tincidunt ipsum, id imperdiet felis. Suspendisse sagittis vel sapien pulvinar fermentum. Suspendisse potenti. Vestibulum ac gravida purus. Suspendisse potenti. Nulla id dolor ultrices, euismod metus nec, hendrerit lectus. Phasellus in pulvinar augue, a ornare quam. Donec varius tempor aliquet. Etiam lobortis justo tellus, vitae condimentum metus feugiat nec. Nam fringilla lacus et porttitor ultrices. Duis non ullamcorper nisi, sed ullamcorper diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut sed egestas orci. Integer consequat leo et odio pellentesque sollicitudin. Morbi vitae consequat lorem.
        </p>

        <h2>Heading 2</h2>
        <p>
            Nullam a felis porta, sollicitudin justo vel, <a href="#foo">dignissim</a> libero. Integer venenatis tincidunt enim, sit amet sagittis erat suscipit et. Aenean consequat erat egestas fringilla bibendum. Ut malesuada risus dui, id maximus dolor accumsan vitae. Pellentesque dictum erat sed auctor suscipit. Aliquam eu iaculis nunc, a gravida nunc. Quisque erat lacus, iaculis ut rutrum id, condimentum id magna. Aliquam at nisi lobortis, gravida mi a, malesuada orci. Pellentesque non sollicitudin est, in rhoncus mauris. Nulla nulla nibh, ultricies ut <a href="#foo">nulla</a> sit amet, scelerisque feugiat neque. Donec at lectus ultrices, sollicitudin lacus ut, cursus eros. Maecenas nunc turpis, vestibulum vitae consequat in, eleifend aliquam mi. Curabitur sed nulla in nisi posuere mattis. Nunc faucibus scelerisque imperdiet. Proin fermentum rutrum quam, vitae sagittis est rhoncus nec. Integer auctor, libero eu convallis pellentesque, odio risus cursus tortor, tincidunt tincidunt magna diam vel magna.
        </p>

        <h3>Heading 3</h3>
        <p className={ styles.body2 }>
            Sed ac semper arcu. Fusce et accumsan risus. Aenean in dui in augue <a href="#foo">tristique</a> tempor. Nulla lobortis euismod diam, sit amet vulputate ex rutrum ut. Vestibulum laoreet velit id orci tristique molestie. Sed eget quam orci. Ut ornare nisi quis bibendum vulputate.
        </p>

        <h4>Heading 4</h4>
        <p className={ styles.body2 }>
            an bibendum ligula laoreet arcu egestas ultricies. Nulla eu elementum augue.
        </p>
    </div>
));
/* eslint-disable max-len */

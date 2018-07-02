import React from 'react';
import { storiesOf } from '@storybook/react';

/* eslint-disable max-len */
storiesOf('base/Typography', module)
.add('Headings', () => (
    <div>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
    </div>
))
.add('Paragraphs', () => (
    <div>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu tincidunt ipsum, id imperdiet felis. Suspendisse sagittis vel sapien pulvinar fermentum. Suspendisse potenti. Vestibulum ac gravida purus. Suspendisse potenti. Nulla id dolor ultrices, euismod metus nec, hendrerit lectus. Phasellus in pulvinar augue, a ornare quam. Donec varius tempor aliquet. Etiam lobortis justo tellus, vitae condimentum metus feugiat nec. Nam fringilla lacus et porttitor ultrices. Duis non ullamcorper nisi, sed ullamcorper diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut sed egestas orci. Integer consequat leo et odio pellentesque sollicitudin. Morbi vitae consequat lorem.
        </p>
        <p>
            Nullam a felis porta, sollicitudin justo vel, dignissim libero. Integer venenatis tincidunt enim, sit amet sagittis erat suscipit et. Aenean consequat erat egestas fringilla bibendum. Ut malesuada risus dui, id maximus dolor accumsan vitae. Pellentesque dictum erat sed auctor suscipit. Aliquam eu iaculis nunc, a gravida nunc. Quisque erat lacus, iaculis ut rutrum id, condimentum id magna. Aliquam at nisi lobortis, gravida mi a, malesuada orci. Pellentesque non sollicitudin est, in rhoncus mauris. Nulla nulla nibh, ultricies ut nulla sit amet, scelerisque feugiat neque. Donec at lectus ultrices, sollicitudin lacus ut, cursus eros. Maecenas nunc turpis, vestibulum vitae consequat in, eleifend aliquam mi. Curabitur sed nulla in nisi posuere mattis. Nunc faucibus scelerisque imperdiet. Proin fermentum rutrum quam, vitae sagittis est rhoncus nec. Integer auctor, libero eu convallis pellentesque, odio risus cursus tortor, tincidunt tincidunt magna diam vel magna.
        </p>
        <p>
            Sed ac semper arcu. Fusce et accumsan risus. Aenean in dui in augue tristique tempor. Nulla lobortis euismod diam, sit amet vulputate ex rutrum ut. Vestibulum laoreet velit id orci tristique molestie. Sed eget quam orci. Ut ornare nisi quis bibendum vulputate.
        </p>
        <p>
            Phasellus ac magna ut ante faucibus tristique. Praesent nec pellentesque risus. Quisque venenatis lobortis rutrum. Pellentesque felis ipsum, faucibus ac nulla quis, tristique volutpat orci. Suspendisse id ante diam. Phasellus dignissim neque quis sodales bibendum. Aenean bibendum ligula laoreet arcu egestas ultricies. Nulla eu elementum augue.
        </p>
        <p>
            Nulla in dui condimentum, lacinia tellus nec, tempor massa. Aliquam ornare tempor lacus, sed tempus eros vulputate a. Nulla iaculis lorem tortor, ut venenatis velit volutpat ornare. Aenean vel porta ipsum, sit amet ullamcorper urna. Donec convallis sem lorem, quis facilisis dolor feugiat at. Vivamus vitae quam dictum, hendrerit arcu eget, sodales mauris. Nullam id semper ante, sit amet ultrices nibh. Pellentesque molestie fringilla ante, in faucibus nulla.
        </p>
    </div>
))
.add('Links', () => (
    <p>Check this <a href="#foo">link</a>.</p>
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

        <h2>Heading 3</h2>
        <p>
            Sed ac semper arcu. Fusce et accumsan risus. Aenean in dui in augue <a href="#foo">tristique</a> tempor. Nulla lobortis euismod diam, sit amet vulputate ex rutrum ut. Vestibulum laoreet velit id orci tristique molestie. Sed eget quam orci. Ut ornare nisi quis bibendum vulputate.
        </p>

        <h4>Heading 4</h4>
        <p>
            Phasellus ac magna ut ante faucibus tristique. Praesent nec pellentesque risus. Quisque venenatis lobortis rutrum. Pellentesque felis ipsum, faucibus ac nulla quis, tristique volutpat orci. Suspendisse id ante diam. Phasellus dignissim neque quis sodales bibendum. Aenean bibendum ligula laoreet arcu egestas ultricies. Nulla eu elementum augue.
        </p>

        <h5>Heading 5</h5>
        <p>
            Phasellus ac magna ut ante faucibus tristique. Praesent nec pellentesque risus. Quisque venenatis lobortis rutrum. Pellentesque felis ipsum, faucibus ac nulla quis, tristique volutpat orci. Suspendisse id ante diam. Phasellus dignissim neque quis sodales bibendum. Aenean bibendum ligula laoreet arcu egestas ultricies. Nulla eu elementum augue.
        </p>

        <h6>Heading 6</h6>
        <p>
            Phasellus ac magna ut ante faucibus tristique. Praesent nec pellentesque risus. Quisque venenatis lobortis rutrum. Pellentesque felis ipsum, faucibus ac nulla quis, tristique volutpat orci. Suspendisse id ante diam. Phasellus dignissim neque quis sodales bibendum. Aenean bibendum ligula laoreet arcu egestas ultricies. Nulla eu elementum augue.
        </p>
    </div>
));
/* eslint-disable max-len */

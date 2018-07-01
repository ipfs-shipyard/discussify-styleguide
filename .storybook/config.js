import { configure } from '@storybook/react';
import './styles.css';

configure(() => {
    require('../stories/typography.js');
    require('../stories/colors.js');
    require('../stories/brand-logo.js');
    require('../stories/icon.js');
    require('../stories/button.js');
    require('../stories/floating-d.js');
    require('../stories/avatar.js');
}, module);

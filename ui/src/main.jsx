import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { StyleManager } from '@psionic/ui';
import routes from '@root/routes';

import '@styles/defaults.scss';
import '@styles/typography.scss';
import '@styles/common.scss';
import psionicTheme from '@styles/psionic-theme';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <StyleManager theme={psionicTheme}>
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    </StyleManager>
);
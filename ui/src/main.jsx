import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import routes from '@root/routes';

import '@styles/defaults.scss';
import '@styles/typography.scss';
import '@styles/common.scss';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        {routes}
    </BrowserRouter>
);
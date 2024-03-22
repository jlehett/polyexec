import { Route, Routes } from 'react-router-dom';
import Dashboard from '@pages/dashboard';
import App from './app';

export default (
    <Routes>
        <Route
            element={<App/>}
            path='/'
        >
            <Route
                element={<Dashboard/>}
                index
            />
        </Route>
    </Routes>
);

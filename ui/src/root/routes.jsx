import { Route, Routes } from 'react-router-dom';
import InitializeConnection from '@pages/initialize-connection';
import Dashboard from '@pages/dashboard';
import App from './app';

export default (
    <Routes>
        <Route
            element={<App/>}
            path='/'
        >
            <Route
                element={<InitializeConnection/>}
                index
            />
            <Route
                element={<Dashboard/>}
                path='dashboard'
            />
        </Route>
    </Routes>
);

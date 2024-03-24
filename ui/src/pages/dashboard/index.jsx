import { useEffect } from 'react';
import localStyles from './dashboard.module.scss';
import MessageRouter from '@services/message-router/MessageRouter';
import RequestHandler from '@components/request-handler/RequestHandler';
import Logs from '@components/logs/Logs';

function Dashboard() {
    useEffect(() => {
        setTimeout(() => {
            MessageRouter.processing = true;
        }, 200);
    }, []);

    return (
        <div className={localStyles.page}>
            <RequestHandler/>
            <Logs/>
        </div>
    );
}

export default Dashboard;

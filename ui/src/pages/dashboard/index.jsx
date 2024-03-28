import { useEffect } from 'react';
import localStyles from './dashboard.module.scss';
import MessageRouter from '@services/message-router/MessageRouter';
import RequestHandler from '@components/request-handler/RequestHandler';
import ErrorTracker from '@components/error-tracker/ErrorTracker';
import ConfigDisplay from '@components/config-display/ConfigDisplay';
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
            <div className={localStyles.leftSide}>
                <Logs maxHeight={300}/>
                <ErrorTracker maxHeight={300}/>
            </div>
            <div className={localStyles.rightSide}>
                <ConfigDisplay maxHeight={300}/>
            </div>
        </div>
    );
}

export default Dashboard;

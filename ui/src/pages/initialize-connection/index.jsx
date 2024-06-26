import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnEmit } from '@psionic/emit-react';
import {
    DrawLoader,
    BouncingText,
} from '@psionic/ui';
import Connection from '@services/connection/Connection';
import localStyles from './initialize-connection.module.scss';

function InitializeConnection() {

    const navigate = useNavigate();

    useEffect(() => {
        Connection.connect();
    }, []);

    useOnEmit(
        Connection.EVENTS.CONNECTED,
        () => navigate('/dashboard')
    );

    return (
        <div className={localStyles.page}>
            <DrawLoader
                paths={[
                    {
                        d: 'M20,5V4c0-0.55-0.45-1-1-1h-2c-0.55,0-1,0.45-1,1v1h-1v4c0,0.55,0.45,1,1,1h1v7c0,1.1-0.9,2-2,2s-2-0.9-2-2V7 c0-2.21-1.79-4-4-4S5,4.79,5,7v7H4c-0.55,0-1,0.45-1,1v4h1v1c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-1h1v-4c0-0.55-0.45-1-1-1H7 V7c0-1.1,0.9-2,2-2s2,0.9,2,2v10c0,2.21,1.79,4,4,4s4-1.79,4-4v-7h1c0.55,0,1-0.45,1-1V5H20z',
                        strokeWidth: 0.5,
                    }
                ]}
                svg={{
                    height: '24',
                    viewBox: '0 0 24 24',
                    width: '24',
                }}
                color="#4fc930"
            />
            <div className={localStyles.spacer}/>
            <span>
                <p>Initializing connection</p>
                <BouncingText
                    lines={['...']}
                    waveGranularity={0.5}
                    amplitude={4}
                    bounceSpeed={0.75}
                />
            </span>
        </div>
    );
}

export default InitializeConnection;
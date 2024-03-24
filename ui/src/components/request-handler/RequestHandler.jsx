import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import { default as RequestHandlerService } from '@services/request-handler/RequestHandler';
import ValueRequestDialog from './dialogs/ValueRequestDialog';

function RequestHandler() {

    const [isHandling, setIsHandling] = useState(false);

    const [dialog, setDialog] = useState({
        props: {},
        Component: null,
    });

    useOnEmit(RequestHandlerService.EVENTS.VALUE_REQUEST_RECEIVED, (valueRequest) => {
        setDialog({
            props: {
                request: valueRequest,
            },
            Component: ValueRequestDialog,
        });
        setIsHandling(true);
    });

    return dialog.Component && (
        <dialog.Component close={() => setIsHandling(false)} isOpen={isHandling} {...dialog.props} />
    );

}

export default RequestHandler;

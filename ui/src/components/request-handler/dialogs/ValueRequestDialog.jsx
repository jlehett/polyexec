import { useState, useMemo } from 'react';
import {
    Form,
    TextField,
    Button,
} from '@psionic/ui';
import Dialog from '@components/lib/Dialog';
import RequestHandler from '@services/request-handler/RequestHandler';
import ValueRequest from '../../../../../connection/requests/ValueRequest';
import localStyles from './ValueRequestDialog.module.scss';

function ValueRequestDialog({
    isOpen,
    close,
    request,
}) {

    function validate(newValue) {
        return ValueRequest.validateValue(request.validation, newValue)
            ? null
            : 'Did not pass validation check';
    }

    function handleSubmit(formData) {
        RequestHandler.sendResponse({
            value: formData.input.value
        });

        close();
    }

    return (
        <Dialog isOpen={isOpen}>
            <Form
                className={localStyles.dialog}
                onSubmit={handleSubmit}
            >
                <h1>Enter a value</h1>
                <div className={localStyles.body}>
                    <p>
                        {request.message}
                    </p>
                    <TextField
                        label=" "
                        fieldKey="input"
                        validator={validate}
                        darkMode
                        className={localStyles.input}
                    />
                </div>
                <div className={localStyles.footer}>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </div>
            </Form>
        </Dialog>
    );
}

export default ValueRequestDialog;

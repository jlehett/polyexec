import { useEffect } from 'react';
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

    useEffect(() => {
        if (isOpen) {
            const input = document.querySelector(`.${localStyles.body}`).querySelector('input');
            
            if (input) {
                input.focus();
            }
        }
    }, [isOpen]);

    function validate(newValue) {
        return ValueRequest.validateValue(request.validate, newValue)
            ? null
            : 'Did not pass validation check';
    }

    function handleSubmit(formData) {
        RequestHandler.sendResponse({
            value: formData.input.value
        });

        close();
    }

    function handleSelectRecommendedOption(option) {
        RequestHandler.sendResponse({
            value: option,
        });

        close();
    }

    function renderRecommendedOptions() {
        if (!request.recommendedOptions || request.recommendedOptions.length === 0) {
            return null;
        }

        return (
            <div className={localStyles.recommendedOptions}>
                <p>Recommended Options:</p>
                <ul>
                    {request.recommendedOptions.map((option, index) => (
                        <li key={index}>
                            <button type="button" onClick={() => handleSelectRecommendedOption(option)}>
                                {option}    
                            </button>    
                        </li>
                    ))}
                </ul>
            </div>
        );
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
                    {renderRecommendedOptions()}
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

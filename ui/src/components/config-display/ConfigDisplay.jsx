import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import StandardConfigVar from '../../../../connection/config-vars/StandardConfigVar';
import ConfigVarStore from '@services/config-var-store/ConfigVarStore';
import localStyles from './ConfigDisplay.module.scss';

//#region Main Component

function ConfigDisplay() {
    const configVars = useConfigVars();

    function renderConfigVars() {
        if (configVars.length === 0) {
            return (
                <p>No config vars used yet</p>
            );
        }

        return configVars.map((configVar, configVarIndex) => {
            switch (configVar.type) {
                case StandardConfigVar.type:
                    return (
                        <p key={configVarIndex} className={localStyles.standardConfigVar}>
                            <span className={localStyles.key}>
                                {configVar.key}:{' '}
                            </span>
                            <span className={localStyles.value}>
                                {configVar.value}
                            </span>
                        </p>
                    );
                default:
                    throw new Error(`Unknown config var type: ${configVar.type}`);
            }
        });
    }

    return (
        <div className="card">
            <header>
                <h1>Config Variables</h1>
            </header>
            <div className={`content ${localStyles.configDisplayContent}`}>
                <div className={localStyles.configVarsContainer}>
                    {renderConfigVars()}
                </div>
            </div>
        </div>
    );
}

export default ConfigDisplay;

//#endregion

//#region Helper Hooks

function useConfigVars() {
    const [configVars, setConfigVars] = useState([]);

    useOnEmit(ConfigVarStore.EVENTS.CONFIG_VAR_USED, (configVar) => {
        setConfigVars((configVars) => [...configVars, configVar]);
    });

    return configVars;
}

//#endregion
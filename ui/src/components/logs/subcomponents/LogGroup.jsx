import { useState, useEffect } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import {
    IconButton,
} from '@psionic/ui';
import InfoLog from '../../../../../connection/logs/InfoLog';
import EndingLog from '../../../../../connection/logs/EndingLog';
import ErroredLog from '../../../../../connection/logs/ErroredLog';
import AsyncErrorLog from '../../../../../connection/logs/AsyncErrorLog';
import RestartingLog from '../../../../../connection/logs/RestartingLog';
import CachedIcon from '@assets/cached';
import KeyboardArrowUpIcon from '@assets/keyboard-arrow-up';
import KeyboardArrowDownIcon from '@assets/keyboard-arrow-down';
import ErrorIcon from '@assets/error';
import CheckCircleIcon from '@assets/check-circle';
import LogStore from '@services/log-store/LogStore';
import Spinning from '@components/lib/Spinning';
import Log from './Log';
import localStyles from './LogGroup.module.scss';
import ErrorMessageLog from '../../../../../connection/logs/ErrorMessageLog';

//#region Ref Enums

const STATUS = {
    RUNNING: 'RUNNING',
    COMPLETED: 'COMPLETED',
    ERROR: 'ERROR',
};

//#endregion

//#region Main Component

function LogGroup({
    groupID,
}) {
    const { groupStatus, setGroupStatus } = useGroupStatus(groupID);

    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (groupStatus === STATUS.RUNNING && !isExpanded) {
            setIsExpanded(true);
        } else if ([STATUS.COMPLETED, STATUS.ERROR].includes(groupStatus) && isExpanded) {
            setIsExpanded(false);
        }
    }, [groupStatus]);

    const groupInfo = LogStore.getGroupInfo({ id: groupID });

    const childLogs = useChildLogs(groupID, setGroupStatus);

    function renderStatusIcon() {
        switch (groupStatus) {
            case STATUS.RUNNING:
                return <Spinning size={24}><CachedIcon fill="#4bb1ff"/></Spinning>;
            case STATUS.COMPLETED:
                return <CheckCircleIcon fill="#5eff89"/>;
            case STATUS.ERROR:
                return <ErrorIcon fill="#ff5e5e"/>;
            default:
                return null;
        }
    }

    function renderChildLogs() {
        return childLogs.map((log, logIndex) => {
            return isLogAGroup(log)
                ? <LogGroup key={logIndex} groupID={log.id}/>
                : <Log key={logIndex} log={log}/>;
        });
    }

    return (
        <div className={localStyles.logGroup}>
            <header onClick={() => setIsExpanded((prev) => !prev)}>
                <div className={localStyles.left}>
                    {renderStatusIcon()}
                    <h1>
                        {groupInfo?.name || 'Group'}
                    </h1>
                </div>
                <div className={localStyles.right}>
                    <IconButton
                        SvgIcon={isExpanded ? KeyboardArrowUpIcon : KeyboardArrowDownIcon}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded((prev) => !prev);
                        }}
                        color="white"
                        size={24}
                        paddingRatio={0.25}
                    />
                </div>
            </header>
            <div
                className={localStyles.groupLogsContainer}
                style={{ display: isExpanded ? 'block' : 'none' }}
            >
                {childLogs.length === 0 && (
                    <p className={localStyles.noLogs}>
                        No logs in this group
                    </p>
                )}
                {childLogs.length > 0 && (
                    <div className={localStyles.childLogsContainer}>
                        {renderChildLogs()}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LogGroup;

//#endregion

//#region Helper Functions

function isLogForGroupItself(groupID, log) {
    return groupID === log.id;
}

function isLogAGroup(log) {
    return Boolean(log.id);
}

function isChildOfGroup(groupID, log) {
    return groupID === log.parentID;
}

function setSuccessIfNotAlreadyError(prevStatus) {
    return prevStatus === STATUS.ERROR ? STATUS.ERROR : STATUS.COMPLETED;
}

//#endregion

//#region Helper Hooks

function useChildLogs(groupID, setGroupStatus) {
    const [childLogs, setChildLogs] = useState([]);

    useOnEmit(LogStore.EVENTS.LOG_ADDED, (log) => {
        const addLogToChildren = () => setChildLogs((logsInGroup) => [...logsInGroup, log]);

        if (!isChildOfGroup(groupID, log)) return;

        switch (log.type) {
            case RestartingLog.type:
                setGroupStatus(STATUS.RUNNING);
                break;
            case ErrorMessageLog.type:
                setGroupStatus(STATUS.ERROR);
                addLogToChildren();
                break;
            case InfoLog.type: {
                if (log.isSuccess) {
                    setGroupStatus(setSuccessIfNotAlreadyError);
                }

                addLogToChildren();
                break;
            }
            default:
                addLogToChildren();
        }
    });

    return childLogs;
}

function useGroupStatus(groupID) {
    const [groupStatus, setGroupStatus] = useState(STATUS.RUNNING);

    useOnEmit(LogStore.EVENTS.LOG_ADDED, (log) => {
        if (isLogForGroupItself(groupID, log)) {
            switch (log.type) {
                case EndingLog.type:
                    setGroupStatus(setSuccessIfNotAlreadyError);
                    break;
                case ErroredLog.type:
                case AsyncErrorLog.type:
                    setGroupStatus(STATUS.ERROR);
                    break;
                default:
                    break;
            }
        }
    });

    return {
        groupStatus,
        setGroupStatus,
    };
}

//#endregion

import { useState, useEffect } from 'react';
import { useOnEmit } from '@psionic/emit-react';
import TaskTracker from '@services/task-tracker/TaskTracker';
import Task from './Task';
import localStyles from './Tasks.module.scss';

function Tasks() {
    const tasks = useTasks();

    return (
        <div className={localStyles.tasksList}>
            {tasks.map(taskName => <Task key={taskName} taskName={taskName}/>)}
        </div>
    );
}

export default Tasks;

//#region Helper Hooks

function useTasks() {
    const [tasks, setTasks] = useState([]);

    const setTasksFromTracker = () => setTasks(Array.from(TaskTracker.getTasks()));

    useEffect(setTasksFromTracker, []);
    useOnEmit(TaskTracker.EVENTS.TASKS_UPDATED, setTasksFromTracker);

    return tasks;
}

//#endregion
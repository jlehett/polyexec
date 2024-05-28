import {
    Button,
} from '@psionic/ui';

function Task({ taskName }) {
    return (
        <Button
            variant="contained"
            color="btnPrimary"
            onClick={() => console.log(`Task clicked: ${taskName}`)}
        >
            {taskName}
        </Button>
    );
}

export default Task;
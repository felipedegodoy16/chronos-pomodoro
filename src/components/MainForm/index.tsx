import { PlayCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
    const { state, setState } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!taskNameInput.current) return; // validando se existe um input

        const taskName = taskNameInput.current.value.trim(); // o trim é usado para remover espaços desnecessários no valor digitado pelo usuário

        if (!taskName) {
            alert('Digite o nome da tarefa');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        const secondsRemaining = newTask.duration * 60;

        setState((prevState) => {
            return {
                ...prevState,
                config: { ...prevState.config },
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining, // conferir
                formattedSecondsRemaining:
                    formatSecondsToMinutes(secondsRemaining), // fazer depois
                tasks: [...prevState.tasks, newTask],
            };
        });
    }

    return (
        <form
            onSubmit={(e) => handleCreateNewTask(e)}
            action=""
            className="form"
        >
            <div className="formRow">
                <DefaultInput
                    id="meuInput"
                    type="text"
                    labelText="task"
                    placeholder="Digite algo"
                    aria-label="teste"
                    ref={taskNameInput}
                />
            </div>

            <div className="formRow">
                <p>Próximo intervalo é de 25min</p>
            </div>

            <div className="formRow">
                <Cycles />
            </div>

            <div className="formRow">
                <DefaultButton icon={<PlayCircleIcon />} />
            </div>
        </form>
    );
}

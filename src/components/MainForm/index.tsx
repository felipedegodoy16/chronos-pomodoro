import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';
import { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { showMessage } from '../../adapters/showMessage';

export function MainForm() {
    const { state, dispatch } = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    // ciclos
    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        showMessage.dismiss();

        if (!taskNameInput.current) return; // validando se existe um input

        const taskName = taskNameInput.current.value.trim(); // o trim é usado para remover espaços desnecessários no valor digitado pelo usuário

        if (!taskName) {
            showMessage.warn('Digite o nome da tarefa');
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

        dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });

        showMessage.success('Tarefa iniciada');

        // usando setState seria dessa forma
        // const secondsRemaining = newTask.duration * 60;
        // setState((prevState) => {
        //     return {
        //         ...prevState,
        //         config: { ...prevState.config },
        //         activeTask: newTask,
        //         currentCycle: nextCycle,
        //         secondsRemaining,
        //         formattedSecondsRemaining:
        //             formatSecondsToMinutes(secondsRemaining),
        //         tasks: [...prevState.tasks, newTask],
        //     };
        // });
    }

    function handleInterruptTask() {
        dispatch({ type: TaskActionTypes.INTERRUPT_TASK });

        showMessage.dismiss();
        showMessage.error('Tarefa interrompida!');

        // usando setState seria dessa forma, basicamente segue a mesma ideia, porém, a função está em outro arquivo, está no nosso reducer
        // setState((prevState) => {
        //     return {
        //         ...prevState,
        //         config: { ...prevState.config },
        //         activeTask: null,
        //         secondsRemaining: 0,
        //         formattedSecondsRemaining: '00:00',
        //         tasks: prevState.tasks.map((task) => {
        //             if (
        //                 prevState.activeTask &&
        //                 prevState.activeTask.id === task.id
        //             ) {
        //                 return { ...task, interruptDate: Date.now() };
        //             }
        //             return task;
        //         }),
        //     };
        // });
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
                    disabled={!!state.activeTask}
                />
            </div>

            <div className="formRow">
                <Tips />
            </div>

            {state.currentCycle > 0 && ( //basicamente a ideia é que caso não haja ciclo nenhum não irá mostrar nada na minha tela
                <div className="formRow">
                    <Cycles />
                </div>
            )}

            <div className="formRow">
                {!state.activeTask && (
                    <DefaultButton
                        aria-label="Iniciar a tarefa"
                        title="Iniciar a tarefa"
                        type="submit"
                        icon={<PlayCircleIcon />}
                        key="botao_submit"
                    />
                )}

                {!!state.activeTask && (
                    <DefaultButton
                        aria-label="Interromper a tarefa atual"
                        title="Interromper a tarefa atual"
                        type="button"
                        color="red"
                        icon={<StopCircleIcon />}
                        onClick={handleInterruptTask}
                        key="botao_button"
                    />
                )}
            </div>
        </form>
    );
}

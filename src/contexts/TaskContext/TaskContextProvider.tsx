import { useEffect, useReducer } from 'react';
import { initialTaskState } from './initialTaskState';
import { TaskContext } from './TaskContext';
import { taskReducer } from './taskReducer';
import { TimerWorkerManager } from '../../workers/TimerWorkerManager';
import { TaskActionTypes } from './taskActions';

type TaskContextProviderProps = {
    children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState);

    const worker = TimerWorkerManager.getInstance(); // aqui recebemos a instância da classe caso ela já tenha sido instanciada em algum outro lugar do códgo ou instanciamos um novo objeto caso ele ainda não tenha sido inicializado

    worker.onmessage((e) => {
        const countDownSeconds = e.data;

        if (countDownSeconds <= 0) {
            dispatch({ type: TaskActionTypes.COMPLETE_TASK });
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionTypes.COUNT_DOWN,
                payload: { secondsRemaining: countDownSeconds },
            });
        }
    });

    useEffect(() => {
        if (!state.activeTask) {
            console.log('Worker terminado por falta de activeTask');
            worker.terminate();
        }

        worker.postMessage(state);
    }, [worker, state]);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
}

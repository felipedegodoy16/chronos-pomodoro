import { PlayCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';
import { useRef } from 'react';

export function MainForm() {
    const taskNameInput = useRef<HTMLInputElement>(null);

    function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('deu certo');
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

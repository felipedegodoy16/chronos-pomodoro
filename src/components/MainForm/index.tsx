import { PlayCircleIcon } from 'lucide-react';
import { DefaultButton } from '../DefaultButton';
import { Cycles } from '../Cycles';
import { DefaultInput } from '../DefaultInput';

export function MainForm() {
    return (
        <form action="" className="form">
            <div className="formRow">
                <DefaultInput
                    id="meuInput"
                    type="text"
                    labelText="task"
                    placeholder="Digite algo"
                    aria-label="teste"
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

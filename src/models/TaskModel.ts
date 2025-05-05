import { TaskStateModel } from './TaskStateModel';

export type TaskModel = {
    id: string;
    name: string;
    duration: number;
    startDate: number;
    completeDate: number | null;
    interruptDate: number | null;
    type: keyof TaskStateModel['config']; // as chaves virão do meu outro arquivo do objeto config, ou seja, se houver alguma alteração lá, automaticamente é alterado os tipos suportados aqui também
};

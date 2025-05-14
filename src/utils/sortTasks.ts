// função genérica para ordenar o array de tasks

// o método .sort() recebe uma função que compara dois itens (a, b) e deve retornar:
// - um número NEGATIVO (-1) se "a" deve vir antes de "b"
// - um número POSITIVO (1) se "b" deve vir antes de "a"
// - ZERO (0) se não precisa mudar a ordem

// a função cuida de:
// 1. se o valor for nul, joga pro final da lista
// 2. se for número, ordena numericamente (asc ou desc)
// 3. se for string, ordena alfabeticamente (asc ou desc)

// o spread [...tasks] cria uma cópia do array original para não alterar diretamente o array

import { TaskModel } from '../models/TaskModel';

// define os parâmetros esperados pela função
export type SortTasksOptions = {
    tasks: TaskModel[]; // lista de tarefas que será ordenada
    direction?: 'asc' | 'desc'; // direção da ordenação da lista
    field?: keyof TaskModel; // qual campo da tarefa será usado para ordenar
};

export function sortTasks({
    field = 'startDate', // se o campo não for informado, usamos o startDate como padrão de ordenação
    direction = 'desc', // se nenhuma direção for informada, usamos descendente como padrão
    tasks = [], // se não houver uma lista passada, usamos uma lista vazia
}: SortTasksOptions): TaskModel[] {
    return [...tasks].sort((a, b) => {
        // pegamos o valor da propriedade escolhida (ex: startDate) em cada tarefa
        const aValue = a[field];
        const bValue = b[field];

        // --- TRATANDO VALORES NULOS ---

        // se dois forem nulos, mantemos a ordem atual
        if (!aValue && !bValue) return 0;

        // se apenas o primeiro for nulo, ele vai para o final
        if (!aValue) return 1;

        // se apenas o segundo for nulo, ele vai para o final
        if (!bValue) return -1;

        // --- COMPARAÇÃO NUMÉRICA ---

        // se os dois valores forem numéricos, fazemos uma subtração para ordenar
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction === 'asc'
                ? aValue - bValue // Ex: 1, 2, 3...
                : bValue - aValue; // Ex: 3, 2, 1...
        }

        // ---  COMPARAÇÃO DE STRINGS ---

        // se os dois valores forem textos, usamos localeCompare para comparar em ordem alfabética
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return direction === 'asc'
                ? aValue.localeCompare(bValue) // A -> Z
                : bValue.localeCompare(aValue); // Z -> A
        }

        // --- CASOS NÃO TRATADOS ---

        // se não for nem número, nem string, nem null, não alteramos a ordem
        return 0;
    });
}

import { TaskModel } from '../../models/TaskModel';

export enum TaskActionTypes {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE',
}

// a ideia aqui é deixar especificado quais os types de task que irei ter e quando for usar aquela task se vai ter o payload ou não, poderia também deixar opcional o payload e colocar os tipos do type todos dentro do mesmo objeto, mas assim fica mais explícito quando vou precisar e quando não do payload, podendo até mesmo separar em dois types e depois juntá-los denovo

// EXEMPLO DE TUDO JUNTO

// export enum TaskActionTypes {
//   START_TASK = 'START_TASK',
//   INTERRUPT_TASK = 'INTERRUPT_TASK',
//   RESET_STATE = 'RESET_STATE',
// }

// export type TaskActionModel =
//     | {
//           payload: TaskModel;
//           type: TaskActionTypes.START_TASK;
//       }
//     | {
//           type: TaskActionTypes.INTERRUPT_TASK;
//           payload: TaskModel;
//       }
//     | {
//           type: TaskActionTypes.RESET_STATE;
//       };

export type TaskActionsWithPayload = {
    payload: TaskModel;
    type: TaskActionTypes.START_TASK;
};

export type TaskActionsWithoutPayload =
    | {
          type: TaskActionTypes.INTERRUPT_TASK;
      }
    | {
          type: TaskActionTypes.RESET_STATE;
      };

export type TaskActionModel =
    | TaskActionsWithPayload
    | TaskActionsWithoutPayload;

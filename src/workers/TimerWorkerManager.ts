// a ideia de criar essa classe é para que ela gerencie nosso worker, ou seja, tudo que for ser usado pelo worker está aqui e fará tudo, assim, qualquer lugar do meu script que chamar o meu worker estará recebendo o mesmo worker, isso será necessário para que não fique se criando vários workers ao mesmo tempo

import { TaskStateModel } from '../models/TaskStateModel';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;

    private constructor() {
        // a ideia aqui é privar para que não haja a instanciação dessa classe a não ser dentro dela mesma
        this.worker = new Worker(new URL('./timerWorker.js', import.meta.url));
    }

    // método para retornar a instância da classe e caso ela ainda não tenha sido instanciada ela é instanciada aqui
    static getInstance() {
        // aqui é criado um método estático para ser chamado pela própria classe sem a necessidade de instanciação de um novo objeto da classe
        if (!instance) {
            instance = new TimerWorkerManager();
        }

        return instance;
    }

    // métodos do nosso worker, a ideia é usar as funções que o worker já tem porém como temos a classe e precisamos acessar o atributo worker dentro dela, criamos os métodos dentro da classe para isso

    // método para postar/enviar a mensagem
    postMessage(message: TaskStateModel) {
        this.worker.postMessage(message);
    }

    onmessage(cb: (e: MessageEvent) => void) {
        this.worker.onmessage = cb;
    }

    terminate() {
        this.worker.terminate();
        instance = null;
    }
}

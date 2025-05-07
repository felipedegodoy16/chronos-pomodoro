let isRunning = false; // vai ser um monitorador, já fazemos isso dentro do nosso 'TimerWorkerManager', porém, mesmo assim é bom garantir, então essa variável será uma flag que recebe false, assim quando entrar no nosso worker e estiver falso ele passa, se não ele retorna, nosso primeiro if faz isso

self.onmessage = function (event) {
    if (isRunning) return;

    isRunning = true;

    const state = event.data;
    const { activeTask, secondsRemaining } = state;

    const endDate = activeTask.startDate + secondsRemaining * 1000;
    const now = Date.now();
    let countDownSeconds = Math.ceil((endDate - now) / 1000);

    function tick() {
        self.postMessage(countDownSeconds);

        const now = Date.now();
        countDownSeconds = Math.floor((endDate - now) / 1000);

        setTimeout(tick, 1000);
    }

    tick();
};

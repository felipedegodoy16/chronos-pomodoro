import ticTacBeep from '../assets/audios/tic_tac_planeta_miller.mp3';

export function loadBeep() {
    const audio = new Audio(ticTacBeep);
    // audio.play(); // em todos os navegadores isso daria certo menos no safari, por conta disso teremos que fazer um outro método que funciona para o safari e mantém funcionando nos outros navegadres também
    audio.load();

    return () => {
        audio.currentTime = 0; // usado para zerar o áudio, nesse caso não é necessário pois,já carregaremos toda vez o áudio, então ele sempre irá começar no zero, mas, por garantia é bom deixar para que ele zere sempre
        audio
            .play()
            .catch((error) => console.log('Erro ao tocar áudio', error)); // isso faz com que se ocorrer algum erro ele irá mostrar no console
    };
}

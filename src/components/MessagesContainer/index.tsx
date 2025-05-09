import { Bounce, ToastContainer } from 'react-toastify';

type MessagesContainerProps = {
    children: React.ReactNode;
};

export function MessagesContainer({ children }: MessagesContainerProps) {
    return (
        <>
            {children}

            <ToastContainer
                position="top-center" // posição da tela em que irá aparecer a notificação
                autoClose={5000} // tempo para ele se fechar sozinho
                hideProgressBar={false} // para esconder a barrinha de progresso que mostra o tempo até se fechar sozinho
                newestOnTop={false} // se der mais de uma notificação as mais novas vem no topo
                closeOnClick={true} // se clicar nela ela se fecha
                rtl={false} // direita para esquerda
                pauseOnFocusLoss // pausar quando não estiver na tela, ou seja, não irá contar o tempo para ela se fechar
                draggable
                pauseOnHover // pause o tempo com o mouse sobre a notificação
                theme="light"
                transition={Bounce}
            />
        </>
    );
}

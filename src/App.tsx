import './styles/theme.css';
import './styles/global.css';
import { Heading } from './components/Heading';

export function App() {
    console.log('Oi');

    return (
        <>
            <Heading attr={123}>Olá mundo 1</Heading>
            <Heading>Olá mundo 2</Heading>
            <Heading>Olá mundo 3</Heading>
            <Heading>Olá mundo 4</Heading>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos pariatur totam nihil, labore, aliquam iusto eius sapiente blanditiis alias, dicta impedit fugiat dolor doloribus aperiam quis error obcaecati velit eos?</p>
        </>
    );
}
import { Title, Container, Description } from './styles';


const About = () => {

    return <Container>
        <Title>
            Informações gerais
        </Title>
        <Description>
            <ul>
                <li>O sistema está em versão beta.</li>
                <li>
                    O modelo que realiza a predição ainda está sendo desenvolvido e utiliza como base o modelo Xception, que está sendo utilizado como extrator de caracteristicas.
                </li>
                <li>
                    O treinamento foi feito com uma base de dados construída pelos autores, contendo ao todo 1455 imagens de 11 espécies de alevinos.
                </li>
            </ul>
        </Description>
    </Container>
}

export default About;

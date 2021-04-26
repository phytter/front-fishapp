import { useEffect, useState } from 'react';
import { Title, Title2, Container, List } from './styles';
import modelConfig from '../config/model.json';

const Information = () => {

    const [list, setList] = useState([]);

    const getClasses = async () => {
        try {
            setList(modelConfig.CLASSES);
        } catch (error) {
            alert('Não foi possível trazer as classes.')
        }
    }

    useEffect(() => {
        getClasses();
    }, []);

    return <Container>
        <Title>
            Informações de espécies suportadas
        </Title>
        <Title2>{list?.length} especies de alevinos, sendo:</Title2>
        <List>
            {
                list?.sort().map((v) =>
                    <li key={v}>
                        {v.replace(/_/g, ' ')}
                    </li>
                )
            }
        </List>
    </Container>
}

export default Information;

import { useEffect, useState } from 'react';
import { Title, Title2, Container, List } from './styles';
import axios from 'axios';

const Information = () => {

    const [list, setList] = useState([]);

    const getClasses = async () => {
        try {
            const res = await axios.get('/available-classes');
            setList(res.data.classes);
        } catch (error) {
            alert('Não foi possível trazer as classes.')
        }
    }

    useEffect(() => {
        getClasses();
    }, []);

    return <Container>
        <Title>
            Informações
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

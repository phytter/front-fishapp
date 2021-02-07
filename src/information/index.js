import { Title, Title2, Container, List } from './styles'

const list = ['Lambari','hibrido_tambaqui_pirapitinga','Lambari_rosa','Carpas_coloridas_KOI','Cachara_pura','Tambatinga','Jundia_rosa','Carpa_capim','Tambaqui','Pintado_jundiara','Pacu'];

export default () => {
    return <Container>
        <Title>
            Informações
        </Title>
        <Title2>11 especies de alevinos, sendo:</Title2>
        <List>
            {
                list.sort().map((v) => 
                    <li key={v}>
                        {v.replace(/_/g, ' ')}
                    </li>
                )
            }
        </List>
        </Container>
}
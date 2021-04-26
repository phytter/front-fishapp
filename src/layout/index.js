import { Container } from './styles';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Container>
      <div className='header'>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/especies">Espécies</Link>
          <Link to="/sobre">Sobre</Link>
        </nav>
      </div>
      <section className='content'>
        {children}
      </section>
    </Container>
  );
}

export default Layout;

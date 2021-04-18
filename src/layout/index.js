import { Container } from './styles';

const Layout = ({ children }) => {
  return (
    <Container>
      <div className='header'>
        <nav>
          <a href="/">Início</a>
          <a href="/especies">Espécies</a>
          <a href="/sobre">Sobre</a>
        </nav>
      </div>
      <section className='content'>
        {children}
      </section>
    </Container>
  );
}

export default Layout;

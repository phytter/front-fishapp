import styled from 'styled-components';

export const Container = styled.div`
  display: grid;

  .header {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    grid-area: header;
    background-image: linear-gradient(#96D0ED, #A8D8F0);
    height: 60px;
    width: 100%;
    position: fixed;
    left: 0px;
    top: 0px;

    nav {
      max-width: 800px;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      a {
          text-decoration: none;
          color: inherit;
          font-size: 18px;
      }
    }

      nav a {
          flex-grow: 1;
          text-align: center;
          padding: 1em;
          position: relative;
      }

      // animmation
      nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right:0;
          height: 2px;
          transform: scaleX(0);
          background: #333;
          transition: 0.7s transform cubic-bezier(0.06, 0.9, 0.28, 1);
      }

      nav a:hover::after{
          transform: scaleX(1)
      }
  }

  .content {
    grid-area: content;
    height: calc(100vh - 60px);
    overflow: auto;
    background: #EBEBEB;
  }

  grid-template-columns: 100%;
  grid-template-rows: 60px auto; 
  grid-template-areas: 
    "header"
    "content";
 `;
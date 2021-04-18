import styled from 'styled-components';


export const Container = styled.div`
    // height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

export const Title = styled.h1`
    width: 100%;
    text-align: center;
`;

export const Title2 = styled.h2`
    margin-top: 20px;
    width: 100%;
    // text-align: center;
`;

export const List = styled.ul`
    list-style-type: square;

    li {
        margin-top: 10px;
        margin-left: 50px;
        font-size: 20px;
    }
`;

export const Description = styled.div`
    margin-top: 20px;
    width: 100%;
    font-size: 18px;
    padding-left: 20px;
    li {
        margin-top: 10px;
        font: 1.2rem 'Fira Sans', sans-serif;
    }
    ul {
        list-style: disc;
    }
`;
import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const UploadWrapper = styled.div`
    width: 100%;
    height: 80px;
    padding: 20px;
    display: flex;
    justify-content: center;

`;

export const WrapperListImages = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-height: calc(100vh - 80px);
    overflow: auto;

    #first-button {
        margin-right: 10px;
    }
    
`;

export const ImageItem = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    padding: 5px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;


export const Title = styled.h1`

`;
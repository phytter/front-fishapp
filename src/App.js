import { useState, useRef, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { Container, UploadWrapper, WrapperListImages, ImageItem } from './style';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8000';

const App = () => {
  const imagesRef = useRef([]);
  const [images, setImages] = useState([]);
  const maxNumber = 20;


  useEffect(() => {
    imagesRef.current = images
  }, [images]);

  const onChange = (imageList, addUpdateIndex) => {

    setImages(imageList);

    setTimeout(() => {
      addUpdateIndex?.map(async e => {
        if (!imageList[e]?.predict)
          return predict(imageList[e], e)
      });
    }, 10);
  };

  const predict = async (file, index) => {
    const formData = new FormData();
    formData.append('file', file.file);
    await axios.post('/predict', formData)
      .then(({ data }) => {
        setImages(prev => {
          const _list = [...imagesRef.current]
          _list[index] = { ..._list[index], predict: data };
          return _list;
        })
      });
  }

  const RenderList = ({ onImageRemove }) => {
    return (
      images.map((image, index) => (
        <ImageItem key={index}>
          <img src={image.data_url} alt="" height="80" />

          <span>
            {image?.file.name}
          </span>
          <span>
            {image?.predict?.label ?? 'Não processado'}
            {' - '}
            {image?.predict?.score &&
              (parseFloat(image?.predict?.score) * 100).toFixed(2)
            } %
          </span>

          <div className="image-item__btn-wrapper">
            <button id="first-button" onClick={() => predict(image, index)}>Processar</button>
            <button onClick={() => onImageRemove(index)}>Remover</button>
          </div>
        </ImageItem>
      ))
    )
  }

  return (
    <Container>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          <>
            <UploadWrapper>
              <button
                style={isDragging ? { color: "red" } : null}
                onClick={onImageUpload}
                {...dragProps}
              >
                Clique ou solte aqui
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remover todas as imagens</button>
              <Link to='/info' style={{ marginLeft: 10 }}>
                Ver informações
              </Link>
            </UploadWrapper>
            <WrapperListImages {...dragProps} drag={isDragging}>
              <RenderList onImageRemove={onImageRemove} />
            </WrapperListImages>
          </>
        )}
      </ImageUploading>
    </Container>
  );
}

export default App;

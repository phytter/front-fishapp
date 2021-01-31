import { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import { Container, UploadWrapper, WrapperListImages, ImageItem } from './style';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {

    setImages(imageList);
  };

  const predict = (file, index) => {
    const formData =  new FormData();
    formData.append('image' , file.file);
    axios.post('/predict', formData).then(({ data }) => {
      setImages(prev => {
        const _list = [...prev]
        _list[index] = {..._list[index], predict: data};
        return _list;
      })
    });
  }

  const RenderList = ({onImageRemove}) => {
    return (
      images.map((image, index) => (
        <ImageItem key={index}>
          <img src={image.data_url} alt="" height="80" />

          <span>
            {image?.predict?.label ?? 'Não processado'}
            {' - '}
            { image?.predict?.score &&
                (parseFloat(image?.predict?.score) * 100).toFixed(2)
            } %
          </span>

          <div className="image-item__btn-wrapper">
            <button id="first-button" onClick={() => predict(image, index)}>Processar</button>
            <button onClick={() => onImageRemove(index)}>Remove</button>
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
            </UploadWrapper>
            <WrapperListImages>
              <RenderList onImageRemove={onImageRemove} />
            </WrapperListImages>
          </>
        )}
      </ImageUploading>
    </Container>
  );
}

export default App;

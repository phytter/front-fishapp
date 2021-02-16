import { useState, useRef, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { Container, UploadWrapper, WrapperListImages, ImageItem, Title } from './style';
import axios from 'axios';
import { Link } from 'react-router-dom';

// axios.defaults.baseURL = 'http://3.136.23.106:5000';
axios.defaults.baseURL = process.env.API_URL || 'http://localhost:5000';

const App = () => {
  const imagesRef = useRef([]);
  const [images, setImages] = useState([]);
  const maxNumber = 20;


  useEffect(()=>{
    imagesRef.current = images
  }, [images]);

  const onChange = (imageList, addUpdateIndex) => {

    setImages(imageList);

    setTimeout(() => {
      addUpdateIndex?.map( async e => {
        if (! imageList[e]?.predict)
          return predict(imageList[e],e)
      });
      // console.log(list_to_resolve)
      // if (list_to_resolve)
      //   Promise.all(list_to_resolve).then(v => {
      //     const _list = [...imageList]
      //     v.forEach( i => {
      //       if (i)
      //         _list[i[1]] = 
      //         _list[i[1]] = {..._list[i[1]], predict: i[0]};
      //     })
      //     setImages(_list)
      //   })
    }, 10);
  };

  const predict = async (file, index) => {
    const formData =  new FormData();
    formData.append('image' , file.file);
    await axios.post('/predict', formData)
    // .then(res => res.data);
    .then(({ data }) => {
      setImages(prev => {
        const _list = [...imagesRef.current]
        _list[index] = {..._list[index], predict: data};
        return _list;
      })
    });
    // return [resp, index]
  }

  const RenderList = ({onImageRemove}) => {
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
            { image?.predict?.score &&
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
              <Link to='/info' style={{marginLeft: 10}}>
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

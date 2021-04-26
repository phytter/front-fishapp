import { useState, useRef, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { Container, UploadWrapper, WrapperListImages, ImageItem, DropArea } from './style';
import { ImUpload } from 'react-icons/im';
import Recognizer from './recognizer';
import modelConfig from './config/model.json';

const IMAGE_SIZE = modelConfig.IMAGE_SIZE;

const App = () => {

  const imagesRef = useRef([]);
  const [images, setImages] = useState([]);
  const [recognizer, setRecognizer] = useState(null);
  const maxNumber = 50;


  useEffect(() => {
    imagesRef.current = images
  }, [images]);

  useEffect(() => {
    const _recognizer = new Recognizer(modelConfig.MODEL_URL, ["Tambaqui", "Pacu", "Tambatinga"]);
    setRecognizer(_recognizer);
  }, []);

  const downloadFile = async () => {
    let myData = images.map((image) => ({ file_name: image.file.name, predict: image.predict }));
    const fileName = "resultados";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const onChange = (imageList, addUpdateIndex) => {

    setImages(imageList);

    setTimeout(() => {
      addUpdateIndex?.map(async e => {
        if (!imageList[e]?.predict)
          return predict(imageList[e], e)
      });
    }, 10);
  };

  const predict = async ({ file }, index) => {
    if (!file.type.match('image.*')) {
      return;
    }
    let reader = new FileReader();
    reader.onload = e => {

      let img = document.createElement('img');
      img.src = e.target.result;
      img.width = IMAGE_SIZE;
      img.height = IMAGE_SIZE;
      img.onload = async () => {
        const predicted = await recognizer.predict(img);
        setImages(prev => {
          const _list = [...imagesRef.current];
          _list[index] = { ..._list[index], predict: predicted };
          return _list;
        });
      };
    };

    reader.readAsDataURL(file);
  }

  const showPredict = (predict) => {
    if (!predict) return 'Carregando...';
    return `${predict?.label} - ${(parseFloat(predict?.score) * 100).toFixed(2)} %`;
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
            {showPredict(image?.predict)}
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
            {
              !!images.length && (
                <>
                  <UploadWrapper>
                    <button className='btn-send' onClick={onImageUpload}>Enviar imagem</button>
                    <button className='btn-send' onClick={downloadFile}>Baixar resultados</button>
                    <button className='btn' onClick={onImageRemoveAll}>Remover todas as imagens</button>
                  </UploadWrapper>
                  <WrapperListImages {...dragProps} drag={isDragging}>
                    <RenderList onImageRemove={onImageRemove} />
                  </WrapperListImages>
                </>
              )
            }
            {
              !images.length && (
                <DropArea {...dragProps} isDragging={isDragging} onClick={onImageUpload}>
                  <ImUpload size={80} color="#707070" />
                  <span className="description">Arraste imagens ou clique aqui</span>
                </DropArea>
              )
            }
          </>
        )}
      </ImageUploading>
    </Container>
  );
}

export default App;

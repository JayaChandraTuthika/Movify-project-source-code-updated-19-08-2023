
import { useNavigate } from 'react-router-dom';
import './index.css'

const NotFound = () => {
  const navigate = useNavigate()
  const onReturnHome = () => {
    navigate('/')
  }
  return (
    <>
    <div className='background-gradient'></div>
    <div className='bg-not-found'>
      
      <img src='https://res.cloudinary.com/dds8wfxdw/image/upload/v1684044981/Movify-project-resources/Not%20found%20page/One_side_mkrrlt.svg' 
      alt=""
      className='nf-image-1'
      />
      <div className='nf-text-container'>
        <h1 className='not-found-heading'>Page Not Found !!</h1>
        <button type='button' className='nf-go-home-btn' onClick={onReturnHome}>{"<<"} Go Home</button>
      </div>
      
      <img src='https://res.cloudinary.com/dds8wfxdw/image/upload/v1684044981/Movify-project-resources/Not%20found%20page/Other_side_slp5bg.svg' 
      alt=""
      className='nf-image-2'
      />
    </div>
    </>
    
  );
};

export default NotFound;

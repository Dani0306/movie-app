import './hero-slide.scss'
import tmbdApi, { category, movieType } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import { useState, useEffect, useRef } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button, { OutlineButton } from '../button/Button'
import { useNavigate } from 'react-router-dom'
import Modal, { ModalContent } from '../modal/Modal'


const HeroSlide = () => {    

SwiperCore.use([Autoplay])
const [movieItems, setMovieItems] = useState([])

const getRamdom =() => {
    let arr = [];
    for(let i = 0; i < 3; i++){
        let num = Math.round(Math.random() * 20);
        arr.push(num)
    }
    return arr
}

useEffect(() => {
    const getMovies = async () => {
        const params = { page: 1 }
        try{
            const response = await tmbdApi.getMoviesList(movieType.popular, { params });
            for(let i = 0; i < 3; i++){
                setMovieItems(prev => [...prev, response.results[getRamdom()[i]]])
            }
        } catch (e){
            console.log(e)
        }
    }
    getMovies()
}, [])

  return (
    <div className='hero-slide'>
        <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        // autoplay={{ delay: 3000 }}
        slidesPerView={1}>
            {movieItems?.map((item, index) => (
                <SwiperSlide key={index}>
                    {({ isActive }) => (
                        <HeroslideItem item={item} className={`${isActive ? 'active' : ''}`}/>
                    )}
                </SwiperSlide>
            ))}

        </Swiper>
        {
            movieItems.map((item , index) => <Trailer key={index} item={item}/>)
        }
    </div>
  )
}


const HeroslideItem = props => {
    const navigate = useNavigate()
    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);
        const videos = await tmbdApi.getVideos(category.movie, item.id)
        if(videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc)
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer avaliable.';
        }

        modal.classList.toggle('active');

    }

    return (
        <div className={`hero-slide__item ${props.className}`}
        style={{ backgroundImage: `url(${background})` }}
        >
             <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className='title'>{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className='btns'>
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch Now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__info">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
             </div>
        </div>
    )  
}

const Trailer = props => {
    const item = props.item;
    const iframeRef = useRef(null)

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                    <iframe ref={iframeRef} width='100%' height='500px' title='trailer'></iframe>
            </ModalContent>
        </Modal>
    )


}

export default HeroSlide
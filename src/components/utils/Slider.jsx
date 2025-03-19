import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import '../../styles/slider.css'

const Slider = ({images}) => {
  // Estado para controlar la imagen en pantalla completa
  const [fullScreenImageIndex, setFullScreenImageIndex] = useState(null);

  // Función para abrir el modal de pantalla completa
  const openFullScreen = (index) => {
    setFullScreenImageIndex(index);
    document.body.style.overflow = 'hidden'; // Bloquear el scroll
  };

  // Función para cerrar el modal de pantalla completa
  const closeFullScreen = () => {
    setFullScreenImageIndex(null);
    document.body.style.overflow = 'auto'; // Habilitar el scroll
  };

  return (
    <div className="swiper-container">
      {/* Carrusel principal */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        effect="fade"
        pagination={{ clickable: true }}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              onClick={() => openFullScreen(index)} // Abrir pantalla completa al hacer clic
              style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal de pantalla completa con Swiper */}
      {fullScreenImageIndex !== null && (
        <div
          className="fullscreen-modal"
          onClick={closeFullScreen} // Cerrar al hacer clic fuera de la imagen
        >
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <Swiper
              modules={[Navigation, Pagination]}
              initialSlide={fullScreenImageIndex} // Comenzar en la imagen seleccionada
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Full Screen Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
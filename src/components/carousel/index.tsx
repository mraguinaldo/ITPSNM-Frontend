import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'
import { IMAGES } from './data'

const Carousel = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      autoplay={{ delay: 5000, waitForTransition: true }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, FreeMode, Pagination]}
      className="mySwiper"
    >
      {IMAGES.map(({ id, content, src }) => (
        <SwiperSlide key={id}>
          <div className="relative">
            <img src={src} alt={src} className="w-full object-contain rounded-[32px] brightness-50" />
            <h2 className="font-semibold w-full text-center md:text-left absolute bottom-[124px] md:bottom-[184px] text-[22px]  md:text-[32px] text-[#fff] px-8">
              {content}
            </h2>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export { Carousel }

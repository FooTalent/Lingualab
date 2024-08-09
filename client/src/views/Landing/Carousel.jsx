//HOOKS
import { useEffect } from "react";
import Slider from "react-slick";
//SLICK
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { reseñas } from "../../utils/reseñas";

const Carousel = () => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    centerMode: false,
    variableWidth: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-[1400px] h-[400px] flex items-center mx-auto">
      <div className="w-full h-[166px]">
        <Slider {...settings}>
          {reseñas.map((reseña, index) => (
            <div key={index} className="flex mx-6">
              <div
                className="flex flex-row bg-white w-[420px] p-[20px] gap-[20px] rounded-2xl"
                key={reseña.id}>
                <img
                  src={`/ImagesReview/user${index + 1}.png`}
                  className="w-[100px] h-[100px]"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="text-2xl font-medium">{reseña.name}</span>
                    <span className="text-xl font-normal">{reseña.rol}</span>
                  </div>
                  <span className="text-xl font-light">{reseña.review}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;

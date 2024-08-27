import Slider from "react-slick";
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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="w-full lg:w-[1400px] md:h-[400px] h-[250px] flex items-center mx-auto">
      <div className="w-full md:h-[166px]">
        <Slider {...settings}>
          {reseñas.map((reseña, index) => (
            <div key={index} className="flex mx-6">
              <div
                className="flex flex-row bg-white md:w-[420px] w-[330px] md:p-[20px] p-[16px] gap-[20px] rounded-2xl"
                key={reseña.id}>
                <img
                  src={`/ImagesReview/user${index + 1}.png`}
                  className="md:w-[100px] md:h-[100px] w-[48px] h-[48px]"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <span className="md:text-2xl text-lg font-medium">{reseña.name}</span>
                    <span className="md:text-xl text-[14px] font-normal">{reseña.rol}</span>
                  </div>
                  <span className="md:text-xl text-[14px] font-light">{reseña.review}</span>
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

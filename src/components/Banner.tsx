import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image
            src="/images/car_1.jpg"
            width={1500}
            height={600}
            alt="carousel 1"
          />
        </div>
        <div>
          <Image
            src="/images/car_2.jpg"
            width={1500}
            height={600}
            alt="carousel 2"
          />
        </div>
        <div>
          <Image
            src="/images/car_3.jpg"
            width={1500}
            height={600}
            alt="carousel 3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;

import { Carousel } from '@mantine/carousel'
import { Carousel1, Carousel2, Carousel3 } from './../../../assets'
import { Link } from 'react-router-dom'
const HeroCarousel = () => {
  return (
    <div className="mb-20 mt-12">
      <Carousel
        slideSize="70%"
        height="100%"
        slideGap="xs"
        controlsOffset="md"
        controlSize={29}
        loop
        withIndicators
      >
        <Carousel.Slide className="flex justify-center">
          {' '}
          <Link to="/categories">
            <img className=" h-fit " src={Carousel1} alt="carousel" />
          </Link>
        </Carousel.Slide>
        <Carousel.Slide className="flex justify-center">
          {' '}
          <Link to="/categories">
            <img className=" h-fit " src={Carousel2} alt="carousel" />
          </Link>
        </Carousel.Slide>
        <Carousel.Slide className="flex justify-center">
          {' '}
          <Link to="/categories">
            <img className=" h-fit " src={Carousel3} alt="carousel" />
          </Link>
        </Carousel.Slide>
      </Carousel>
    </div>
  )
}

export default HeroCarousel

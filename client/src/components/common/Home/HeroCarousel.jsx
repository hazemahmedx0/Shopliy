import { Carousel } from '@mantine/carousel'
import { Carousel1 } from './../../../assets'
const HeroCarousel = () => {
  return (
    <div className="mb-20">
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
          <img className=" h-fit " src={Carousel1} alt="carousel" />
        </Carousel.Slide>
        <Carousel.Slide className="flex justify-center">
          {' '}
          <img className=" h-fit " src={Carousel1} alt="carousel" />
        </Carousel.Slide>
        <Carousel.Slide className="flex justify-center">
          {' '}
          <img className=" h-fit " src={Carousel1} alt="carousel" />
        </Carousel.Slide>
      </Carousel>
    </div>
  )
}

export default HeroCarousel

import Carousel from 'react-gallery-carousel'
import 'react-gallery-carousel/dist/index.css'

const ImagesCarousel = () => {
  const images = Array.from({ length: 18 }, (x, i) => i + 1).map((number) => ({
    src: `/assets/carousel/${number}.jpg`,
    // @ts-ignore
    // alt: CAPTIONS[number],
  }))

  return (
      <Carousel
        images={images}
        style={{ height: 300 }}
        transitionSpeed={2}
        hasMediaButton={false}
        hasSizeButton={false}
        hasIndexBoard={false}
        // hasCaptions={'bottom'}
        // shouldMaximizeOnClick={true}
        // shouldMinimizeOnClick={true}
        shouldLazyLoad={true}
        // className="mr-4"
      />
  )
}

export default ImagesCarousel

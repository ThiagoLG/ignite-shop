import { styled } from "@/styles"
import { HomeContainer, Product } from "@/styles/pages/home"
import Image from "next/image"
import { useKeenSlider } from 'keen-slider/react'

import tshirt1 from '../assets/1.png'
import tshirt2 from '../assets/2.png'
import tshirt3 from '../assets/3.png'
import tshirt4 from '../assets/4.png'

const Button = styled('button', {
  backgroundColor: "$green500",
  borderRadius: 8
})

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={tshirt1} alt="t-shirt 1" height={480} width={520} />
        <footer>
          <strong>T-shirt 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={tshirt2} alt="t-shirt 2" height={480} width={520} />
        <footer>
          <strong>T-shirt 2</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={tshirt3} alt="t-shirt 3" height={480} width={520} />
        <footer>
          <strong>T-shirt 3</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={tshirt4} alt="t-shirt 4" height={480} width={520} />
        <footer>
          <strong>T-shirt 4</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}

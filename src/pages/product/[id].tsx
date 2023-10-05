import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import axios from "axios"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const { isFallback } = useRouter();

  async function handleBuyProduct() {

    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId
      });

      const { checkoutUrl } = response.data;
      location.href = checkoutUrl;
    } catch (e) {
      alert('Error to redirect to checkout!')
    }
  }

  return (
    <>
      {isFallback ?
        (<h1>Loading...</h1>)
        :
        (
          <ProductContainer>
            <ImageContainer>
              <Image src={product.imageUrl} alt="product image" width={520} height={480} />
            </ImageContainer>

            <ProductDetails>
              <h1>{product.name}</h1>
              <span>{product.price}</span>

              <p>{product.description}</p>

              <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession}> Buy now </button>
            </ProductDetails>

          </ProductContainer>
        )}
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id || '';

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price;
  const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        url: product.url,
        price: currencyFormatter.format((price.unit_amount || 0) / 100),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import Stripe from "stripe"

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="product image" width={520} height={480} />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button> Buy now </button>
      </ProductDetails>

    </ProductContainer>


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
        description: product.description
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
import { stripe } from "@/lib/stripe";
import { ImageContainer } from "@/styles/pages/success";
import { SuccessContainer } from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string,
  product: {
    name: string;
    imageUrl: string;
  }
}

export default function Success({ customerName, product }: SuccessProps) {

  return (
    <SuccessContainer>
      <h1>🎉 The purchase has been completed!</h1>

      <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110} alt="product image" />
      </ImageContainer>

      <p>
        Congratulations, <strong>{customerName}</strong>, your <strong>{product.name}</strong> already on its way to your house.
      </p>

      <Link href='/'> Back to the catalog </Link>
    </SuccessContainer >
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  if (!query.session_id) {
    return {
      redirect:{
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = query.session_id as string;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });
  console.log(session.customer_details);

  const customerName = session?.customer_details?.name;
  const product = session?.line_items?.data[0].price?.product as Stripe.Product;


  return {
    props: {
      customerName,
      product: {
        imageUrl: product.images[0]
      }
    }
  }
}
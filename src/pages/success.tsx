import { ImageContainer } from "@/styles/pages/product";
import { SuccessContainer } from "@/styles/pages/success";
import Image from "next/image";
import Link from "next/link";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Purchased made</h1>

      <ImageContainer></ImageContainer>

      <p>
        uhuul <strong>John Doe</strong>, your <strong>T-shirt XYZ</strong> already on its way to your house.
      </p>

      <Link href='/'> Back to the catalog </Link>
    </SuccessContainer >
  )
}
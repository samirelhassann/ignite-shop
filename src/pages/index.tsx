import React from "react";

import { stripe } from "@/lib/Stripe";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { HomeContainer, Product } from "@/styles/pages/home";

import "keen-slider/keen-slider.min.css";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            prefetch={false}
          >
            <Product className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt="shirt1"
              />

              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
              </footer>
            </Product>
          </Link>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const defaultPrice = product.default_price as Stripe.Price;

    const price =
      defaultPrice.unit_amount &&
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(defaultPrice.unit_amount / 100);

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
    };
  });

  return {
    props: {
      products,
    },

    // 2 hours refresh
    revalidate: 60 * 60 * 2,
  };
};

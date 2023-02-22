import React, { useContext } from "react";

import { CheckoutContext, Product } from "@/contexts/CheckoutContext";
import { FormatPriceBrl } from "@/helpers/FormatPriceBrl";
import { stripe } from "@/lib/Stripe";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";
import Stripe from "stripe";

import "keen-slider/keen-slider.min.css";
import {
  CheckoutButton,
  HomeContainer,
  ProductCard,
  ProductFooter,
} from "@/styles/pages/home";

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const { addProductToCart } = useContext(CheckoutContext);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 48,
    },
  });

  const handleAddProductToCart = (product: Product) => {
    addProductToCart(product);
  };

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <ProductCard className="keen-slider__slide" key={product.id}>
            <Link href={`/product/${product.id}`} prefetch={false}>
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt={product.name}
              />
            </Link>
            <ProductFooter>
              <div>
                <strong>{product.name}</strong>
                <span>{FormatPriceBrl(product.price)}</span>
              </div>

              <CheckoutButton onClick={() => handleAddProductToCart(product)}>
                <Handbag size={32} weight="bold" />
              </CheckoutButton>
            </ProductFooter>
          </ProductCard>
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

    const price = defaultPrice.unit_amount && defaultPrice.unit_amount / 100;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
      priceId: defaultPrice.id,
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

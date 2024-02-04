import React, { useContext, useState } from "react";

import { CheckoutContext, Product } from "@/contexts/CheckoutContext";
import { FormatPriceBrl } from "@/helpers/FormatPriceBrl";
import { stripe } from "@/lib/Stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";

interface ProductProps {
  productData: Product;
}

export default function ProductDetail({ productData }: ProductProps) {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  const { addProductToCart, cart } = useContext(CheckoutContext);

  const isProductInCart = cart.some((item) => item.id === productData.id);

  const buttonLabel = `${
    isProductInCart ? "Produto já adicionado a sacola 🎉" : "Colocar na sacola"
  }`;

  const isButtonDisabled = isLoadingCheckout || isProductInCart;

  const handleBuyProduct = () => {
    setIsLoadingCheckout(true);

    addProductToCart(productData);

    setIsLoadingCheckout(false);
  };

  return (
    <>
      <Head>
        <title>{productData.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={productData.imageUrl}
            alt={productData.name}
            width={520}
            height={480}
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{productData.name}</h1>
          <span>{FormatPriceBrl(productData.price)}</span>

          <p>{productData.description}</p>

          <button
            disabled={isButtonDisabled}
            onClick={() => handleBuyProduct()}
          >
            {buttonLabel}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_NNRU2hL8xKlBFw" } }, { params: { id: "prod_NNRTyzvWSy1WrY" } }, { params: { id: "prod_NNRTtdC1hhwWxq" } }, { params: {id: "prod_NNRSixwaFujpvS"}}],
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId!, {
    expand: ["default_price"],
  });

  const defaultPrice = product.default_price as Stripe.Price;

  const price = defaultPrice.unit_amount && defaultPrice.unit_amount / 100;

  const productData = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price,
    priceId: defaultPrice.id,
    description: product.description,
  } as Product;

  return {
    props: {
      productData,
    },

    // 2 hours refresh
    revalidate: 60 * 60 * 1,
  };
};

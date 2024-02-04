import React, { useContext, useState } from "react";

import { CheckoutContext, Product } from "@/contexts/CheckoutContext";
import { FormatPriceBrl } from "@/helpers/FormatPriceBrl";
import { stripe } from "@/lib/Stripe";
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  let productData: Product | null = null;

  try {
    const product = await stripe.products.retrieve(productId!, {
      expand: ["default_price"],
    });

    const defaultPrice = product.default_price as Stripe.Price;
    const price = defaultPrice.unit_amount ? defaultPrice.unit_amount / 100 : 0;

    productData = {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price,
      priceId: defaultPrice.id,
      description: product.description!,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    // Handle errors or invalid product ID scenarios
    // For example, you might want to redirect to a custom error page or the homepage
  }

  // If no product data could be retrieved, you could redirect the user or return an error page
  if (!productData) {
    return {
      redirect: {
        destination: "/error-page", // Adjust the destination as needed
        permanent: false,
      },
    };
  }

  return {
    props: {
      productData,
    },
  };
};
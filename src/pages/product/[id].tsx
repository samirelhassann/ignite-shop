import React, { useState } from "react";

import { stripe } from "@/lib/Stripe";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  defaultPriceId: string;
  description: string;
}

interface ProductProps {
  productData: Product;
}

export default function Product({ productData }: ProductProps) {
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

  const handleBuyProduct = async () => {
    setIsLoadingCheckout(true);

    try {
      const response = await axios.post("/api/checkout", {
        priceId: productData.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsLoadingCheckout(false);
      alert("Falha ao realizar a compra");
    }
  };

  return (
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
        <span>{productData.price}</span>

        <p>{productData.description}</p>

        <button disabled={isLoadingCheckout} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_NNRU2hL8xKlBFw" } }],
    fallback: true,
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

  const price =
    defaultPrice.unit_amount &&
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(defaultPrice.unit_amount / 100);

  const productData = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price,
    defaultPriceId: defaultPrice.id,
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

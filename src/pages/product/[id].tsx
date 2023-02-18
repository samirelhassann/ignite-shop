import React from "react";

import { useRouter } from "next/router";

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";

export default function Product() {
  const { query } = useRouter();
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,99</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere aut
          reprehenderit sequi doloribus ut numquam vel aspernatur nostrum
          laudantium quo ab cupiditate illum, molestias esse officiis at, quod
          ducimus libero.
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

import React from "react";

import { stripe } from "@/lib/Stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import {
  ImageContainer,
  ImagesList,
  SuccessContainer,
} from "@/styles/pages/success";

import logoImg from "../assets/logo.svg";


interface SuccessSessionProduct {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
  customerName: string;
  product: SuccessSessionProduct;
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <Image className="logoImage" src={logoImg} alt="logo" />

        <ImagesList>
          <ImageContainer>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={140}
              height={140}
            />
          </ImageContainer>
          <ImageContainer>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={140}
              height={140}
            />
          </ImageContainer>
          <ImageContainer>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={140}
              height={140}
            />
          </ImageContainer>
        </ImagesList>

        <h1>Compra Efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{"  "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const sessionId = query.session_id as string;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session?.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
      hideHeader: true,
    },
  };
};

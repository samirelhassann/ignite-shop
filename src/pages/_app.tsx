import React from "react";

import type { AppProps } from "next/app";
import Image from "next/image";

import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";

import logoImg from "../assets/logo.svg";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="logo" width={129.74} height={52} />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}

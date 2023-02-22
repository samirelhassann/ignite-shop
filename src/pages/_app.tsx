import React from "react";

import CheckoutContextProvider from "@/contexts/CheckoutContext";
import type { AppProps } from "next/app";

import { globalStyles } from "@/styles/global";
import { Container } from "@/styles/pages/app";

import Header from "@/components/Header";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CheckoutContextProvider>
        {!pageProps.hideHeader && <Header />}

        <Component {...pageProps} />
      </CheckoutContextProvider>
    </Container>
  );
}

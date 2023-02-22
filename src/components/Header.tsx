import React, { useContext } from "react";

import { CheckoutContext } from "@/contexts/CheckoutContext";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { Handbag } from "phosphor-react";

import {
  CheckoutButton,
  HeaderContainer,
  ProductCounter,
} from "@/styles/components/header";

import logoImg from "../assets/logo.svg";

import CartDetailsModal from "./CartDetailsModal";

const Header = () => {
  const { totalItems } = useContext(CheckoutContext);

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg.src} alt="logo" width={129.74} height={52} />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <CheckoutButton>
            <Handbag size={24} weight="bold" />
            {totalItems > 0 && (
              <ProductCounter>
                <span>{totalItems}</span>
              </ProductCounter>
            )}
          </CheckoutButton>
        </Dialog.Trigger>

        <CartDetailsModal />
      </Dialog.Root>
    </HeaderContainer>
  );
};

export default Header;

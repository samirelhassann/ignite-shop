import React, { useContext } from "react";

import { CheckoutContext } from "@/contexts/CheckoutContext";
import { FormatPriceBrl } from "@/helpers/FormatPriceBrl";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X } from "phosphor-react";

import {
  QuantityLabel,
  CartContainer,
  CartDetails,
  Close,
  Content,
  TotalsArea,
  TotalLabel,
  ProductList,
  ProductCard,
  ProductImageContainer,
  ProductDetails,
} from "@/styles/components/cartDetailsModal";

const CartDetailsModal = () => {
  const {
    cart,
    totalItems,
    productsTotalAmount,
    removeProductFromCart,
    submitOrder,
  } = useContext(CheckoutContext);

  const hasAnyProduct = cart.length > 0;

  const itensLabel = `${totalItems} ${totalItems === 1 ? "item" : "itens"}`;

  const handleRemoveProduct = (productId: string) => {
    removeProductFromCart(productId);
  };

  const handleCheckout = () => {
    submitOrder();
  };

  return (
    <Dialog.Portal>
      <Content>
        <Dialog.Close asChild>
          <Close>
            <X size={24} />
          </Close>
        </Dialog.Close>

        <CartContainer>
          <h2>Sacola de compras</h2>
          <CartDetails>
            <ProductList>
              {cart.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImageContainer>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={94}
                      height={94}
                    />
                  </ProductImageContainer>

                  <ProductDetails>
                    <span>{product.name}</span>
                    <span className="amount">
                      {FormatPriceBrl(product.price)}
                    </span>
                    <button onClick={() => handleRemoveProduct(product.id)}>
                      Remover
                    </button>
                  </ProductDetails>
                </ProductCard>
              ))}
            </ProductList>

            <TotalsArea>
              <QuantityLabel>
                <span className="label">Quantidade</span>
                <span className="value">{itensLabel}</span>
              </QuantityLabel>
              <TotalLabel>
                <span className="label">Valor total</span>
                <span className="value">
                  {FormatPriceBrl(productsTotalAmount)}
                </span>
              </TotalLabel>
              <button
                disabled={!hasAnyProduct}
                onClick={() => handleCheckout()}
              >
                Finalizar compra
              </button>
            </TotalsArea>
          </CartDetails>
        </CartContainer>
      </Content>
    </Dialog.Portal>
  );
};

export default CartDetailsModal;

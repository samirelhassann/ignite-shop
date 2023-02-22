import * as Dialog from "@radix-ui/react-dialog";

import { styled } from "..";

export const Content = styled(Dialog.Content, {
  minWidth: "30rem",
  height: "100vh",
  background: "$gray800",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",

  position: "fixed",
  top: "50%",
  left: "100%",
  transform: "translate(-100%, -50%)",
});

export const Close = styled(Dialog.Close, {
  position: "absolute",
  background: "transparent",
  border: 0,
  top: "1.5rem",
  right: "1.5rem",
  lineHeight: 0,

  cursor: "pointer",
  color: "$gray500",
});

export const CartContainer = styled("div", {
  padding: "4.5rem 3rem 3rem 3rem",
  height: "calc(100vh - 12.5rem)",

  h2: {
    fontWeight: 700,
    fontSize: "$lg",
    lineHeight: "160%",
    marginBottom: "2rem",
  },
});

export const CartDetails = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const TotalsArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: ".4375rem",

  button: {
    border: 0,
    marginTop: "3.25rem",

    borderRadius: 8,
    padding: "1.25rem 2rem",
    background: "$green500",
    color: "$white",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "160%",
    cursor: "pointer",

    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },

    "&:hover": {
      background: "$green300",
    },
  },
});

export const AmountLabel = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  lineHeight: "160%",
});

export const QuantityLabel = styled(AmountLabel, {
  ".label": {
    color: "$gray100",
    fontWeight: 400,
    fontSize: "$sm",
  },

  ".value": {
    color: "$gray300",
    fontWeight: 400,
    fontSize: "$md",
  },
});

export const TotalLabel = styled(AmountLabel, {
  ".label": {
    color: "$gray100",
    fontWeight: 700,
    fontSize: "$md",
  },

  ".value": {
    color: "$gray300",
    fontWeight: 700,
    fontSize: "$xl",
  },
});

export const ProductList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const ProductCard = styled("div", {
  display: "flex",
  gap: "1.25rem",
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  lineHeight: "160%",

  span: {
    fontSize: "$md",
    color: "$gray300",
  },

  ".amount": {
    fontWeight: 700,
    color: "$gray100",
  },

  button: {
    marginTop: ".5rem",
    width: "fit-content",
    border: 0,
    background: "transparent",
    color: "$green500",
    fontWeight: 700,
    fontSize: "$sm",
    cursor: "pointer",

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ProductImageContainer = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  width: "6.3712rem",
  height: "5.8125rem",
});

import { styled } from "..";

export const HeaderContainer = styled("header", {
  padding: "2rem",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
});

export const CheckoutButton = styled("button", {
  border: 0,
  padding: ".75rem",
  background: "$gray800",
  borderRadius: 6,
  cursor: "pointer",

  svg: {
    color: "$gray500",
  },
});

export const ProductCounter = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  padding: "2px 8px",
  backgroundColor: "$green500",
  borderRadius: "50%",
  border: "3px solid $gray900",

  marginTop: "-3rem",
  marginLeft: "1.25rem",

  span: {
    color: "$white",
    fontWeight: 700,
    fonstSize: "$2sm",
    lineHeight: "160%",
  },
});

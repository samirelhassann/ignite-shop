import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: 656,
  margin: "0 auto",

  ".logoImage": {
    marginBottom: "6.5rem",
  },

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    marginTop: "2rem",
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
  },

  a: {
    marginTop: "5rem",
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",
    lineHeight: 1.4,

    "&:hover": {
      color: "$green300",
    },
  },
});

export const ImagesList = styled("div", {
  display: "flex",
  marginLeft: "3.4375rem",
  marginBottom: "4rem",
});

export const ImageContainer = styled("div", {
  marginLeft: "-3.4375rem",

  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%",
  padding: "0.25rem",
  boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.8)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});

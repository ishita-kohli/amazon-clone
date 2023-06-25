import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as AuthProvider } from "next-auth/client";
import {
  CartContextProvider,
  cartReducer,
  initialCartState,
} from "../contexts/cart";
import { useReducer } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const cartContextValues = {
    cartState,
    cartDispatch,
  };

  return (
    <CartContextProvider value={cartContextValues} >
      <AuthProvider session={pageProps.session}>
        <Component {...pageProps} />
      </AuthProvider>
    </CartContextProvider>
  );
}
export default MyApp;

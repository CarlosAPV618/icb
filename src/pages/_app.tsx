import { type AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ProductsProvider } from "../context";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ProductsProvider>
      <Component {...pageProps} />
    </ProductsProvider>
  );
};

export default trpc.withTRPC(MyApp);

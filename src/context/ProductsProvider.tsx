import { useContext, useReducer } from "react";
import { ProductsInitialState, ProductsContext, productsReducer } from "./";
import type { FC, ReactNode } from "react";
import type { Product } from "@prisma/client";
import { trpc } from "../utils/trpc";

export interface ProductsState {
  products: Product[];
}

interface Props {
  children: ReactNode;
}

export const ProductsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, ProductsInitialState);

  const createNewProduct = trpc.products.createProduct.useMutation();

  return (
    <ProductsContext.Provider value={{ ...state }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);

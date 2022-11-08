/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useContext, useEffect, useReducer } from "react";
import { trpc } from "../utils/trpc";
import { ProductsInitialState, ProductsContext, productsReducer } from "./";

import type { FC, ReactNode } from "react";
import type { Product } from "@prisma/client";
import type { NewProduct } from "../interfaces/product";

export interface ProductsState {
  products: Product[];
}

interface Props {
  children: ReactNode;
}

export const ProductsProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, ProductsInitialState);

  const products = trpc.products.getAllProducts.useQuery();
  products.data;

  const postProduct = trpc.products.createProduct.useMutation();
  const putProduct = trpc.products.editProduct.useMutation();
  const delProduct = trpc.products.deleteProduct.useMutation();

  const getProduct = useCallback(
    (id: string) => state.products.find((product) => product.id === id),
    [state.products]
  );

  const createNewProduct = (data: NewProduct) => {
    postProduct.mutate(data);

    dispatch({ type: "Create Product", payload: postProduct.data! });
  };

  const editProduct = (id: string, data: Partial<Product>) => {
    putProduct.mutate({ ...data, id });

    dispatch({ type: "Edit Product", payload: { ...data, id } });
  };

  const deleteProduct = (id: string) => {
    delProduct.mutate({ id });

    dispatch({ type: "Delete Product", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "Get Products", payload: products.data! });
  }, [products.data]);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        getProduct,
        createNewProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);

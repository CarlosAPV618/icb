import type { Product } from "@prisma/client";
import type { ProductsState } from "./";

type ProductsActionType =
  | { type: "Get Products"; payload: Product[] }
  | { type: "Create Product"; payload: Product }
  | { type: "Edit Product"; payload: Partial<Product> }
  | { type: "Delete Product"; payload: string };

export const ProductsInitialState: ProductsState = {
  products: [],
};

export const productsReducer = (
  state: ProductsState,
  action: ProductsActionType
): ProductsState => {
  switch (action.type) {
    case "Get Products":
      return {
        // Dejo este spread por si mas adelante necesito agregar mas propiedades
        // al reducer
        ...state,
        products: action.payload,
      };

    case "Create Product":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "Edit Product":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, ...action.payload }
            : product
        ),
      };

    case "Delete Product":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

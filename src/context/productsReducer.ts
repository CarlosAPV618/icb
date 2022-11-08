import type { Product } from "@prisma/client";
import type { ProductsState } from "./";

type ProductsActionType =
  | { type: "Get Products" }
  | { type: "Create Product"; payload: Product }
  | { type: "Edit Product"; payload: Product }
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
        ...state,
      };

    default:
      return state;
  }
};

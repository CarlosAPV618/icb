import { createContext } from "react";

import type { Product } from "@prisma/client";

interface ContextProps {
  products: Product[];
  createNewProduct: any;
  editProduct: any;
  deleteProduct: any;
}

export const ProductsContext = createContext({} as ContextProps);

import { createContext } from "react";

import type { Product } from "@prisma/client";
import type { NewProduct } from "../interfaces/product";

interface ContextProps {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  createNewProduct: (data: NewProduct) => void;
  editProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

export const ProductsContext = createContext({} as ContextProps);

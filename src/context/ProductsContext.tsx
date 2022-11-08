import { createContext } from "react";

import type { Product } from "@prisma/client";

interface ContextProps {
  products: Product[];
}

export const ProductsContext = createContext({} as ContextProps);

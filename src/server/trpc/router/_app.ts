import { router } from "../trpc";
import { auth, cart, products } from "./";

export const appRouter = router({
  auth,
  cart,
  products,
});

// export type definition of API
export type AppRouter = typeof appRouter;

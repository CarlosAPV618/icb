import { router } from "../trpc";
import { auth, products } from "./";

export const appRouter = router({
  auth,
  products,
});

// export type definition of API
export type AppRouter = typeof appRouter;

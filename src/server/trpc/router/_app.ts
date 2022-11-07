import { router } from "../trpc";
import { exampleRouter } from "./example";
import { auth } from "./auth";

export const appRouter = router({
  example: exampleRouter,
  auth,
});

// export type definition of API
export type AppRouter = typeof appRouter;

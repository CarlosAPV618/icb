import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const auth = router({
  register: publicProcedure
    .input(
      z
        .object({
          name: z.string().nullish(),
          email: z.string().email().nullish(),
          password: z.string().nullish(),
        })
        .nullish()
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { name, email, password } = input || {};

      if (!name || !email || !password) return false;

      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (existingUser) {
        return false;
      }

      await prisma.user.create({ data: { name, email, password } });

      return true;
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { email, password } = input || {};

      if (!email || !password) return false;

      const existingUser = await prisma.user.findFirst({
        where: { email, password },
      });

      if (!existingUser) {
        return false;
      }

      return true;
    }),
});

import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const cart = router({
  getItems: publicProcedure
    .input(
      z
        .object({
          cart: z.array(
            z.object({ productId: z.string(), quantity: z.number() })
          ),
        })
        .nullish()
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { cart } = input || {};

      const products = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        cart!.map((item) => {
          return prisma.product.findFirst({
            where: { id: item.productId },
          });
        })
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data = cart!.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const product = products.find((p) => p?.id === item.productId)!;

        return {
          id: product.id,
          name: product.name,
          quantity: item.quantity,
          total: product.price * item.quantity,
          price: product.price,
        };
      });

      return data;
    }),
});

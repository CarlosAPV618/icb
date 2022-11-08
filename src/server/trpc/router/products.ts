import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { toSlug } from "../../../helpers/toSlug";

import { router, publicProcedure } from "../trpc";

export const products = router({
  createProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        stock: z.number(),
        price: z.number(),
        image: z.string().nullish(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { name, stock, price, image = null, description } = input;

      if (!name || !stock || !price || !description)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have to provide all data",
        });

      await prisma.product.create({
        data: {
          name,
          stock,
          price,
          description,
          slug: toSlug(name),
          ...(image ? { image } : {}),
        },
      });

      return true;
    }),
  getAllProducts: publicProcedure.query(async ({ ctx: { prisma } }) => {
    return await prisma.product.findMany({ where: { isDeleted: false } });
  }),
  editProduct: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullish(),
        stock: z.number().nullish(),
        price: z.number().nullish(),
        image: z.string().nullish(),
        description: z.string().nullish(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { id, name, stock, price, image, description } = input;

      if (!id)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No product found with id ${id}`,
        });

      const product = await prisma.product.findFirstOrThrow({ where: { id } });

      await prisma.product.update({
        where: { id },
        data: {
          ...(name && name !== product.name
            ? { name, slug: toSlug(name) }
            : {}),

          ...(stock && +stock !== product.stock ? { stock: +stock } : {}),
          ...(price && +price !== product.price ? { price: +price } : {}),
          ...(image && image !== product.image ? { image } : {}),
          ...(description && description !== product.description
            ? { description }
            : {}),
        },
      });

      return true;
    }),
  deleteProduct: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { id } = input;
      await prisma.product.findFirstOrThrow({
        where: { id },
      });

      await prisma.product.update({ where: { id }, data: { isDeleted: true } });

      return true;
    }),
});

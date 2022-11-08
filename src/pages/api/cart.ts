/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";
import type { Cart } from "../../interfaces/cart";

type Data =
  | {
      id: string;
      name: string;
      quantity: number;
      total: number;
      price: number;
    }[]
  | { message: string };

const cart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "POST":
      const { cart } = JSON.parse(req.body) as { cart: Cart };

      if (!cart) return res.status(404).json({ message: "No cart found" });

      const products = await Promise.all(
        cart.map((item) => {
          return prisma.product.findFirst({
            where: { id: item.productId },
          });
        })
      );

      const data = cart.map((item) => {
        const product = products.find((p) => p?.id === item.productId)!;

        return {
          id: product.id,
          name: product.name,
          quantity: item.quantity,
          total: product.price * item.quantity,
          price: product.price,
        };
      });

      return res.json(data);

    default:
      res.status(500).json({ message: "Internal server error" });
  }
};

export default cart;

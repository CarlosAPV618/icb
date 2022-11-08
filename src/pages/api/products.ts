import { type NextApiRequest, type NextApiResponse } from "next";
import type { Product } from "@prisma/client";

import { prisma } from "../../server/db/client";

type Data = { message?: string; product: Product | null } | Product[];

const products = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case "GET":
      const { slug } = req.query;

      if (slug) {
        const product = await prisma.product.findFirst({
          where: { slug: slug as string },
        });

        if (!product)
          return res
            .status(404)
            .json({ message: "Product not found", product: null });

        return res.json({ product });
      }

      const products = await prisma.product.findMany();
      return res.json(products);

    default:
      res.status(500).json({ message: "Internal server error", product: null });
  }
};

export default products;

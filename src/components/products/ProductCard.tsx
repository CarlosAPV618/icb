import { useRouter } from "next/router";
import Image from "next/image";
import { Card } from "../ui/Card";

import type { FC } from "react";
import type { Product } from "@prisma/client";

interface Props {
  product: Product;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer"
      onClick={() => {
        router.push(`/products${product.slug}`);
      }}
    >
      <div className="flex flex-col items-center gap-y-3">
        <h3 className="font-semibold">{product.name}</h3>
        <div className="h-24 w-24">
          <Image
            src={product.image}
            alt="Product"
            width={80}
            height={80}
            className="h-full w-full"
          />
        </div>
        <p className="font-semibold">${product.price / 100} MXN</p>
      </div>
    </Card>
  );
};

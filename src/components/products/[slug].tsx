import { trpc } from "../../utils/trpc";

import type { GetStaticPaths } from "next";

export const Product = () => {
  return <div>Product</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  const products = trpc.products.getAllProducts.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  console.log(products.data);

  return {
    paths: products.data?.map((p) => ({ params: p.slug })),
    fallback: "blocking",
  };
};

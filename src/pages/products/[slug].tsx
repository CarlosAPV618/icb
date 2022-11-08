import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { MainLayout } from "../../components/layout/MainLayout";
import { Alert, Card } from "../../components/ui";

import { Product } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useProductsContext } from "../../context";
import { AddToCart } from "../../components/cart/AddToCart";

interface Props {
  product: Product;
}

const Product: NextPage<Props> = ({ product }) => {
  const [alert, setAlert] = useState("");
  const { deleteProduct } = useProductsContext();

  const router = useRouter();

  const editItem = (productId: string) => {
    router.push({ pathname: "/products/new", query: { product: productId } });
  };

  const deleteItem = (productId: string) => {
    deleteProduct(productId);
    router.push("/");
  };

  return (
    <MainLayout>
      {alert ? <Alert label={alert} type="success" /> : null}

      <Card className="min-h-[33rem] p-6">
        <div className="grid grid-cols-2">
          <div className="space-y-10 font-semibold">
            <h2 className="text-xl text-stone-800">{product.name}</h2>

            <div>
              <Image
                src={product.image}
                alt="Product"
                width={100}
                height={100}
                className="mx-auto h-64 w-64 rounded-xl border p-5"
              />
            </div>

            <div className="space-y-4 text-center">
              <div>
                <p>${product.price / 100} MXN</p>
                <p className="font-normal">
                  {product.stock} piezas en existencia
                </p>
              </div>

              <AddToCart
                setAlert={setAlert}
                productId={product.id}
                stock={product.stock}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="min-h-[20rem] rounded-lg bg-stone-200 p-5">
              <h3 className="text-xl font-semibold">
                Descripción del artículo
              </h3>
              <div className="p-2">{product.description}</div>
            </div>

            <div className="flex justify-end gap-x-2">
              <button
                className="rounded bg-blue-400 p-3 text-white"
                onClick={() => editItem(product.id)}
              >
                <FontAwesomeIcon icon={faPen} />
                <p>Editar producto</p>
              </button>

              <button
                className="rounded bg-red-400 p-3 text-white"
                onClick={() => deleteItem(product.id)}
              >
                <FontAwesomeIcon icon={faXmarkCircle} />
                <p>Eliminar producto</p>
              </button>
            </div>
          </div>
        </div>
      </Card>
    </MainLayout>
  );
};

export default Product;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const slug = ("/" + ctx.params!.slug) as string;

  const request = await fetch(
    `http://localhost:3000/api/products?slug=${slug}`
  );
  const { product }: { product: Product } = await request.json();

  if (!product)
    return {
      notFound: true,
    };

  return {
    props: { product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const request = await fetch("http://localhost:3000/api/products");
  const products = await request.json();

  return {
    paths: products.map(({ slug }: { slug: string }) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

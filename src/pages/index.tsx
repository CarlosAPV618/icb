import { useRouter } from "next/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainLayout } from "../components/layout/MainLayout";
import { ProductsContainer } from "../components/products";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="flex w-full justify-end">
        <button
          className="mb-3 space-x-2 rounded bg-blue-500 p-3 font-semibold text-white"
          onClick={() => {
            router.push("/products/new");
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar producto</span>
        </button>
      </div>

      <ProductsContainer />
    </MainLayout>
  );
};

export default Home;

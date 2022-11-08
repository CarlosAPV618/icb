import { useRouter } from "next/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainLayout } from "../components/layout/MainLayout";
import { ProductCard } from "../components/ui";

import type { NextPage } from "next";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from frontend" });
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

      <ProductCard />
    </MainLayout>
  );
};

export default Home;

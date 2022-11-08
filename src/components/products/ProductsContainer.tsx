import { useProductsContext } from "../../context";
import { ProductCard } from "./ProductCard";

export const ProductsContainer = () => {
  const { products } = useProductsContext();

  return (
    <div className="grid grid-cols-4 gap-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

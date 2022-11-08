import { useEffect, useState } from "react";
import { MainLayout } from "../components/layout/MainLayout";
import { Card } from "../components/ui";

import type { FC } from "react";
import { ListItems } from "../components/cart/ListItems";

interface Item {
  id: string;
  name: string;
  quantity: number;
  total: number;
  price: number;
}

const Cart: FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const req = async () => {
      const request = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        body: JSON.stringify({ cart }),
      });

      const cartItems = await request.json();

      setItems(cartItems);
    };

    req();
  }, []);

  return (
    <MainLayout>
      <h2 className="mb-6 text-center text-2xl font-semibold text-stone-800">
        Mi carrito
      </h2>
      <Card className="mx-56 p-6 text-center">
        {items?.length > 0 ? (
          <ListItems items={items} />
        ) : (
          <h3>Aún no tienes artículos en tu carrito</h3>
        )}
      </Card>
    </MainLayout>
  );
};

export default Cart;

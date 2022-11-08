import type { FC } from "react";

interface Item {
  id: string;
  name: string;
  quantity: number;
  total: number;
  price: number;
}

interface Props {
  items: Item[];
}

export const ListItems: FC<Props> = ({ items }) => {
  const total = items.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div>
      <div className="mb-5 grid grid-cols-4 font-semibold">
        <p>Producto</p>
        <p>Precio unitario</p>
        <p>Cantidad</p>
        <p>Total</p>
      </div>

      {items.map((i, index) => (
        <div
          key={i.id}
          className={`grid grid-cols-4 rounded border-b p-3 ${
            index % 2 === 0 ? "bg-stone-200" : ""
          }`}
        >
          <p>{i.name}</p>
          <p>${i.price / 100}</p>
          <p>{i.quantity}</p>
          <p>${i.total / 100}</p>
        </div>
      ))}

      <div className="mt-10">
        <p>
          Total a pagar: <span className="font-semibold">${total / 100}</span>
        </p>
      </div>
    </div>
  );
};

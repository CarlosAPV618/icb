import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import type { Dispatch, FC, SetStateAction } from "react";
import type { Cart } from "../../interfaces/cart";

interface Props {
  setAlert: Dispatch<SetStateAction<string>>;
  productId: string;
  stock: number;
}

export const AddToCart: FC<Props> = ({ setAlert, productId, stock }) => {
  const [quantity, setQuantity] = useState(1);

  const deleteItem = () => {
    if (quantity === 1) return;
    setQuantity((q) => q - 1);
  };

  const addItem = () => {
    setQuantity((q) => q + 1);
  };

  const addToCart = (productId: string) => {
    let cart: Cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
    }

    if (stock < quantity) {
      setAlert("No queda suficiente stock de este producto");

      setTimeout(() => {
        setAlert("");
      }, 2000);
      return;
    }

    const existingProduct = cart.find((item) => item.productId === productId);
    if (existingProduct)
      cart = cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    else cart.push({ productId, quantity });

    localStorage.setItem("cart", JSON.stringify(cart));

    setAlert("Producto añadido al carrito");

    setTimeout(() => {
      setAlert("");
    }, 2000);
  };
  return (
    <div className="flex justify-evenly gap-x-2">
      <div className="flex items-center gap-x-2 text-lg">
        <button
          className="h-10 w-10 rounded-full bg-stone-200"
          onClick={deleteItem}
        >
          -
        </button>
        <input
          type="text"
          disabled
          className="h-10 w-16 rounded-xl border text-center"
          value={quantity}
        />
        <button
          className="h-10 w-10 rounded-full bg-stone-200"
          onClick={addItem}
        >
          +
        </button>
      </div>

      <button
        className="rounded bg-black p-3 text-white"
        onClick={() => addToCart(productId)}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        <p>Agregar al carrito</p>
      </button>
    </div>
  );
};

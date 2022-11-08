import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProductsContext } from "../../context";
import { MainLayout } from "../../components/layout/MainLayout";
import { Alert, Card, Input } from "../../components/ui";

import type { ChangeEvent, FC, FormEvent } from "react";
import { NewProduct } from "../../interfaces/product";

const formTemplate = {
  name: "",
  stock: 0,
  price: 0,
  image: "",
  description: "",
};

const NewProduct: FC = () => {
  const [form, setForm] = useState<NewProduct>(formTemplate);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [alert, setAlert] = useState("");

  const { getProduct, createNewProduct, editProduct } = useProductsContext();

  const router = useRouter();

  const productId = router.query.product as string;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const hanldeSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = Object.keys(form).filter(
      (key) => !form[key as keyof typeof form]
    );

    if (errors.length > 0) {
      setFormErrors(errors);

      setTimeout(() => {
        setFormErrors([]);
      }, 2000);
    }

    const formattedForm = {
      ...form,
      price: +form.price * 100,
      stock: +form.stock,
    };

    if (productId) {
      editProduct(productId, formattedForm);
    } else {
      createNewProduct(formattedForm);
    }

    setForm(formTemplate);

    setAlert(productId ? "Producto actualizado" : "Producto creado");

    setTimeout(() => {
      setAlert("");
    }, 2000);

    router.push("/");
  };

  useEffect(() => {
    if (productId) {
      const product = getProduct(productId);

      if (!product) return;

      const { name, stock, price, image, description } = product;

      setForm({
        name,
        stock,
        price: price / 100,
        image,
        description,
      });
    }
  }, [productId, getProduct]);

  return (
    <MainLayout title="Agregar un nuevo producto">
      {alert ? <Alert label={alert} type="success" /> : null}

      <h2 className="text-xl font-semibold text-stone-800">
        {productId ? "Editar producto" : "Agregar un nuevo producto"}
      </h2>

      <Card className="mt-6 h-full p-6">
        <form onSubmit={hanldeSubmit}>
          <Input
            label="Nombre del producto"
            onChange={handleChange}
            value={form.name}
            name="name"
            error={formErrors.includes("name")}
          />

          <Input
            label="Stock"
            type="number"
            onChange={handleChange}
            value={form.stock}
            name="stock"
            error={formErrors.includes("stock")}
          />

          <Input
            label="Precio"
            type="number"
            onChange={handleChange}
            value={form.price}
            name="price"
            error={formErrors.includes("price")}
          />

          <Input
            label="Imagen (opcional)"
            onChange={handleChange}
            value={form.image}
            name="image"
            error={formErrors.includes("image")}
          />

          <div className="mt-4">
            <label
              className="mx-2 font-semibold text-stone-700"
              htmlFor="description"
            >
              Descripción del producto
            </label>
            <div>
              <textarea
                className={`w-full rounded p-3 shadow outline-none ${
                  formErrors.includes("description")
                    ? "border-red-500"
                    : "border"
                }`}
                name="description"
                onChange={handleChange}
                value={form.description}
              ></textarea>
            </div>
          </div>

          <div className="mt-4 flex w-full justify-end">
            <button
              className="flex items-center gap-x-2 rounded bg-blue-500 p-3 font-semibold text-white"
              type="submit"
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
              <p>Guardar</p>
            </button>
          </div>
        </form>
      </Card>
    </MainLayout>
  );
};

export default NewProduct;

import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Card, Input } from "../../components/ui";

import type { ChangeEvent, FC, FormEvent } from "react";

const formTemplate = {
  name: "",
  stock: "",
  price: "",
  image: "",
  description: "",
};

const NewProduct: FC = () => {
  const [form, setForm] = useState(formTemplate);
  const [formErrors, setFormErrors] = useState<string[]>([]);

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
  };

  return (
    <MainLayout title="Agregar un nuevo producto">
      <h2 className="text-xl font-semibold text-stone-800">
        Agregar un nuevo producto
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

import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

import type { FC, ChangeEvent, FormEvent } from "react";
import { Alert } from "./ui/Alert";
import Link from "next/link";

interface Props {
  type?: "register" | "login";
}

interface UserForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const inputClasses = "border rounded-full w-full p-3 outline-none my-1 shadow";

export const LoginModal: FC<Props> = ({ type = "login" }) => {
  const [form, setForm] = useState<UserForm>(initialFormState);

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [alert, setAlert] = useState("");

  const router = useRouter();

  const login = trpc.auth.login.useMutation();
  const register = trpc.auth.register.useMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let errors = Object.keys(form).filter(
      (key) => !form[key as keyof typeof form]
    );

    if (type === "login" && errors.includes("confirmPassword")) {
      errors = errors.filter((err) => err !== "confirmPassword");
    }

    if (errors.length > 0) {
      setFormErrors(errors);

      setTimeout(() => {
        setFormErrors([]);
      }, 2000);
      return;
    }

    if (type === "register") {
      if (form.password !== form.confirmPassword) {
        setAlert("Las contraseñas no coinciden");
        setTimeout(() => {
          setAlert("");
        }, 2000);
        return;
      }

      // eslint-disable-next-line
      const { confirmPassword, ...registerData } = form;
      register.mutate(registerData);

      if (!register.data) {
        setAlert("El usuario ya existe. Pueba con otro correo");
        return;
      }
    } else {
      const { email, password } = form;
      login.mutate({ email, password });

      if (!login.data) {
        setAlert("Usuario no encontrado");
        return;
      }
    }

    setForm(initialFormState);
    router.push("/");

    return;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-stone-900 py-16 px-20 md:px-52">
      {alert && <Alert label={alert} type="danger" />}
      <div className="w-56 rounded-xl bg-white p-5 md:w-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-2xl font-semibold text-slate-700">
            {type === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </h2>

          <div className="mx-5 space-y-3">
            <div>
              <label htmlFor="name">Nombre</label>
              <input
                className={`${inputClasses} ${
                  formErrors.includes("name") && "border-red-500"
                }`}
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                className={`${inputClasses} ${
                  formErrors.includes("email") && "border-red-500"
                }`}
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password">Contraseña</label>
              <input
                className={`${inputClasses} ${
                  formErrors.includes("password") && "border-red-500"
                }`}
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {type === "register" ? (
              <div>
                <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                <input
                  className={`${inputClasses} ${
                    formErrors.includes("confirmPassword") && "border-red-500"
                  }`}
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            ) : null}

            <div className="flex w-full items-center justify-end gap-x-3">
              {type === "login" ? (
                <Link href="/register" className="text-stone-800">
                  ¿No tienes cuenta? Crea una aquí
                </Link>
              ) : null}

              <button
                type="submit"
                className="w-20 rounded bg-stone-800 p-3 font-semibold text-white"
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

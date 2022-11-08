import type { FC } from "react";

interface Props {
  value: string | number;
  name: string;
  // eslint-disable-next-line
  onChange: (e: any) => void;
  label?: string;
  type?: "text" | "number" | "password" | "email" | "date";
  error?: boolean;
  errorMessage?: string;
}

export const Input: FC<Props> = ({
  value,
  onChange,
  label,
  name,
  type = "text",
  error = false,
  errorMessage,
}) => {
  return (
    <div>
      <div className="flex">
        <label
          htmlFor={name}
          className={`mx-2 font-semibold ${
            error ? "text-red-400" : "text-stone-700"
          }`}
        >
          {label}
        </label>

        {error && (
          <p className="text-red-400">
            {errorMessage || "Este campo es obligatorio"}
          </p>
        )}
      </div>

      <input
        placeholder={label}
        type={type}
        className={`my-1 w-full rounded-full border p-3 shadow outline-none ${
          error && "border-red-400 placeholder:text-red-300"
        }`}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete="off"
      />
    </div>
  );
};

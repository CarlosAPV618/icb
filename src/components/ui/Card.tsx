import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e?: any) => void;
}

export const Card: FC<Props> = ({ children, className, onClick }) => {
  return (
    <div
      className={`rounded-xl border bg-white p-3 shadow ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

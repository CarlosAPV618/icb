import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Card: FC<Props> = ({ children, className }) => {
  return (
    <div className={`rounded-xl border bg-white p-3 shadow ${className}`}>
      {children}
    </div>
  );
};

import Head from "next/head";
import { Navbar } from "../ui";

import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
}

export const MainLayout: FC<Props> = ({
  children,
  title = "Mini E-commerce",
}) => {
  return (
    <div className="min-h-screen bg-stone-100">
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />

      <main className="h-full px-20 py-7">{children}</main>
    </div>
  );
};

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <div className="flex h-16 w-full items-center justify-between bg-stone-900 px-10 text-2xl font-semibold text-white">
      <Link href="/">
        <h1>e-commerce</h1>
      </Link>

      <Link href="/login" className="flex items-center gap-x-2 text-lg">
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        <p>Cerrar sesión</p>
      </Link>
    </div>
  );
};

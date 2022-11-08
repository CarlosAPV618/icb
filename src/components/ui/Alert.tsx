import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classNames } from "../../helpers/classNames";

import type { FC } from "react";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface Props {
  type: "success" | "danger";
  label: string;
}

export const Alert: FC<Props> = ({ type, label }) => {
  const icon: IconDefinition =
    type === "success" ? faCircleCheck : faCircleExclamation;

  const color = classNames(
    type === "success" && "bg-emerald-500",
    type === "danger" && "bg-red-400"
  );

  return (
    <div className="fixed top-5 right-5 z-50 flex rounded-lg bg-white pr-5">
      <div
        className={`${color} my-auto rounded-l-lg px-6 py-5 text-3xl text-white`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="my-auto ml-3 text-black">{label}</p>
    </div>
  );
};

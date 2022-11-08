export const toSlug = (src: string) => {
  return src
    .toLowerCase()
    .split("")
    .map((letter) => {
      if (letter === " ") return "-";
      if (letter === "á") return "a";
      if (letter === "é") return "e";
      if (letter === "í") return "i";
      if (letter === "ó") return "o";
      if (letter === "ú") return "u";

      return letter;
    })
    .join("");
};

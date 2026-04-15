import { sortImages } from "./mediaUtils";

export const notacomImages = sortImages(
  import.meta.glob("../../assets/img/notacom/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

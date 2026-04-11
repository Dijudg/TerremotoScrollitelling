import { sortImages } from "./mediaUtils";

export const chronicle2Images = sortImages(
  import.meta.glob("../../assets/img/Cronica2/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

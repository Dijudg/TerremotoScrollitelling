import { sortImages } from "./mediaUtils";

export const chronicle1Images = sortImages(
  import.meta.glob("../../assets/img/Cronica1/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle1HorizontalImages = sortImages(
  import.meta.glob("../../assets/img/Cronica1/horizontal/web/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle1HorizontalMobileImages = sortImages(
  import.meta.glob("../../assets/img/Cronica1/horizontal/movil/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

import { sortImages } from "./mediaUtils";

export const chronicle3Images = sortImages(
  import.meta.glob("../../assets/img/Cronica3/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle3HorizontalImages = sortImages(
  import.meta.glob("../../assets/img/Cronica3/desktop/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle3HorizontalMobileImages = sortImages(
  import.meta.glob("../../assets/img/Cronica3/movil/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

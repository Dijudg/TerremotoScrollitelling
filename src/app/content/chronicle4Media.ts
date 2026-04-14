import { sortImages } from "./mediaUtils";

export const chronicle4Images = sortImages(
  import.meta.glob("../../assets/img/Cronica4/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle4HorizontalImages = sortImages(
  import.meta.glob("../../assets/img/Cronica4/desktop/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle4HorizontalMobileImages = sortImages(
  import.meta.glob("../../assets/img/Cronica4/movil/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

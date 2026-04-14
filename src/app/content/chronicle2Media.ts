import { sortImages } from "./mediaUtils";

export const chronicle2Images = sortImages(
  import.meta.glob("../../assets/img/Cronica2/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle2HorizontalImages = sortImages(
  import.meta.glob("../../assets/img/Cronica2/desktop/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle2HorizontalMobileImages = sortImages(
  import.meta.glob("../../assets/img/Cronica2/movil/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

export const chronicle2ReconstructionImages = sortImages(
  import.meta.glob("../../assets/img/Cronica2/reconstruccion/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
    eager: true,
    import: "default",
  }) as Record<string, string>,
);

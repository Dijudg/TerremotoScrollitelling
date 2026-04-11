export type GalleryImage = {
  url: string;
  caption?: string;
};

export const sortImages = (modules: Record<string, string>) =>
  Object.entries(modules)
    .sort(([a], [b]) =>
      a.localeCompare(b, "es", { numeric: true, sensitivity: "base" }),
    )
    .map(([, url]) => url);

export const pickImage = (images: string[], index: number) =>
  images[index % images.length];

export const buildGallery = (
  images: string[],
  captions: string[],
  startIndex = 0,
): GalleryImage[] =>
  captions.map((caption, index) => ({
    url: pickImage(images, startIndex + index),
    caption,
  }));

import type { GalleryImage } from "./mediaUtils";

const imageModules = import.meta.glob("../../assets/img/1858/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageUrlByName = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [path.split("/").pop() ?? path, url]),
);

const getImageUrl = (fileName: string) => {
  const imageUrl = imageUrlByName[fileName];

  if (!imageUrl) {
    throw new Error(`Missing 18:58 gallery image: ${fileName}`);
  }

  return imageUrl;
};

const galleryItems = [
  {
    fileName: "160417034705_ecuador_earthquake_624x351_afp.jpg.webp",
    caption: "El sismo dejó viviendas y edificios destruidos",
    credit: "Crédito: AFP",
  },
  {
    fileName: "160417034930_ecuador_earthquake_624x351_afp.jpg.webp",
    caption: "Equipos de emergencia recorrieron las zonas afectadas tras el terremoto.",
    credit: "Crédito: AFP / BBC Mundo",
  },
  {
    fileName: "160417083125_terremoto_ecuador_624x351_afp_nocredit.jpg.webp",
    caption: "La destrucción se extendió por barrios enteros en Manabí.",
    credit: "Crédito: AFP / Archivo",
  },
  {
    fileName: "160417123927_terremoto_ecuador_624x351_afp_nocredit.jpg.webp",
    caption: "Los escombros marcaron el paisaje urbano después del 16 de abril de 2016.",
    credit: "Crédito: AFP / Archivo histórico",
  },
  {
    fileName: "160417181623_sismo_portoviejo_624x351_afp_nocredit.jpg.webp",
    caption: "Portoviejo fue una de las ciudades más golpeadas por el terremoto.",
    credit: "Crédito: AFP / Portoviejo",
  },
  {
    fileName: "160417182120_sismo_ecuador5_624x351_ap_nocredit.jpg.webp",
    caption: "La emergencia movilizó rescatistas, vecinos y voluntarios.",
    credit: "Crédito: AP",
  },
  {
    fileName: "160417192736_sismo_ecuador7_624x351_reuters_nocredit.jpg.webp",
    caption: "Las labores de búsqueda continuaron entre estructuras colapsadas.",
    credit: "Crédito: Reuters",
  },
  {
    fileName: "160418095210_ecuador_terremoto_624x351_getty.jpg.webp",
    caption: "La magnitud 7.8 transformó la memoria de una provincia completa.",
    credit: "Crédito: Getty Images",
  },
  {
    fileName: "26453656732_aeaf00f754_z-jefFDARIOYAGUALL.jpg",
    caption: "La huella del terremoto quedó registrada en calles, hoteles y viviendas.",
    credit: "Crédito: Jeff Dario Yaguall",
  },
  {
    fileName: "cnne-278535-160418165802-cnnee-pedernales-ecuador-terremoto-exlarge-169.webp",
    caption: "Pedernales, epicentro del sismo, concentró parte de los daños más graves.",
    credit: "Crédito: CNN en Español",
  },
  {
    fileName: "cnne-399150-ecuador-quake-aftermath.webp",
    caption: "El después del terremoto abrió una larga etapa de duelo y reconstrucción.",
    credit: "Crédito: CNN en Español / Archivo",
  },
  {
    fileName: "Milagritos1-foto deJeff Darío Yaguall,.jpg",
    caption: "Las historias de supervivencia también quedaron en los registros del desastre.",
    credit: "Crédito: Jeff Dario Yaguall / Milagritos",
  },
  {
    fileName: "WhatsApp Image 2026-04-09 at 5.14.09 PM (8).jpeg",
    caption: "Imagen de archivo incorporada al relato visual de la memoria del terremoto.",
    credit: "Crédito: archivo cedido",
  },
];

export const earthquake1858Gallery: GalleryImage[] = galleryItems.map(({ fileName, ...galleryItem }) => ({
  url: getImageUrl(fileName),
  ...galleryItem,
}));

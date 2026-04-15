import type { GalleryImage } from "./mediaUtils";
import milagritoA1Image from "../../assets/img/Cronica1/MilagritoA1.jpg";
import milagritos3Image from "../../assets/img/Cronica1/milagrito1.jpeg";
import portoviejoAfpImage from "../../assets/img/Cronica1/Portoviejo,ecuador-foto-AFP.jpg";
import rescueUnderHotelImage from "../../assets/img/Cronica1/rescate-bajohotel-Foto-ElDiariodeEcuador.jpg";

export const rescueGallery: GalleryImage[] = [
  {
    url: rescueUnderHotelImage,
    caption: "Equipos de rescate trabajaron entre los escombros del hotel El Gato.",
    credit: "Crédito: El Diario de Ecuador",
  },
  {
    url: milagritoA1Image,
    caption: "Pablo Cordoba sobrevivió bajo los escombros y su historia quedó como un milagro para su familia.",
    credit: "Crédito: archivo AFP",
  },
  {
    url: portoviejoAfpImage,
    caption: "Portoviejo quedo marcada por el colapso de edificios tras el terremoto.",
    credit: "Crédito: AFP",
  },
  {
    url: milagritos3Image,
    caption: "Pablo Cordoba, parado sobre el predio donde se encontraba el hotel El Gato, recuerda su experiencia durante el terremoto.",
    credit: "Crédito: Redacción Web",
  },
];

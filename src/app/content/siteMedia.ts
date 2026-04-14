import heroVideo from "../../assets/video-web_portada.mp4";
import earthquakeVideoDesktop from "../../assets/img/Cronica1/Video1-terremoto-desktop.mp4";
import earthquakeVideoMobile from "../../assets/img/Cronica1/Video1-terremoto-movil.mp4";
import pabloAudio from "../../assets/hermanovictima.wav?url";
import javierAudio from "../../assets/img/Cronica2/audio1.mp3.mpeg?url";
import earthquakePoster from "../../assets/img/Cronica1/MilagritoA1.jpg";
import pabloPortrait from "../../assets/img/Cronica1/PabloCordoba-portoviejo-milagritos.jpeg";
import javierPortrait from "../../assets/img/Cronica1/milagritos3.jpeg";
import johnPortrait from "../../assets/img/Cronica3/JohnVera-Historia2-manta.jpeg";
import bettyPortrait from "../../assets/img/Cronica3/BettyCedeno-Historia1-manta.jpeg";
import lauraPortrait from "../../assets/img/Cronica3/LauraPeralta-Historia3-manta.jpeg";
import chronicle4Portrait from "../../assets/img/Cronica4/IMG_1708.jpg";
import chronicle4Video from "../../assets/img/Cronica4/terremoto-testimonia-milagritos-ectv-movil.mp4";
import milagritosVideo from "../../assets/img/Cronica1/terremoto-testimonia-milagritos-ectv-movil.mp4";
import milagritosPhoneVideo from "../../assets/img/Cronica1/terremoto-testimonia-milagritos-ectv-phone.mp4";

export const featuredPortraits = {
  pablo: pabloPortrait,
  javier: javierPortrait,
  betty: bettyPortrait,
  john: johnPortrait,
  laura: lauraPortrait,
  chronicle4: chronicle4Portrait,
};

export const chronicleMenu = [
  {
    id: "cronica-1",
    label: "Cr\u00f3nica 1",
    title: "Pablo y el hotel",
    image: featuredPortraits.pablo,
  },
  {
    id: "cronica-2",
    label: "Cr\u00f3nica 2",
    title: "Javier",
    image: featuredPortraits.javier,
  },
  {
    id: "cronica-3",
    label: "Cr\u00f3nica 3",
    title: "Dos Tarquis",
    image: featuredPortraits.betty,
  },
  {
    id: "cronica-4",
    label: "Cr\u00f3nica 4",
    title: "Cr\u00f3nica 4",
    image: featuredPortraits.chronicle4,
  },
  {
    id: "nota-complemento-1",
    label: "Nota complemento 1",
    title: "Manab\u00ed, entre la necesidad y la corrupci\u00f3n",
    image: featuredPortraits.chronicle4,
  },
];

export const siteVideos = {
  hero: heroVideo,
  chronicle1Lead: earthquakeVideoDesktop,
  chronicle1LeadDesktop: earthquakeVideoDesktop,
  chronicle1LeadMobile: earthquakeVideoMobile,
  chronicle1Rescue: heroVideo,
  chronicle2Lead: milagritosVideo,
  chronicle2LeadMobile: milagritosPhoneVideo,
  chronicle3Lead: heroVideo,
  chronicle4Lead: chronicle4Video,
};

export const sitePosters = {
  earthquake: earthquakePoster,
};

export const siteAudio = {
  pablo: pabloAudio,
  javier: javierAudio,
};

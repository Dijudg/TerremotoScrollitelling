import heroVideo from "../../assets/video-web_portada.mp4";
import earthquakeVideoDesktop from "../../assets/img/Cronica1/Video1-terremoto-desktop.mp4";
import earthquakeVideoMobile from "../../assets/img/Cronica1/Video1-terremoto-movil.mp4";
import pabloAudio from "../../assets/hermanovictima.wav?url";
import javierAudio from "../../assets/img/Cronica2/Javier-pincay.mp4";
import earthquakePoster from "../../assets/img/Cronica1/MilagritoA1.jpg";
import pabloPortrait from "../../assets/img/Cronica1/PabloCordoba-portoviejo-milagritos.jpeg";
import javierPortrait from "../../assets/img/Cronica1/milagritos3.jpeg";
import johnPortrait from "../../assets/img/Cronica3/JohnVera-Historia2-manta.jpg";
import bettyPortrait from "../../assets/img/Cronica3/BettyCedeno-Historia1-manta.jpg";
import lauraPortrait from "../../assets/img/Cronica3/LauraPeralta-Historia3-manta.jpeg";
import chronicle4Portrait from "../../assets/img/Cronica4/IMG_1708.jpg";
import chronicle4Video from "../../assets/img/Cronica4/terremoto-testimonia-milagritos-ectv-phone3.mp4";
import milagritosPhoneVideo from "../../assets/img/Cronica1/terremoto-testimonia-milagritos-ectv-phone.mp4";
import cronica1MenuImage from "../../assets/img/Cronica1/zmenu.jpg";
import cronica2MenuImage from "../../assets/img/Cronica2/zmenu.jpg";
import cronica3MenuImage from "../../assets/img/Cronica3/zmenu.jpg";
import cronica4MenuImage from "../../assets/img/Cronica4/zmenu.jpg";

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
    image: cronica1MenuImage,
  },
  {
    id: "cronica-2",
    label: "Cr\u00f3nica 2",
    title: "Javier",
    image: cronica2MenuImage,
  },
  {
    id: "cronica-3",
    label: "Cr\u00f3nica 3",
    title: "Dos Tarquis",
    image: cronica3MenuImage,
  },
  {
    id: "cronica-4",
    label: "Cr\u00f3nica 4",
    title: "Cr\u00f3nica 4",
    image: cronica4MenuImage,
  },
  {
    id: "nota-complemento-1",
    label: "Nota complemento 1",
    title: "Manab\u00ed, entre la necesidad y la corrupci\u00f3n",
    image: cronica4MenuImage,
  },
];

export const siteVideos = {
  hero: heroVideo,
  chronicle1Lead: earthquakeVideoDesktop,
  chronicle1LeadDesktop: earthquakeVideoDesktop,
  chronicle1LeadMobile: earthquakeVideoMobile,
  chronicle1Rescue: heroVideo,
  chronicle2Lead: milagritosPhoneVideo,
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

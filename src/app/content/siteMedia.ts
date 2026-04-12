import heroVideo from "../../assets/video-web_portada.mp4";
import earthquakeVideoDesktop from "../../assets/img/Cronica1/Video1-terremoto-desktop.mp4";
import earthquakeVideoMobile from "../../assets/img/Cronica1/Video1-terremoto-movil.mp4";
import pabloAudio from "../../assets/hermanovictima.wav?url";
import javierAudio from "../../assets/img/Cronica2/audio1.mp3.mpeg?url";
import earthquakePoster from "../../assets/img/Cronica1/MilagritoA1.jpg";
import pabloPortrait from "../../assets/img/Cronica1/PabloCordoba-portoviejo-milagritos.jpeg";
import javierPortrait from "../../assets/img/Cronica2/JavierPincay.jpeg";
import johnPortrait from "../../assets/img/Cronica3/JohnVera-Historia2-manta.jpeg";
import bettyPortrait from "../../assets/img/Cronica3/BettyCedeno-Historia1-manta.jpeg";
import lauraPortrait from "../../assets/img/Cronica3/LauraPeralta-Historia3-manta.jpeg";

export const featuredPortraits = {
  pablo: pabloPortrait,
  javier: javierPortrait,
  betty: bettyPortrait,
  john: johnPortrait,
  laura: lauraPortrait,
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
];

export const siteVideos = {
  hero: heroVideo,
  chronicle1Lead: earthquakeVideoDesktop,
  chronicle1LeadDesktop: earthquakeVideoDesktop,
  chronicle1LeadMobile: earthquakeVideoMobile,
  chronicle1Rescue: heroVideo,
  chronicle2Lead: heroVideo,
  chronicle3Lead: heroVideo,
};

export const sitePosters = {
  earthquake: earthquakePoster,
};

export const siteAudio = {
  pablo: pabloAudio,
  javier: javierAudio,
};

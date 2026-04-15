import { PanoramaStrip } from "../PanoramaStrip";
import { AudioStoryPlayer } from "../AudioStoryPlayer";
import { chronicle1Images } from "../../content/chronicle1Media";
import { featuredPortraits } from "../../content/siteMedia";
import { pickImage } from "../../content/mediaUtils";
import cuevaAudio from "../../../assets/img/Cronica1/cueva1.mp4?url";

export function Chronicle1Panorama() {
  return (
    <PanoramaStrip
      image={pickImage(chronicle1Images, 3)}
      alt="Vista panoramica de la cronica de Pablo Cordoba"
      caption="Entre los escombros se acordaba del sueño y se repetía: “la cueva… la cueva”. También pensaba con algo de lucidez: ¿Qué pasaría con los futbolistas que estaban hospedados? ¿Se salvarían o tal vez estarían atrapados como él? Se salvaron, dice.  "
    >
      <AudioStoryPlayer
        src={cuevaAudio}
        image={featuredPortraits.pablo}
        imageAlt="Pablo Cordoba"
        label="audio de la cueva"
      />
    </PanoramaStrip>
  );
}

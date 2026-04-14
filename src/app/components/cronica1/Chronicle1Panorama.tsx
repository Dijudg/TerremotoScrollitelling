import { PanoramaStrip } from "../PanoramaStrip";
import { chronicle1Images } from "../../content/chronicle1Media";
import { pickImage } from "../../content/mediaUtils";

export function Chronicle1Panorama() {
  return (
    <PanoramaStrip
      image={pickImage(chronicle1Images, 3)}
      alt="Vista panoramica de la cronica de Pablo Cordoba"
      caption="Entre los escombros se acordaba claramente del sueño y se repetía: “la cueva… la cueva”. También pensaba con algo de lucidez: ¿Qué pasaría con los futbolistas que estaban hospedados? ¿Se salvarían o tal vez estarían atrapados como él? Nunca lo supo. "
    />
  );
}

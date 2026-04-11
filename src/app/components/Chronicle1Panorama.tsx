import { PanoramaStrip } from "./PanoramaStrip";
import { chronicle1Images } from "../content/chronicle1Media";
import { pickImage } from "../content/mediaUtils";

export function Chronicle1Panorama() {
  return (
    <PanoramaStrip
      image={pickImage(chronicle1Images, 3)}
      alt="Vista panoramica de la cronica de Pablo Cordoba"
    />
  );
}

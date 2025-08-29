/*change the hex color code to rgb using 
chroma-js library-all kinds of color conversions and color scales*/
import chroma from "chroma-js";

function hexToRgb(color) {
  return chroma(color).rgb().join(", ");
}

export default hexToRgb;

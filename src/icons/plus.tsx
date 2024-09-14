import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const Plus = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-plus"
    {...properties}
  >
    <Path d="M5 12h14" />
    <Path d="M12 5v14" />
  </Svg>
);

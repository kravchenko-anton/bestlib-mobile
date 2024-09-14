import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const ListOrdered = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-list-ordered"
    {...properties}
  >
    <Path d="M9 6h6M9 12h6M9 18h6" />
  </Svg>
);

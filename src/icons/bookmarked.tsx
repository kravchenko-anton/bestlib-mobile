import type { SvgType } from "@/icons/index";
import { Path, Svg } from "react-native-svg";

export const Bookmarked = (properties: SvgType) => (
  <Svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    className="lucide lucide-bookmark"
    {...properties}
  >
    <Path d="M5 3h14a2 2 0 0 1 2 2v16l-7-3-7 3V5a2 2 0 0 1 2-2z" />
  </Svg>
);

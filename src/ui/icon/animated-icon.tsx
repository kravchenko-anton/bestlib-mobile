import { AnimatedPressable } from "@/ui/animated-components";
import { usePressAnimation } from "@/ui/animated-press/press-animation";
import { cn } from "@/utils";
import { InnerColor } from "@/utils/colors";
import type { FC } from "react";

import { ActivityIndicator } from "react-native";
import { settings } from "./settings";
import type { IconProperties } from "./types";

const AnimatedIcon: FC<IconProperties> = ({
  icon: Icon,
  variant = "foreground",
  size = "sm",
  fatness = 2,
  className = "",
  style,
  fill = false,
  isLoading = false,
  noPadding = false,
  onPress,
  ...properties
}) => {
  const { pressFunctions, animatedStyle } = usePressAnimation();
  return (
    <AnimatedPressable
      {...pressFunctions}
      style={[style, animatedStyle]}
      className={cn(
        "items-center justify-center rounded-lg",
        properties.disabled && "opacity-50",
        noPadding ? "p-0" : settings.padding[size],
        settings.colors[variant],
        className,
      )}
      onPress={onPress}
      {...properties}
    >
      {isLoading ? (
        <ActivityIndicator
          color={InnerColor[variant]}
          size={settings.size[size]}
        />
      ) : (
        <Icon
          width={settings.size[size]}
          height={settings.size[size]}
          strokeWidth={fatness}
          fill={fill ? InnerColor[variant] : "none"}
          stroke={InnerColor[variant]}
        />
      )}
    </AnimatedPressable>
  );
};
export default AnimatedIcon;

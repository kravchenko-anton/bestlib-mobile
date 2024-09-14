import type { ThemePackType } from "@/screens/reader/components/reader-customization/theme-pack";
import { Color } from "@/utils/colors";
import BottomSheet, { type BottomSheetModal } from "@gorhom/bottom-sheet";
import type { FC, RefObject } from "react";
import { Text, View } from "react-native";

export interface TranslatorProperties {
  sheetRef: RefObject<BottomSheetModal> | null;
  colorScheme: ThemePackType;
  textToTranslate: string;
  textContext: string;
}

export const Translator: FC<TranslatorProperties> = ({
  sheetRef,
  textToTranslate,
  textContext,
  colorScheme,
}) => (
  <BottomSheet
    detached
    handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
    ref={sheetRef}
    snapPoints={[250]}
    bottomInset={46}
    style={{
      borderColor: Color.bordered,
      borderWidth: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    }}
    backgroundStyle={{
      backgroundColor: colorScheme.colorPalette.background.darker,
    }}
  >
    <View>
      <Text>textToTranslate</Text>
    </View>
  </BottomSheet>
);

import type { ThemePackType } from "@/screens/reader/components/reader-customization/theme-pack";
import { Color } from "@/utils/colors";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import type { FC, RefObject } from "react";
import { Text } from "react-native";

export interface TranslatorProperties {
  sheetRef: RefObject<BottomSheetModal> | null;
  colorScheme: ThemePackType;
}

export const Translator: FC<TranslatorProperties> = ({
  sheetRef,
  colorScheme,
}) => (
  <BottomSheetModal
    detached
    handleIndicatorStyle={{
      backgroundColor: colorScheme.colorPalette.text,
      display: "none",
    }}
    ref={sheetRef}
    snapPoints={[250]}
    style={{
      borderColor: Color.bordered,
      borderWidth: 1,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      padding: 16,
    }}
    backgroundStyle={{
      backgroundColor: colorScheme.colorPalette.background.darker,
    }}
  >
    {(data) => {
      console.log(data);
      return (
        <BottomSheetScrollView>
          <Text>textToTranslate</Text>
        </BottomSheetScrollView>
      );
    }}
  </BottomSheetModal>
);

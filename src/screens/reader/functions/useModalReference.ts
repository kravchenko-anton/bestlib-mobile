import { useTypedNavigation } from "@/hooks";
import type { FunctionType } from "@/utils/types";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { type Dispatch, type SetStateAction, useRef } from "react";

interface UseModalReferenceProperties {
  onOpenModal: FunctionType;
}
export const useModalReference = (
  setReaderUiVisible: Dispatch<SetStateAction<boolean>>,
  { onOpenModal }: UseModalReferenceProperties,
) => {
  const { addListener } = useTypedNavigation();

  const chaptersListModalReference = useRef<BottomSheetModal>(null);
  const readingSettingsModalReference = useRef<BottomSheetModal>(null);
  const reactionModalReference = useRef<BottomSheetModal>(null);
  const translationModalReference = useRef<BottomSheetModal>(null);
  const gptModalReference = useRef<BottomSheetModal>(null);
  const unsubscribe = addListener("beforeRemove", () => {
    setReaderUiVisible(false);
    readingSettingsModalReference.current?.close();
    chaptersListModalReference.current?.close();
    reactionModalReference.current?.close();
    translationModalReference.current?.close();
    gptModalReference.current?.close();
    return () => unsubscribe();
  });

  return {
    modalRefs: {
      chaptersListModalReference,
      readingSettingsModalReference,
      reactionModalReference,
      translationModalReference,
      gptModalReference,
    },
    reactionModal: {
      open: () => {
        reactionModalReference.current?.present();
        onOpenModal();
      },
      close: () => reactionModalReference.current?.close(),
    },
    openModal: {
      gpt: () => {
        gptModalReference.current?.present();
        onOpenModal();
      },
      translation: () => {
        translationModalReference.current?.present();
        onOpenModal();
      },
      chaptersList: () => {
        chaptersListModalReference.current?.present();
        onOpenModal();
      },
      readingSettings: () => {
        readingSettingsModalReference.current?.present();
        onOpenModal();
      },
    },
  };
};

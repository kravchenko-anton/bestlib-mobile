import api from "@/api";

import { useTypedNavigation } from "@/hooks";
import { useCustomizationStore } from "@/screens/reader/components/reader-customization/customization-store";
import { useFinishBook } from "@/screens/reader/functions/useFinishBook";
import { useModalReference } from "@/screens/reader/functions/useModalReference";
import { useReactions } from "@/screens/reader/functions/useReactions";
import { useReaderMessage } from "@/screens/reader/functions/useReaderMessage";
import { useReadingProgress } from "@/screens/reader/functions/useReadingProgress/useReadingProgress";
import {
  getStyleTag,
  injectStyle,
} from "@/screens/reader/injections/styles-injection";
import { QueryKeys } from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import type WebView from "react-native-webview";

export const useReader = (id: string, initialScrollPosition: number) => {
  const { setOptions } = useTypedNavigation();
  const [readerLoading, setReaderLoading] = useState(true);
  const [readerHeaderVisible, setReaderHeaderVisible] = useState(false);
  const viewerReference = useRef<WebView>(null);

  const { colorScheme, ...restUiProperties } = useCustomizationStore(
    (state) => state,
  );
  const { reactionBookList = [], createReaction } = useReactions(id);

  const {
    data: ebook,
    isLoading: ebookRequestLoading,
    isRefetching: ebookRequestRefetching,
  } = useQuery({
    queryKey: QueryKeys.ebook.byId(id),
    queryFn: () => api.ebook.ebookById(id),
    select: (data) => data.data,
    enabled: !!id,
    networkMode: "offlineFirst",
    gcTime: Number.MAX_SAFE_INTEGER,
    staleTime: 0,
  });

  const {
    readingProgress,
    scrollPosition,
    updateReadingProgress,
    clearProgress,
  } = useReadingProgress({ id, readerLoading, initialScrollPosition });

  const { onFinish } = useFinishBook(clearProgress);
  const { openModal, modalRefs } = useModalReference(setReaderHeaderVisible, {
    onOpenModal: () =>
      viewerReference.current?.injectJavaScript(`removeAllTextSelection()`),
  });

  const { onMessage } = useReaderMessage({
    id,
    onFinishBookPress: onFinish,
    onContentLoadEnd: () => setReaderLoading(false),
    onScroll: updateReadingProgress,
    createReaction: createReaction,
    openGptModal: (text: string) => openModal.gpt(text),
    openTranslateModal: (text: string) => openModal.translation(text),
    openReactionModal: (id) => {
      openModal.reaction.open(
        reactionBookList.find((reaction) => reaction.id === id) || null,
      );
    },
  });

  const styleTag = getStyleTag({ colorScheme, ...restUiProperties });
  // eslint-disable-next-line
  const [defaultProperties] = useState({
    scrollPosition,
    theme: styleTag,
    reactions: reactionBookList,
  });
  useEffect(() => {
    setOptions({
      statusBarStyle: colorScheme.statusBar,
      navigationBarColor: colorScheme.colorPalette.background.darker,
      navigationBarHidden: true,
      statusBarTranslucent: true,
      statusBarHidden: !readerHeaderVisible,
      statusBarColor: colorScheme.colorPalette.background.darker,
    });
  }, [colorScheme, setOptions, readerHeaderVisible]);

  useEffect(() => {
    viewerReference.current?.injectJavaScript(`${injectStyle(styleTag)}`);
  }, [styleTag]);

  useEffect(() => {
    viewerReference.current?.injectJavaScript(`
    	wrapReactionsInMarkTag(${JSON.stringify(reactionBookList)});
    `);
  }, [reactionBookList, createReaction]);

  return {
    ebook,
    readerLoading,
    readerHeaderVisible,
    colorScheme,
    viewerReference,
    setReaderHeaderVisible,
    modalRefs,
    ebookRequestLoading,
    readingProgress,
    ebookRequestRefetching,
    openModal,
    onMessage,
    reactionBookList,
    defaultProperties,
    styleTag,
  };
};

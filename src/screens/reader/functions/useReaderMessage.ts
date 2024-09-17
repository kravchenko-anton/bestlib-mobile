import type { reactionsTitles } from "@/utils/reactions";
import { shareText } from "@/utils/share-text";
import { errorToast } from "@/utils/toast";
import type { CreateReaction } from "api-client";
import type { WebViewMessageEvent } from "react-native-webview";

export enum ReaderMessageType {
  Scroll = "scroll",
  SelectionLimitFail = "selection-limit-fail",
  FinishLoading = "finish-loading",
  FinishBook = "finishBook",
  MarkClick = "mark-click",
  Share = "share",
  Translate = "translate",
  Reaction = "reaction",
  Explain = "explain",
}
export interface WebviewMessageType {
  type: ReaderMessageType;
  payload: {
    id: string;
    text: string;
    range: {
      startOffset: number;
      endOffset: number;
      xpath: string;
    };
    reaction: reactionsTitles;
    scrollTop: number;
    progress: number;
    chapter: {
      chapterTitle: string;
      chapterLink: string;
      chapterProgress: number;
    };
  };
}

export interface ReaderMessageProperties {
  onScroll: (
    payload: Pick<
      WebviewMessageType["payload"],
      "chapter" | "progress" | "scrollTop"
    >,
  ) => void;
  id: string;
  onFinishBookPress: (id: string) => void;
  onContentLoadEnd: () => void;
  createReaction: (data: CreateReaction) => void;
  openReactionModal: (id: string) => void;
  openTranslateModal: (text: string) => void;
  openGptModal: (text: string) => void;
}

export const useReaderMessage = ({
  onFinishBookPress,
  onContentLoadEnd,
  id,
  onScroll,
  openReactionModal,
  createReaction,
  openTranslateModal,
  openGptModal,
}: ReaderMessageProperties) => {
  const onMessage = async (event: WebViewMessageEvent) => {
    const parsedEvent = JSON.parse(
      event.nativeEvent.data,
    ) as WebviewMessageType;
    const { type, payload } = parsedEvent;
    console.log("🚂", parsedEvent);
    if (type === ReaderMessageType.FinishLoading) {
      console.log("Finish loading");
      onContentLoadEnd();
    }
    if (type === ReaderMessageType.Explain) {
      openGptModal(payload.text);
    }
    if (type === ReaderMessageType.Share) {
      await shareText(payload.text);
    }
    if (type === ReaderMessageType.Translate) {
      openTranslateModal(payload.text);
    }
    if (type === ReaderMessageType.Reaction) {
      console.log("🚂", {
        bookId: id,
        id: Math.random().toString(),
        createAt: new Date(),
        text: payload.text,
        range: {
          startOffset: payload.range.startOffset,
          endOffset: payload.range.endOffset,
          xpath: payload.range.xpath,
        },
        reaction: payload.reaction,
      });
      createReaction({
        startOffset: payload.range.startOffset,
        endOffset: payload.range.endOffset,
        xpath: payload.range.xpath,
        text: payload.text,
        type: payload.reaction,
        bookId: id,
      });
    }
    if (type === ReaderMessageType.SelectionLimitFail)
      errorToast("Selected text is too long");
    if (type === ReaderMessageType.Scroll)
      onScroll({
        scrollTop: payload.scrollTop,
        progress: payload.progress,
        chapter: {
          chapterTitle: payload.chapter.chapterTitle,
          chapterLink: payload.chapter.chapterLink,
          chapterProgress: payload.chapter.chapterProgress,
        },
      });
    if (type === ReaderMessageType.FinishBook) onFinishBookPress(id);
    if (
      type === ReaderMessageType.MarkClick &&
      payload.id !== null &&
      payload.id !== undefined
    ) {
      console.log("Mark click", payload.id);
      openReactionModal(payload.id);
    }
  };

  return {
    onMessage,
  };
};

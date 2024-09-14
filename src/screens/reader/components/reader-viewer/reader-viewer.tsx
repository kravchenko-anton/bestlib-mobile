import type { ThemePackType } from "@/screens/reader/components/reader-customization/theme-pack";
import { composeReaderViewHtml } from "@/screens/reader/injections/compose-html-injection";
import { windowWidth } from "@/utils/dimensions";
import { doublePress } from "@/utils/handleDoublePress";
import type { FunctionType } from "@/utils/types";
import type { ReactionByBookOutput } from "api-client";
import { forwardRef } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import WebView, { type WebViewMessageEvent } from "react-native-webview";

export interface ReaderViewerProperties {
  readerUiVisible: boolean;
  handleDoublePress: FunctionType;
  file: string;
  picture: string;
  title: string;
  defaultProperties: {
    scrollPosition: number;
    theme: string;
    reactions: ReactionByBookOutput[];
  };
  colorScheme: ThemePackType;
  onMessage: (event: WebViewMessageEvent) => Promise<void>;
}

const ReaderViewer = forwardRef(
  (properties: ReaderViewerProperties, reference: any) => {
    const {
      defaultProperties,
      handleDoublePress,
      colorScheme,
      title,
      onMessage,
      picture,
      file,
    } = properties;

    if (!defaultProperties) return <View className="flex-1" />;
    return (
      <View className="m-0 h-screen w-screen flex-1 items-center justify-center p-0">
        <TouchableWithoutFeedback onPress={doublePress(handleDoublePress)}>
          <WebView
            scrollEnabled
            javaScriptEnabled
            mixedContentMode="compatibility"
            ref={reference}
            originWhitelist={["*"]}
            showsVerticalScrollIndicator={false}
            className="bottom-0 left-0 right-0 top-0 z-10 m-0 p-0"
            menuItems={[]}
            decelerationRate="normal"
            //TODO: prevent fast scroll in webview
            renderLoading={() => (
              <View
                className="h-screen w-screen"
                style={{
                  backgroundColor: colorScheme.colorPalette.background.normal,
                }}
              />
            )}
            source={{
              baseUrl: "",
              html: composeReaderViewHtml({
                defaultProperties,
                file,
                picture,
                title,
              }),
            }}
            style={{
              width: windowWidth,
              backgroundColor: colorScheme.colorPalette.background.normal,
            }}
            onMessage={onMessage}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  },
);
export default ReaderViewer;

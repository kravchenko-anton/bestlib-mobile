import Navigation from "@/navigation/navigation";
import Toast from "@/ui/toast";
import { Color } from "@/utils/colors";
import { clientStorage } from "@/utils/mmkv-wrapper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import NetInfo from "@react-native-community/netinfo";
import * as Sentry from "@sentry/react-native";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { onlineManager, QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MMKV } from "react-native-mmkv";
import "react-native-svg";
import "react-native-url-polyfill/auto";
import "../env-config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: "offlineFirst",
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 1 hour
      gcTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  },
});

onlineManager.setEventListener((setOnline) =>
  NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  }),
);

export const storage = new MMKV({
  id: "app",
  encryptionKey: "hunter2",
});

Sentry.init({
  dsn: process.env.SENTRY_DNC,
  tracesSampleRate: 1,
  integrations: [Sentry.metrics.metricsAggregatorIntegration()],
});

export const clientPersister: any = createSyncStoragePersister({
  storage: clientStorage,
});

const App = () => {
  useFonts({
    "SpaceGrotesk-Regular": require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Light": require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    "SpaceGrotesk-Bold": require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    "SpaceGrotesk-SemiBold": require("../assets/fonts/SpaceGrotesk-SemiBold.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/SpaceGrotesk-Medium.ttf"),
  });
  return (
    // useEffect(() => {
    // 	adapty.activate('public_live_0pAJgt4m.7LNqw5dmfPigmxdZUuv3')
    // }, [])

    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister }}
    >
      <GestureHandlerRootView
        style={{
          flex: 1,
        }}
      >
        <BottomSheetModalProvider>
          <Navigation />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast />
      <StatusBar backgroundColor={Color.background} />
    </PersistQueryClientProvider>
  );
};
export default Sentry.wrap(App);

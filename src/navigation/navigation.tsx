import api from "@/api";
import { authRoutes } from "@/navigation/auth-routes";
import BottomMenu from "@/navigation/bottom-menu/bottom-menu";
import { fullScreenModalRoutes, modalRoutes } from "@/navigation/modal-routes";
import type { TypeRootStackParameterListType } from "@/navigation/navigation-types";
import { routes } from "@/navigation/user-routes";
import { getRefreshToken } from "@/screens/auth/store/auth-helper";
import { useAuthStore } from "@/screens/auth/store/auth-store";
import { useReadingProgressStore } from "@/screens/reader/functions/useReadingProgress/progress-store";
import { Loader } from "@/ui";
import { historyByLatestSorting } from "@/utils";
import { Color } from "@/utils/colors";
import { MutationKeys } from "@/utils/query-keys";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import type { ReadingHistory } from "api-client";
import { type FC, useEffect, useState } from "react";
import BootSplash from "react-native-bootsplash";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { GestureDetectorProvider } from "react-native-screens/gesture-handler";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

const authRequiredRoutes = new Set(routes.map((route) => route.name));
const Stack = createNativeStackNavigator<TypeRootStackParameterListType>();

const noBottomMenuRoutes = new Set([
  "Reader",
  "BookImpression",
  "Search",
  "CreateNote",
  "Note",
]);

const Navigation: FC = () => {
  const [initialHistory] = useState(useReadingProgressStore.getState().history); // eslint-disable-line
  const latestHistory = historyByLatestSorting(initialHistory).find(
    (h) => h.startFromReadingScreen,
  );
  const { user, logout } = useAuthStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  const { mutateAsync: syncHistory } = useMutation({
    mutationKey: MutationKeys.user.syncHistory,
    mutationFn: (dto: ReadingHistory[]) => api.user.syncHistory(dto),
  });
  const [currentRoute, setCurrentRoute] = useState<
    keyof TypeRootStackParameterListType | undefined
  >(user ? (latestHistory?.bookId ? "Reader" : "Featured") : "Welcome");

  const navReference =
    useNavigationContainerRef<TypeRootStackParameterListType>();

  const checkRefreshToken = async (
    route: keyof TypeRootStackParameterListType,
  ) => {
    if (!route || !authRequiredRoutes.has(route)) return;
    const refreshToken = await getRefreshToken();
    if (!refreshToken && user) logout();
  };

  useEffect(() => {
    const listener = navReference.addListener("state", () => {
      const route = navReference.getCurrentRoute()
        ?.name as keyof TypeRootStackParameterListType;

      setCurrentRoute(route);
      checkRefreshToken(route);
    });

    return () => navReference.removeListener("state", listener);
  }, []);

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{
        backgroundColor: Color.muted,
      }}
    >
      <GestureDetectorProvider>
        <NavigationContainer
          ref={navReference}
          fallback={<Loader />}
          onReady={() => {
            if (user && latestHistory?.bookId)
              navReference.navigate("Reader", {
                id: latestHistory.bookId,
                initialScrollPosition: latestHistory.scrollPosition,
              });
            if (user && initialHistory.length > 0) syncHistory(initialHistory);
            BootSplash.hide({ fade: true });
          }}
        >
          <Stack.Navigator
            screenOptions={{
              stackAnimation: "fade",
              headerShown: false,
              statusBarColor: Color.background,
              statusBarTranslucent: false,
              statusBarAnimation: "fade",
              statusBarHidden: false,
              statusBarStyle: "light",
            }}
          >
            {user
              ? routes.map(({ options, ...route }) => (
                  <Stack.Screen
                    key={route.name}
                    options={{
                      contentStyle: {
                        backgroundColor: Color.background,
                      },
                      ...options,
                      navigationBarColor: Color.background,
                    }}
                    {...route}
                  />
                ))
              : authRoutes.map(({ options, ...route }) => (
                  <Stack.Screen
                    key={route.name}
                    options={{
                      contentStyle: {
                        backgroundColor: Color.background,
                      },
                      ...options,
                      navigationBarColor: Color.background,
                    }}
                    {...route}
                  />
                ))}
            {modalRoutes.map(({ options, ...route }) => (
              <Stack.Screen
                key={route.name}
                options={{
                  stackPresentation: "containedTransparentModal",
                  ...options,
                }}
                {...route}
              />
            ))}
            {fullScreenModalRoutes.map(({ options, ...route }) => (
              <Stack.Screen
                key={route.name}
                options={{
                  stackPresentation: "fullScreenModal",
                  stackAnimation: "flip",
                  navigationBarColor: Color.background,
                  contentStyle: {
                    backgroundColor: Color.background,
                  },
                  ...options,
                }}
                {...route}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
        {user && currentRoute && !noBottomMenuRoutes.has(currentRoute) ? (
          <BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
        ) : null}
      </GestureDetectorProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;

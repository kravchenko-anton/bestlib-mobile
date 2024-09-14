import api from "@/api";
import { compareReadingBooks } from "@/screens/library/compareReadingBooks";
import { useReadingProgressStore } from "@/screens/reader/functions/useReadingProgress/progress-store";
import { QueryKeys } from "@/utils/query-keys";
import { useNetInfo } from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useLibraryWithSync = () => {
  const isFocus = useIsFocused();
  const { isConnected } = useNetInfo();
  const { history, clearHistory } = useReadingProgressStore(
    useShallow((state) => ({
      history: state.history,
      clearHistory: state.clearHistory,
    })),
  );
  const {
    data: library,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: QueryKeys.library,
    queryFn: () => api.user.library(history),
    select: (data) => data.data,
    staleTime: 0,
    refetchOnMount: history.length > 0,
    refetchOnWindowFocus: history.length > 0,
  });

  useEffect(() => {
    isFocus && clearHistory();
  }, [isSuccess]);

  useEffect(() => {
    if (isConnected && isFocus) refetch();
  }, []);
  return {
    library,
    isLoading,
    refetch,
    readingList: compareReadingBooks(library?.readingBooks || [], history),
  };
};

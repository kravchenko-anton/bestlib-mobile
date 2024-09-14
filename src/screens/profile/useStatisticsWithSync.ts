import api from "@/api";
import { useReadingProgressStore } from "@/screens/reader/functions/useReadingProgress/progress-store";
import { QueryKeys } from "@/utils/query-keys";
import { useNetInfo } from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export const useStatisticsWithSync = () => {
  const isFocus = useIsFocused();
  const { isConnected } = useNetInfo();
  const { history = [], clearHistory } = useReadingProgressStore(
    useShallow((state) => ({
      history: state.history,
      clearHistory: state.clearHistory,
    })),
  );
  const {
    data: statistics,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: QueryKeys.userStatistics,
    queryFn: () =>
      api.user.statistics(
        history.map((b) => ({
          ...b,
          startDate: b.startDate as unknown as string,
          endDate: b.endDate as unknown as string,
        })),
      ),
    select: (data) => data.data,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("sync success, clear history", history);
      clearHistory();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isConnected && isFocus) refetch();
  }, []);

  return { isLoading, statistic: statistics, refetch };
};

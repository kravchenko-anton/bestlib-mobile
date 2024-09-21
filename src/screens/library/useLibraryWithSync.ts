import api from "@/api";
import { QueryKeys } from "@/utils/query-keys";
import { useNetInfo } from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

export const useLibraryWithSync = () => {
  const isFocus = useIsFocused();
  const { isConnected } = useNetInfo();
  const {
    data: library,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: QueryKeys.library,
    queryFn: () => api.user.library(),
    select: (data) => data.data,
    staleTime: 0,
  });

  return {
    library,
    isLoading,
    refetch,
    readingList: library?.readingBooks,
  };
};

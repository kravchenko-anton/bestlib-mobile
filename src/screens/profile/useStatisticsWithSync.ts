import api from '@/api'
import { QueryKeys } from '@/utils/query-keys'
import { useQuery } from '@tanstack/react-query'

export const useStatisticsWithSync = () => {
  const {
    data: statistics,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QueryKeys.userStatistics,
    queryFn: () =>
      api.user.statistics(
      ),
    select: (data) => data.data,
  });

  return { isLoading, statistic: statistics, refetch };
};

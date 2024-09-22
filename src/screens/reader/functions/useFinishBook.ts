import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import { errorToast, successToast } from '@/utils/toast'
import { useNetInfo } from '@react-native-community/netinfo'
import * as Sentry from '@sentry/react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useFinishBook = (onFinishComplete: () => void) => {
  const { navigate } = useTypedNavigation();
  const queryClient = useQueryClient();
  const { isConnected } = useNetInfo();
  const { mutateAsync: finishReading, isPending: finishReadingLoading } =
    useMutation({
      mutationKey: MutationKeys.book.finishReading,
      mutationFn: (id: string) => api.user.finishReading(id),
    });

  const onFinish = async (id: string) => {
    if (finishReadingLoading) return errorToast("Please wait...");
    await finishReading(id).then(() => {
      onFinishComplete();
      queryClient.invalidateQueries({
        queryKey: QueryKeys.library,
      });
      Sentry.metrics.increment("finish-reading");
      successToast("Successfully finished");
      if (isConnected) return navigate("BookImpression", {
          id,
        });
      navigate("Library");
    
    });
  };

  return {
    onFinish,
    finishReadingLoading,
  };
};

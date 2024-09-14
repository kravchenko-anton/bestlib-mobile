import api from "@/api";
import { useTypedNavigation } from "@/hooks";
import { MutationKeys, QueryKeys } from "@/utils/query-keys";
import { successToast } from "@/utils/toast";
import * as Sentry from "@sentry/react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFinishBook = (onFinishComplete: () => void) => {
  const { navigate } = useTypedNavigation();
  const queryClient = useQueryClient();
  const { mutateAsync: finishReading, isPending: finishReadingLoading } =
    useMutation({
      mutationKey: MutationKeys.book.finishReading,
      mutationFn: (id: string) => api.user.finishReading(id),
    });

  const onFinish = async (id: string) => {
    if (finishReadingLoading) return;
    await finishReading(id).then(() => {
      onFinishComplete();
      successToast("Successfully finished");
      navigate("BookImpression", {
        id,
      });
      queryClient.invalidateQueries({
        queryKey: QueryKeys.library,
      });
      Sentry.metrics.increment("finish-reading");
    });
  };

  return {
    onFinish,
    finishReadingLoading,
  };
};

import api from "@/api";
import { MutationKeys, QueryKeys } from "@/utils/query-keys";
import { errorToast } from "@/utils/toast";
import * as Sentry from "@sentry/react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateReaction } from "api-client";

export const useReactions = (bookId: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createReactionMutation,
    isPending: createReactionLoading,
  } = useMutation({
    mutationKey: MutationKeys.reaction.create,
    mutationFn: (data: CreateReaction) => api.reaction.create(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.reaction.byId(bookId),
      });
    },
  });

  const createReaction = (data: CreateReaction) => {
    if (createReactionLoading) return errorToast("Please wait a moment");
    createReactionMutation(data).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.reaction.byId(bookId),
      });
    });
    Sentry.metrics.increment("create-reaction");
  };

  const { data: reactionBookList } = useQuery({
    queryKey: QueryKeys.reaction.byId(bookId),
    queryFn: () => api.reaction.reactionByBook(bookId),
    select: (data) => data.data,
    enabled: !!bookId,
    networkMode: "offlineFirst",
    gcTime: Number.MAX_SAFE_INTEGER,
  });

  return {
    createReaction,
    reactionBookList,
    isLoading: createReactionLoading,
  };
};

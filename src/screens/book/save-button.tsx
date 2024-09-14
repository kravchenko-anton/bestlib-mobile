import api from "@/api";
import { Bookmarked } from "@/icons";
import { AnimatedIcon } from "@/ui";
import { MutationKeys, QueryKeys } from "@/utils/query-keys";
import * as Sentry from "@sentry/react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { FC } from "react";

interface SaveButtonProperties {
  id: string;
}

const SaveButton: FC<SaveButtonProperties> = ({ id }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: toggleSave, isPending: toggleSaveLoading } = useMutation(
    {
      mutationKey: MutationKeys.book.toggleSaveById,
      mutationFn: (id: string) => api.user.toggleSave(id),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.book.isSaved(id),
        });
        await queryClient.invalidateQueries({
          queryKey: QueryKeys.library,
        });
        Sentry.metrics.increment("toggle-save", 1, {
          tags: { id },
        });
      },
    },
  );

  const { data: isSaved } = useQuery({
    queryKey: QueryKeys.book.isSaved(id),
    queryFn: () => api.user.isSaved(id),
    select: (data) => data.data,
  });

  return (
    <AnimatedIcon
      variant="muted"
      icon={Bookmarked}
      fatness={2}
      disabled={toggleSaveLoading}
      size="md"
      className="ml-3"
      fill={!!isSaved}
      onPress={() => toggleSave(id)}
    />
  );
};

export default SaveButton;

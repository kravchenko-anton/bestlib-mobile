import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Book } from '@/icons'
import { Button } from '@/ui'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import * as Sentry from '@sentry/react-native'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'

interface BookReadingButtonProperties {
  id: string;
}

const ReadingButton: FC<BookReadingButtonProperties> = ({ id }) => {
  const { navigate } = useTypedNavigation();
  const queryClient = useQueryClient();
  const { mutateAsync: startReading, isPending: startReadingLoading } =
    useMutation({
      mutationKey: MutationKeys.book.startReadingById(id),
      mutationFn: (slug: string) => api.user.startReading(id),
      onSuccess: () => {
        Sentry.metrics.increment("start-reading", 1);
        queryClient.invalidateQueries({
          queryKey: QueryKeys.library,
        });
      },
    });

  const startReadingBook = async () => {
    await startReading(id);
    await queryClient
      .invalidateQueries({
        queryKey: QueryKeys.library,
      })
      .then(() => navigate("Reader", { id, startFromScratch: true  }));
  };

  return (
    <Button
      icon={Book}
      isLoading={startReadingLoading}
      className="flex-1"
      variant="primary"
      size="md"
      onPress={startReadingBook}
    >
      {startReadingLoading ? "Loading..." : "Start Reading"}
    </Button>
  );
};

export default ReadingButton;

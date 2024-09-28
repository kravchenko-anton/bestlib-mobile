import api from '@/api'
import { QueryKeys } from '@/utils/query-keys'
import { useQuery } from '@tanstack/react-query'


export const useBookWithDownload = (id: string) => {
	const {
		data: ebook,
		isPending: ebookRequestLoading,
		isRefetching: ebookRequestRefetching,
		isError: ebookRequestError,
		isSuccess,
	} = useQuery({
		queryKey: QueryKeys.ebook.byId(id),
		queryFn: () => api.ebook.ebookById(id),
		select: (data) => data.data,
		enabled: !!id, // Ensure isConnected is properly checked
		networkMode: 'offlineFirst',
		// offline download
		
	});

	
	return { ebook, ebookRequestLoading, ebookRequestRefetching, ebookRequestError };
};

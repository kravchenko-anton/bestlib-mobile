import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { QueryKeys } from '@/utils/query-keys'
import NetInfo from '@react-native-community/netinfo'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import FileSystem from 'expo-file-system'
import { useEffect } from 'react'

export const  useBookWithDownload = (id: string) => {
	const ebookFilePath = `${FileSystem.documentDirectory}ebook_${id}.json`;
	const { navigate} = useTypedNavigation()
	const queryClient = useQueryClient();
	const { isConnected} = NetInfo.useNetInfo()
	
	const saveFile = async () => {
		try {
			await FileSystem.writeAsStringAsync(ebookFilePath, JSON.stringify(ebook));
			console.log('Ebook data saved locally.');
		} catch (error) {
			console.error('Error saving ebook data:', error);
		}
	}
	useEffect(() => {
		const loadLocalData = async () => {
			if (!isConnected) {
				try {
					const localData = await FileSystem.readAsStringAsync(ebookFilePath);
					const parsedData = JSON.parse(localData);
					queryClient.setQueryData(QueryKeys.ebook.byId(id), parsedData);
				} catch (error) {
					console.error('No local ebook data found:', error);
					navigate('Library');
				}
			}
		};
		
		loadLocalData();
	}, [isConnected]);
	
	const {
		data: ebook,
		isLoading: ebookRequestLoading,
		isRefetching: ebookRequestRefetching,
		isError: ebookRequestError,
		isSuccess
	} = useQuery({
		queryKey: QueryKeys.ebook.byId(id),
		queryFn: () => api.ebook.ebookById(id),
		select: (data) => data.data,
		enabled: !!(!!id && isConnected),
		networkMode: 'offlineFirst',
		staleTime: 0,
		gcTime: 0,
	});
	
	useEffect(() => {
		if (!ebook && !ebookRequestLoading) {
			navigate('Library');
		}
	}, [ebook, ebookRequestLoading]);
	useEffect(() => {
	
		
		if (isSuccess) saveFile();
	}, [isSuccess])
	
	return { ebook, ebookRequestLoading, ebookRequestRefetching, ebookRequestError }
}
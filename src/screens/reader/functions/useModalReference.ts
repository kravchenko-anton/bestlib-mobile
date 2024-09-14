import { useTypedNavigation } from '@/hooks'
import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import type { FunctionType } from '@/utils/types'
import { useRef, type Dispatch, type SetStateAction } from 'react'

interface UseModalReferenceProperties {
	onOpenModal: FunctionType
}
export const useModalReference = (
	setReaderUiVisible: Dispatch<SetStateAction<boolean>>,
	{ onOpenModal }: UseModalReferenceProperties
) => {
	const { addListener } = useTypedNavigation()

	const chaptersListModalReference = useRef<BottomSheetModal>(null)
	const readingSettingsModalReference = useRef<BottomSheetModal>(null)
	const reactionModalReference = useRef<BottomSheetModal>(null)
	const unsubscribe = addListener('beforeRemove', () => {
		setReaderUiVisible(false)
		readingSettingsModalReference.current?.close()
		chaptersListModalReference.current?.close()
		return () => unsubscribe()
	})

	return {
		modalRefs: {
			chaptersListModalReference,
			readingSettingsModalReference,
			reactionModalReference
		},
		reactionModal: {
			open: () => {
				reactionModalReference.current?.present()
				onOpenModal()
			},
			close: () => reactionModalReference.current?.close()
		},
		openModal: {
			chaptersList: () => {
				chaptersListModalReference.current?.present()
				onOpenModal()
			},
			readingSettings: () => {
				readingSettingsModalReference.current?.present()
				onOpenModal()
			}
		}
	}
}

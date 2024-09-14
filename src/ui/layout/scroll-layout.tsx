import type { ScrollViewDefaultProperties } from '@/types/component-types'
import { ScrollView } from '@/ui'
import type { FC, PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScrollLayout: FC<PropsWithChildren<ScrollViewDefaultProperties>> = ({
	children,
	...properties
}) => (
	<SafeAreaView edges={['right', 'top', 'left']} className='flex-1'>
		<ScrollView className='flex-1' {...properties}>
			{children}
		</ScrollView>
	</SafeAreaView>
)

export default ScrollLayout

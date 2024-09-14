import type { ScrollViewDefaultProperties } from '@/types/component-types'
import type { FC } from 'react'
import { ScrollView as DefaultScrollView } from 'react-native'

const ScrollView: FC<ScrollViewDefaultProperties> = ({ ...properties }) => (
	<DefaultScrollView
		renderToHardwareTextureAndroid
		automaticallyAdjustContentInsets={false}
		overScrollMode='never'
		showsHorizontalScrollIndicator={false}
		showsVerticalScrollIndicator={false}
		alwaysBounceHorizontal={false}
		alwaysBounceVertical={false}
		bounces={false}
		bouncesZoom={false}
		decelerationRate='normal'
		{...properties}>
		{properties.children}
	</DefaultScrollView>
)

export default ScrollView

import { fontSizeSettings } from '@/screens/reader/components/reader-customization/customization-store'
import type { ThemePackType } from '@/screens/reader/components/reader-customization/theme-pack'
import { Title } from '@/ui'
import type { FC } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Minus, Plus } from '@/icons'

interface FontSizeSettingsProperties {
	activeFontSize: number
	changeFontSize: (size: number) => void
	colorScheme: ThemePackType
}
export const FontSizeSettings: FC<FontSizeSettingsProperties> = ({
	changeFontSize,
	activeFontSize,
	colorScheme
}) => (
	<View className='my-1.5 flex-row items-center justify-between px-3'>
		<Title weight='semiBold' size={'xxl'} color={colorScheme.colorPalette.text}>
			Font size
		</Title>
		<View className='flex-row items-center'>
			<TouchableOpacity
				className='rounded-l-md p-1 px-4'
				disabled={activeFontSize === fontSizeSettings.min}
				style={{
					backgroundColor:
						activeFontSize === fontSizeSettings.min
							? colorScheme.colorPalette.background.normal
							: colorScheme.colorPalette.background.lighter
				}}
				onPress={() => changeFontSize(activeFontSize - 2)}>
				<Minus
					width={30}
					color={colorScheme.colorPalette.text}
					strokeWidth={2}
					height={30}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				className='rounded-r-md p-1 px-4'
				disabled={activeFontSize === fontSizeSettings.max}
				style={{
					backgroundColor:
						activeFontSize === fontSizeSettings.max
							? colorScheme.colorPalette.background.normal
							: colorScheme.colorPalette.background.lighter
				}}
				onPress={() => changeFontSize(activeFontSize + 2)}>
				<Plus
					width={30}
					color={colorScheme.colorPalette.text}
					strokeWidth={2}
					height={30}
				/>
			</TouchableOpacity>
		</View>
	</View>
)

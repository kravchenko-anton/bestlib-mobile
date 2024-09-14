import type { PressableDefaultProperties } from '@/types/component-types'
import { AnimatedPressable } from '@/ui/animated-components'
import { usePressAnimation } from '@/ui/animated-press/press-animation'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'

const AnimatedPress: FC<PropsWithChildren<PressableDefaultProperties>> = ({
	children,
	style,
	className = '',
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			{...pressFunctions}
			className={className}
			style={[style, animatedStyle]}
			{...properties}>
			{children}
		</AnimatedPressable>
	)
}

export default memo(AnimatedPress)

export const Color = {
	muted: '#1f2123' as const,
	bordered: '#2d2e30' as const,
	background: '#111113' as const,
	foreground: '#18191b' as const,
	primary: '#306A9C' as const,

	black: '#000000' as const,
	gray: '#9F9F9F' as const,
	white: '#F4F3F2' as const,

	danger: '#DC3F41' as const,
	success: '#4CAF50' as const,
	warning: '#f48c06' as const,
	transparent: 'transparent' as const
}

export const InnerColor = {
	foreground: Color.white,
	muted: Color.white,
	background: Color.white,
	primary: Color.white,

	black: Color.white,
	gray: Color.white,
	white: Color.black,

	danger: Color.white,
	success: Color.white,
	warning: Color.black,
	transparent: Color.white,

	// icons
	'white-outlined': Color.white
}

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export type ClampPaletteType = 'foreground' | 'background' | 'muted'

export type VividPaletteType =
	| 'primary'
	| 'danger'
	| 'success'
	| 'warning'
	| ClampPaletteType

export interface ColorProperties {
	color?: LineColorType | string
}

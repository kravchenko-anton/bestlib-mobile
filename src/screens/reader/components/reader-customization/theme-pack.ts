export interface ThemePackType {
	title: string
	slug: string
	statusBar: 'light' | 'dark'
	colorPalette: {
		primary: string
		secondary: string
		textSelection: string
		background: {
			normal: string
			lighter: string
			darker: string
		}
		mark: {
			background: string
			text: string
			hoverBackground: string
		}
		text: string
	}
}

const statusBar = {
	light: 'light' as const,
	dark: 'dark' as const
}

export const themePack: ThemePackType[] = [
	{
		title: 'Dark',
		slug: 'dark',
		statusBar: 'light',
		colorPalette: {
			mark: {
				background: '#2C3E50', // Slightly lighter for better contrast
				text: '#ECF0F1', // Softer white for less glare
				hoverBackground: '#34495E' // Subtle hover effect
			},
			primary: '#4A90E2', // Slightly adjusted for better contrast
			secondary: '#E67E22', // More vibrant for balance
			background: {
				normal: '#1E1E1E', // Slightly lighter for less contrast
				lighter: '#2C2C2C',
				darker: '#121212'
			},
			textSelection: '#4CAF50', // More noticeable
			text: '#ECF0F1' // Softer white for text
		}
	},
	{
		title: 'Light',
		slug: 'light',
		statusBar: 'dark',
		colorPalette: {
			primary: '#007BFF', // Clear, bright primary color
			secondary: '#FF6F61', // Adjusted for consistency
			background: {
				normal: '#FFFFFF', // True white for clarity
				lighter: '#F8F9FA',
				darker: '#E9ECEF'
			},
			mark: {
				background: '#D04F8C', // Improved contrast
				text: '#FFFFFF',
				hoverBackground: '#C62828' // Clear hover effect
			},
			textSelection: '#00C853', // More visible selection color
			text: '#212121' // Darker text for better readability
		}
	},
	{
		title: 'Sepia',
		slug: 'sepia',
		statusBar: 'dark',
		colorPalette: {
			primary: '#D7BDAF', // Softer primary color
			secondary: '#E67E22', // Harmonizes with sepia tones
			background: {
				normal: '#FAF3E0', // Gentle beige for comfort
				lighter: '#F5F0E8',
				darker: '#EAE0D6'
			},
			mark: {
				background: '#BFAE9F', // Balanced with the background
				text: '#FFFFFF',
				hoverBackground: '#D0B89D' // Smooth hover effect
			},
			textSelection: '#F4E1C9', // Enhanced visibility
			text: '#6D4C41' // Clear, readable text
		}
	},
	{
		title: 'Tokyo night',
		slug: 'tokyo-night',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#72d7c8',
			secondary: '#ffc66d',
			background: {
				normal: '#1a1b26',
				lighter: '#222332',
				darker: '#13131c'
			},
			mark: {
				background: '#475657',
				text: '#fff',
				hoverBackground: '#5A6C6D'
			},
			textSelection: '#3d4d5f',
			text: '#b7bcd9'
		}
	},
	{
		title: 'Kanagawa',
		slug: 'kanagawa',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#957fb8',
			secondary: '#ff4848',
			background: {
				normal: '#1f1f28',
				lighter: '#272732',
				darker: '#1a1a22'
			},
			mark: {
				background: '#63557A',
				text: '#fff',
				hoverBackground: '#74668B'
			},
			textSelection: '#4f3f6f',
			text: '#dcd7ba'
		}
	},

	{
		title: 'Nord',
		slug: 'nord',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#81a1c1',
			secondary: '#bf616a',
			background: {
				normal: '#2e3440',
				lighter: '#3b4252',
				darker: '#242831'
			},
			mark: {
				background: '#323C50',
				text: '#fff',
				hoverBackground: '#4A5568'
			},
			textSelection: '#4f3f6f',
			text: '#d8dee9'
		}
	},
	{
		title: 'Gruvbox',
		slug: 'gruvbox',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#fb4934',
			secondary: '#fabd2f',
			background: {
				normal: '#282828',
				lighter: '#3c3836',
				darker: '#1d2021'
			},
			mark: {
				background: '#504945',
				text: '#fff',
				hoverBackground: '#665C54'
			},
			textSelection: '#458588',
			text: '#ebdbb2'
		}
	},
	{
		title: "Dracula's Castle",
		slug: 'draculas-castle',
		statusBar: statusBar.light,
		colorPalette: {
			primary: '#ff79c6',
			secondary: '#bd93f9',
			background: {
				normal: '#282a36',
				lighter: '#373844',
				darker: '#1e2029'
			},
			mark: {
				background: '#4F3A65',
				text: '#fff',
				hoverBackground: '#5F4A75'
			},
			textSelection: '#44475a',
			text: '#f8f8f2'
		}
	}
]

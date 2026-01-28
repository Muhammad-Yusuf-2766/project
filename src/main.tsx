import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'
import { AppWithProviders } from './providers/AppProviders.tsx'

createRoot(document.getElementById('root')!).render(
	<>
		<AuthProvider>
			<AppWithProviders />
		</AuthProvider>
		<Toaster
			position='top-center'
			toastOptions={{
				duration: 2000,
				style: {
					background: '#111827', // bg
					color: '#3d3429', // text
					borderRadius: '12px',
					padding: '12px 14px',
					boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
				},
				success: {
					style: {
						background: '#fffdf9', // green
					},
					iconTheme: {
						primary: '#2d5a41',
						secondary: '#fffdf9',
					},
				},
				error: {
					style: {
						background: '#c45c4a',
						color: 'white', // red
					},
				},
			}}
		/>
	</>,
)

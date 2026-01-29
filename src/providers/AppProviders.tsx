import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import { useAuth } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'

export function AppWithProviders() {
	const { isLoggedIn, user } = useAuth()

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<CartProvider userId={isLoggedIn ? user?._id : undefined}>
				<App />
			</CartProvider>
		</QueryClientProvider>
	)
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'
import { useAuth } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import { FavoritesProvider } from '../context/FavoritesContext'

const queryClient = new QueryClient()
export function AppWithProviders() {
	const { isLoggedIn, user } = useAuth()

	return (
		<QueryClientProvider client={queryClient}>
			<FavoritesProvider>
				<CartProvider userId={isLoggedIn ? user?._id : undefined}>
					<App />
				</CartProvider>
			</FavoritesProvider>
		</QueryClientProvider>
	)
}

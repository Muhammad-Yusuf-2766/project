import App from '../App'
import { useAuth } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'

export function AppWithProviders() {
	const { isLoggedIn, user } = useAuth()

	return (
		<CartProvider userId={isLoggedIn ? user?._id : undefined}>
			<App />
		</CartProvider>
	)
}

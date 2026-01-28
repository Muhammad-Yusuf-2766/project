// routes/RequireAuth.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth() {
	const { isLoggedIn, status } = useAuth()
	const location = useLocation()

	// ✅ Refresh paytida shu yer muhim
	if (status === 'checking') {
		return (
			<div className='p-6 text-center text-text-muted mt-16'>
				Yuklanmoqda...
			</div>
		)
	}

	if (!isLoggedIn) {
		// ❗ toast'ni render ichida qo'yish yomon (har renderda chiqishi mumkin)
		return <Navigate to='/login' replace state={{ from: location.pathname }} />
	}

	return <Outlet />
}

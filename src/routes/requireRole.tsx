// routes/RequireRole.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PageLoading } from '../components/Loader/Loading'
import { useAuth } from '../context/AuthContext'

type Role = 'admin' | 'seller' | 'user'

export default function RequireRole({ allowed }: { allowed: Role[] }) {
	const { user, status } = useAuth()
	const location = useLocation()

	if (status === 'checking') {
		return <PageLoading text='Sahifa yuklanmoqda...' />
	}

	if (!user) {
		return <Navigate to='/login' replace state={{ from: location.pathname }} />
	}

	if (!allowed.includes(user.role)) {
		return (
			<Navigate
				to='/not-authorized'
				replace
				state={{ from: location.pathname }}
			/>
		)
	}

	return <Outlet />
}

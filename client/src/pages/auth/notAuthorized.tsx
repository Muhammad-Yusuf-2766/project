// pages/NotAuthorized.tsx
import { Link } from 'react-router-dom'

import { ArrowLeft, Home, Lock, LogIn } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Contactus from '../../components/Contactus'

export default function NotAuthorized() {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen md:flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-lg w-full text-center'>
				{/* Cartoon Image */}
				<div className='mb-6 sm:mb-8'>
					<img
						src='/not-authorized.jpg'
						alt='Ruxsat berilmagan'
						className='w-48 h-48 sm:w-64 sm:h-64 mx-auto object-contain rounded-2xl'
					/>
				</div>

				{/* Lock Icon */}
				<div className='w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6'>
					<Lock className='w-8 h-8 sm:w-10 sm:h-10 text-red-500' />
				</div>
			</div>
			<div>
				{/* Title */}
				<h1 className='text-2xl sm:text-3xl font-bold text-text mb-3 sm:mb-4'>
					Kirish taqiqlangan
				</h1>

				{/* Description */}
				<p className='text-text-muted text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed'>
					Kechirasiz, sizda bu sahifaga kirish huquqi yo'q. Iltimos,
					hisobingizga kiring yoki administrator bilan bog'laning.
				</p>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
					<Link
						to='/'
						className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl'
					>
						<Home className='w-4 h-4 sm:w-5 sm:h-5' />
						Bosh sahifa
					</Link>
					<Link
						to='/login'
						className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-text rounded-xl font-semibold text-sm sm:text-base hover:bg-light transition-colors'
					>
						<LogIn className='w-4 h-4 sm:w-5 sm:h-5' />
						Hisobga kirish
					</Link>
				</div>

				{/* Back Button */}
				<button
					onClick={() => navigate(-1)}
					className='mt-4 sm:mt-6 inline-flex items-center gap-2 text-text-muted hover:text-text font-medium text-sm sm:text-base transition-colors'
				>
					<ArrowLeft className='w-4 h-4' />
					Orqaga qaytish
				</button>

				{/* Help Box */}
				<Contactus />
			</div>
		</div>
	)
}

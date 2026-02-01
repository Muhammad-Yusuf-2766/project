import { ArrowLeft, Home, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function NotFound() {
	const navigate = useNavigate()

	return (
		<div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-lg w-full text-center'>
				{/* Cartoon Image */}
				<div className='mb-6 sm:mb-8'>
					<img
						src='/not-found.jpg'
						alt='Sahifa topilmadi'
						className='w-48 h-48 sm:w-64 sm:h-64 mx-auto object-contain rounded-2xl'
					/>
				</div>

				{/* 404 Text */}
				<h1 className='text-6xl sm:text-8xl font-bold text-primary mb-2 sm:mb-4'>
					404
				</h1>

				{/* Title */}
				<h2 className='text-2xl sm:text-3xl font-bold text-text mb-3 sm:mb-4'>
					Sahifa topilmadi
				</h2>

				{/* Description */}
				<p className='text-text-muted text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed'>
					Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
					ko'chirilgan bo'lishi mumkin.
				</p>

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
					<Link
						to='/'
						className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl'
					>
						<Home className='w-4 h-4 sm:w-5 sm:h-5' />
						Bosh sahifaga qaytish
					</Link>
					<button
						onClick={() => navigate(-1)}
						className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border text-text rounded-xl font-semibold text-sm sm:text-base hover:bg-light transition-colors'
					>
						<ArrowLeft className='w-4 h-4 sm:w-5 sm:h-5' />
						Orqaga qaytish
					</button>
				</div>

				{/* Search Suggestion */}
				<div className='mt-8 sm:mt-12 p-4 sm:p-6 bg-card rounded-xl border border-border'>
					<p className='text-text-muted text-sm mb-3'>
						Yoki mahsulotlarni qidirib ko'ring:
					</p>
					<Link
						to='/products'
						className='inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-sm sm:text-base'
					>
						<Search className='w-4 h-4 sm:w-5 sm:h-5' />
						Mahsulotlarni ko'rish
					</Link>
				</div>
			</div>
		</div>
	)
}

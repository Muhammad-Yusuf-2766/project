/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, LogIn, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Error from '../../components/Error'
import { useAuth } from '../../context/AuthContext'
import { migrateGuestCartToUser } from '../../lib/cartstorage'
import { loginApi } from '../../service/userApi'

export default function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { setAuthFromResponse } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const from = (location.state as any)?.from || '/'
	const [formData, setFormData] = useState({
		phone: '',
		password: '',
		rememberMe: false,
	})

	const handleSubmit = async (e: React.FormEvent) => {
		setError(null)
		e.preventDefault()
		const payload = {
			phone: formData.phone,
			password: formData.password,
		}
		const res = await loginApi(payload)
		if (res.failure) {
			return setError(res.failure)
		}
		if (res.user) {
			migrateGuestCartToUser(res.user._id)
			toast.success('Login qilindingiz!')
			setAuthFromResponse(res)
			navigate(from, { replace: true })
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	return (
		<div className='min-h-screen flex'>
			{/* Left Side - Form */}
			<div className='flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12'>
				<div className='w-full max-w-md'>
					{/* Logo */}
					<Link to='/' className='flex items-center justify-center gap-2 mb-8'>
						<ShoppingBag className='w-10 h-10 text-primary' />
						<span className='text-3xl font-bold text-text'>
							Ansor <span className='text-primary'>Market</span>
						</span>
					</Link>

					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='md:text-3xl text-xl font-bold text-text mb-2'>
							Xush kelibsiz!
						</h1>
						<p className='text-text-muted'>
							Iltimos Koreyadagi ishlaydigan telefon raqamingizni kiriting. Biz
							siz bilan ushbu raqam orqali bog'lanamiz. Yoki telegram orqali
							kiring
						</p>
					</div>

					{error && <Error error={error} />}

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-5'>
						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-text mb-2'
							>
								Telefon raqamingiz
							</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								placeholder='+82 10 4308 2766'
								className='w-full px-4 py-3 rounded-lg border border-border bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
								required
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-text mb-2'
							>
								Parol
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									id='password'
									name='password'
									value={formData.password}
									onChange={handleChange}
									placeholder='Parolingizni kiriting'
									className='w-full px-4 py-3 rounded-lg border border-border bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12'
									required
								/>
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors'
								>
									{showPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>

						<div className='flex items-center justify-between'>
							<label className='flex items-center gap-2 cursor-pointer'>
								<input
									type='checkbox'
									name='rememberMe'
									checked={formData.rememberMe}
									onChange={handleChange}
									className='w-4 h-4 rounded border-border text-primary focus:ring-primary/20'
								/>
								<span className='text-sm text-text-muted'>Eslab qolish</span>
							</label>
							<Link
								to='/forgot-password'
								className='text-sm text-primary hover:text-primary-hover font-medium'
							>
								Parolni unutdingizmi?
							</Link>
						</div>

						<button
							type='submit'
							className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl'
						>
							<LogIn className='w-5 h-5' />
							Kirish
						</button>
					</form>

					{/* Divider */}
					<div className='flex items-center gap-4 my-8'>
						<div className='flex-1 h-px bg-border'></div>
						<span className='text-text-muted text-sm'>yoki</span>
						<div className='flex-1 h-px bg-border'></div>
					</div>

					{/* Social Login */}
					{/* <div className='space-y-3'>
						<button className='w-full flex items-center justify-center gap-3 px-6 py-3 bg-card border border-border rounded-lg font-medium text-text hover:bg-light transition-colors'>
							Telegram bilan kirish
						</button>
					</div> */}

					{/* Sign Up Link */}
					<p className='text-center mt-8 text-text-muted'>
						Hisobingiz yo'qmi?{' '}
						<Link
							to='/register'
							className='text-primary hover:text-primary-hover font-semibold'
						>
							Ro'yxatdan o'tish
						</Link>
					</p>
				</div>
			</div>

			{/* Right Side - Image */}
			<div
				className='hidden lg:block lg:w-1/2 relative'
				style={{
					backgroundImage:
						'linear-gradient(to right, rgba(45, 90, 65, 0.9), rgba(45, 90, 65, 0.7)), url(https://images.pexels.com/photos/1367242/pexels-photo-1367242.jpeg?auto=compress&cs=tinysrgb&w=1260)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='absolute inset-0 flex flex-col items-center justify-center p-12 text-white'>
					<ShoppingBag className='w-16 h-16 mb-6' />
					<h2 className='text-4xl font-bold mb-4 text-center'>Ansor Market</h2>
					<p className='text-xl text-center text-white/90 max-w-md'>
						Halol mahsulotlar uchun ishonchli manba. Sifatli go'sht va yangi non
						- hammasi bir joyda.
					</p>
				</div>
			</div>
		</div>
	)
}

import { Eye, EyeOff, LogIn, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		rememberMe: false,
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle login logic here
		console.log('Login submitted:', formData)
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
						<h1 className='text-3xl font-bold text-text mb-2'>
							Xush kelibsiz!
						</h1>
						<p className='text-text-muted'>
							Hisobingizga kirish uchun ma'lumotlaringizni kiriting
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-5'>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-text mb-2'
							>
								Email manzil
							</label>
							<input
								type='email'
								id='email'
								name='email'
								value={formData.email}
								onChange={handleChange}
								placeholder='example@email.com'
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
					<div className='space-y-3'>
						<button className='w-full flex items-center justify-center gap-3 px-6 py-3 bg-card border border-border rounded-lg font-medium text-text hover:bg-light transition-colors'>
							<svg className='w-5 h-5' viewBox='0 0 24 24'>
								<path
									fill='currentColor'
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
								/>
								<path
									fill='currentColor'
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
								/>
								<path
									fill='currentColor'
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
								/>
								<path
									fill='currentColor'
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
								/>
							</svg>
							Google bilan kirish
						</button>
					</div>

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

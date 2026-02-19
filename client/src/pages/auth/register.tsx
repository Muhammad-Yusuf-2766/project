import { Eye, EyeOff, ShoppingBag, UserPlus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import Error from '../../components/Error'
import { useAuth } from '../../context/AuthContext'
import { registerApi } from '../../service/userApi'

export default function Register() {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		fullName: '',
		phone: '',
		password: '',
		confirmPassword: '',
		agreeToTerms: false,
	})
	const { setAuthFromResponse } = useAuth()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (formData.password !== formData.confirmPassword) {
			setError('Parollar mos kelmaydi!')
			return
		}
		// Handle signup logic here
		const payload = {
			fullName: formData.fullName,
			phone: formData.phone,
			password: formData.password,
		}

		const res = await registerApi(payload)
		if (res.failure) {
			setError(res.failure)
			return toast.error(res.failure)
		}
		setAuthFromResponse(res)
		toast.success('Ro`yxatdan o`tdingiz!')
		navigate('/')
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
			{/* Left Side - Image */}
			<div
				className='hidden lg:block lg:w-1/2 relative'
				style={{
					backgroundImage:
						'linear-gradient(to left, rgba(45, 90, 65, 0.9), rgba(45, 90, 65, 0.7)), url(https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1260)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='absolute inset-0 flex flex-col items-center justify-center p-12 text-white'>
					<img src='/ansor_logo_180px.png' className='' />
					<h2 className='text-4xl font-bold mb-4 text-center'>Ansor Market</h2>
					<p className='text-xl text-center text-white/90 max-w-md'>
						Bizning jamoamizga qo'shiling va eng yaxshi halol mahsulotlardan
						bahramand bo'ling.
					</p>
					<div className='mt-12 grid grid-cols-3 gap-8 text-center'>
						<div>
							<div className='text-3xl font-bold'>500+</div>
							<div className='text-white/80 text-sm'>Mahsulotlar</div>
						</div>
						<div>
							<div className='text-3xl font-bold'>10K+</div>
							<div className='text-white/80 text-sm'>Mijozlar</div>
						</div>
						<div>
							<div className='text-3xl font-bold'>50+</div>
							<div className='text-white/80 text-sm'>Sotuvchilar</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Form */}
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
							Ro'yxatdan o'tish
						</h1>
						<p className='text-text-muted'>
							Iltimos Koreyadagi ishlaydigan telefon raqamingizni kiriting. Biz
							siz bilan ushbu raqam orqali bog'lanamiz. Yoki telegram orqali
							kiring
						</p>
					</div>

					{error && <Error error={error} />}

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label
								htmlFor='fullName'
								className='block text-sm font-medium text-text mb-2'
							>
								To'liq ism
							</label>
							<input
								type='text'
								id='fullName'
								name='fullName'
								value={formData.fullName}
								onChange={handleChange}
								placeholder='Ismingizni kiriting'
								className='w-full px-4 py-3 rounded-lg border border-border bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
								required
							/>
						</div>

						<div>
							<label
								htmlFor='phone'
								className='block text-sm font-medium text-text mb-2'
							>
								Telefon raqam
							</label>
							<input
								type='tel'
								id='phone'
								name='phone'
								value={formData.phone}
								onChange={handleChange}
								placeholder='+998 90 123 45 67'
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
									placeholder='Parol yarating'
									className='w-full px-4 py-3 rounded-lg border border-border bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12'
									required
									minLength={8}
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

						<div>
							<label
								htmlFor='confirmPassword'
								className='block text-sm font-medium text-text mb-2'
							>
								Parolni tasdiqlang
							</label>
							<div className='relative'>
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									id='confirmPassword'
									name='confirmPassword'
									value={formData.confirmPassword}
									onChange={handleChange}
									placeholder='Parolni qayta kiriting'
									className='w-full px-4 py-3 rounded-lg border border-border bg-card text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-12'
									required
									minLength={8}
								/>
								<button
									type='button'
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className='absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors'
								>
									{showConfirmPassword ? (
										<EyeOff className='w-5 h-5' />
									) : (
										<Eye className='w-5 h-5' />
									)}
								</button>
							</div>
						</div>

						<div className='flex items-start gap-2'>
							<input
								type='checkbox'
								id='agreeToTerms'
								name='agreeToTerms'
								checked={formData.agreeToTerms}
								onChange={handleChange}
								className='w-4 h-4 mt-1 rounded border-border text-primary focus:ring-primary/20'
								required
							/>
							<label htmlFor='agreeToTerms' className='text-sm text-text-muted'>
								Men{' '}
								<Link
									to='/terms'
									className='text-primary hover:text-primary-hover'
								>
									Foydalanish shartlari
								</Link>{' '}
								va{' '}
								<Link
									to='/privacy'
									className='text-primary hover:text-primary-hover'
								>
									Maxfiylik siyosati
								</Link>
								ga roziman
							</label>
						</div>

						<button
							type='submit'
							className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl mt-6'
						>
							<UserPlus className='w-5 h-5' />
							Ro'yxatdan o'tish
						</button>
					</form>

					{/* Divider */}
					<div className='flex items-center gap-4 my-6'>
						<div className='flex-1 h-px bg-border'></div>
						<span className='text-text-muted text-sm'>yoki</span>
						<div className='flex-1 h-px bg-border'></div>
					</div>

					{/* Social Signup */}
					{/* <button className='w-full flex items-center justify-center gap-3 px-6 py-3 bg-card border border-border rounded-lg font-medium text-text hover:bg-light transition-colors'>
						Telegram bilan ro'yxatdan o'tish
					</button> */}

					{/* Login Link */}
					<p className='text-center mt-6 text-text-muted'>
						Hisobingiz bormi?{' '}
						<Link
							to='/login'
							className='text-primary hover:text-primary-hover font-semibold'
						>
							Kirish
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

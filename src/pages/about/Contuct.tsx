import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react'
import { useState } from 'react'

interface FormData {
	name: string
	email: string
	phone: string
	subject: string
	message: string
}

const contactInfo = [
	{
		icon: Phone,
		title: 'Telefon',
		value: '+998 71 123 45 67',
		subtext: '+998 90 123 45 67',
	},
	{
		icon: Mail,
		title: 'Email',
		value: 'info@ansormarket.uz',
		subtext: 'support@ansormarket.uz',
	},
	{
		icon: MapPin,
		title: 'Manzil',
		value: 'Toshkent shahar',
		subtext: 'Chilanzar tumani, 5-mavze, 12-uy',
	},
	{
		icon: Clock,
		title: 'Ish vaqti',
		value: 'Dushanba - Shanba',
		subtext: '9:00 - 18:00',
	},
]

const faqItems = [
	{
		question: 'Buyurtmani qanday berish mumkin?',
		answer:
			"Saytimizda ro'yxatdan o'ting, mahsulotlarni savatga qo'shing va buyurtmani tasdiqlang. Biz sizga 1-2 kun ichida yetkazib beramiz.",
	},
	{
		question: "To'lov usullari qanday?",
		answer:
			"Biz Payme, Click va naqd pul orqali to'lovlarni qabul qilamiz. Yetkazib berishda to'lash ham mumkin.",
	},
	{
		question: 'Mahsulotni qaytarish mumkinmi?',
		answer:
			"Ha, agar mahsulot sifati yomonlashgan bo'lsa, 24 soat ichida qaytarishingiz mumkin. Pulni to'liq qaytaramiz.",
	},
]

export default function Contact() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000))

		setIsSubmitting(false)
		setSubmitSuccess(true)
		setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

		setTimeout(() => setSubmitSuccess(false), 5000)
	}

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<div
				className='relative text-white py-16 sm:py-24'
				style={{
					backgroundImage:
						'linear-gradient(rgba(45, 90, 65, 0.9), rgba(45, 90, 65, 0.85)), url(https://images.pexels.com/photos/821754/pexels-photo-821754.jpeg?auto=compress&cs=tinysrgb&w=1260)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6'>
						Biz bilan bog'laning
					</h1>
					<p className='text-lg sm:text-xl text-white/90 max-w-2xl mx-auto'>
						Savollaringiz bormi? Biz sizga yordam berishdan xursand bo'lamiz
					</p>
				</div>
			</div>

			{/* Contact Info Cards */}
			<div className='bg-card py-8 sm:py-12 border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
						{contactInfo.map((info, index) => {
							const Icon = info.icon
							return (
								<div
									key={index}
									className='bg-light p-4 sm:p-6 rounded-xl text-center hover:shadow-md transition-shadow'
								>
									<div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4'>
										<Icon className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
									</div>
									<h3 className='font-semibold text-text text-sm sm:text-base mb-1'>
										{info.title}
									</h3>
									<p className='text-text text-xs sm:text-sm font-medium'>
										{info.value}
									</p>
									<p className='text-text-muted text-xs sm:text-sm'>
										{info.subtext}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Contact Form & FAQ */}
			<div className='py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid lg:grid-cols-2 gap-8 sm:gap-12'>
						{/* Contact Form */}
						<div className='bg-card rounded-2xl shadow-lg p-5 sm:p-8'>
							<div className='flex items-center gap-2 mb-4 sm:mb-6'>
								<MessageSquare className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
								<h2 className='text-xl sm:text-2xl font-bold text-text'>
									Xabar yuborish
								</h2>
							</div>

							{submitSuccess && (
								<div className='mb-6 p-4 bg-green-50 border border-green-200 rounded-xl'>
									<p className='text-green-700 text-sm sm:text-base'>
										Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan
										bog'lanamiz.
									</p>
								</div>
							)}

							<form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
								<div className='grid sm:grid-cols-2 gap-4 sm:gap-5'>
									<div>
										<label className='block text-sm font-medium text-text mb-1.5 sm:mb-2'>
											Ismingiz
										</label>
										<input
											type='text'
											name='name'
											value={formData.name}
											onChange={handleChange}
											placeholder='Ismingizni kiriting'
											className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-light text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base'
											required
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-text mb-1.5 sm:mb-2'>
											Email
										</label>
										<input
											type='email'
											name='email'
											value={formData.email}
											onChange={handleChange}
											placeholder='example@email.com'
											className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-light text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base'
											required
										/>
									</div>
								</div>

								<div className='grid sm:grid-cols-2 gap-4 sm:gap-5'>
									<div>
										<label className='block text-sm font-medium text-text mb-1.5 sm:mb-2'>
											Telefon
										</label>
										<input
											type='tel'
											name='phone'
											value={formData.phone}
											onChange={handleChange}
											placeholder='+998 90 123 45 67'
											className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-light text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base'
										/>
									</div>
									<div>
										<label className='block text-sm font-medium text-text mb-1.5 sm:mb-2'>
											Mavzu
										</label>
										<select
											name='subject'
											value={formData.subject}
											onChange={handleChange}
											className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-sm sm:text-base'
											required
										>
											<option value=''>Mavzuni tanlang</option>
											<option value='order'>Buyurtma haqida</option>
											<option value='product'>Mahsulot haqida</option>
											<option value='delivery'>Yetkazib berish</option>
											<option value='partnership'>Hamkorlik</option>
											<option value='other'>Boshqa</option>
										</select>
									</div>
								</div>

								<div>
									<label className='block text-sm font-medium text-text mb-1.5 sm:mb-2'>
										Xabar
									</label>
									<textarea
										name='message'
										value={formData.message}
										onChange={handleChange}
										placeholder='Xabaringizni yozing...'
										rows={5}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-light text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none text-sm sm:text-base'
										required
									/>
								</div>

								<button
									type='submit'
									disabled={isSubmitting}
									className='w-full px-6 py-3 sm:py-4 bg-primary text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-hover transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
								>
									{isSubmitting ? (
										<>
											<div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
											Yuborilmoqda...
										</>
									) : (
										<>
											<Send className='w-4 h-4 sm:w-5 sm:h-5' />
											Yuborish
										</>
									)}
								</button>
							</form>
						</div>

						{/* FAQ Section */}
						<div>
							<div className='flex items-center gap-2 mb-4 sm:mb-6'>
								<MessageSquare className='w-5 h-5 sm:w-6 sm:h-6 text-secondary' />
								<h2 className='text-xl sm:text-2xl font-bold text-text'>
									Ko'p so'raladigan savollar
								</h2>
							</div>

							<div className='space-y-4'>
								{faqItems.map((item, index) => (
									<div
										key={index}
										className='bg-card rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow'
									>
										<h3 className='font-semibold text-text text-sm sm:text-base mb-2'>
											{item.question}
										</h3>
										<p className='text-text-muted text-xs sm:text-sm leading-relaxed'>
											{item.answer}
										</p>
									</div>
								))}
							</div>

							{/* Social Media */}
							<div className='mt-8 p-5 sm:p-6 bg-light rounded-xl'>
								<h3 className='font-semibold text-text text-sm sm:text-base mb-4'>
									Ijtimoiy tarmoqlarda kuzating
								</h3>
								<div className='flex gap-3'>
									<a
										href='https://t.me/ansormarket'
										target='_blank'
										rel='noopener noreferrer'
										className='w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm'
									>
										<svg
											className='w-5 h-5 sm:w-6 sm:h-6'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
										</svg>
									</a>
									<a
										href='https://instagram.com/ansormarket'
										target='_blank'
										rel='noopener noreferrer'
										className='w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm'
									>
										<svg
											className='w-5 h-5 sm:w-6 sm:h-6'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
										</svg>
									</a>
									<a
										href='https://facebook.com/ansormarket'
										target='_blank'
										rel='noopener noreferrer'
										className='w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm'
									>
										<svg
											className='w-5 h-5 sm:w-6 sm:h-6'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
										</svg>
									</a>
									<a
										href='https://youtube.com/ansormarket'
										target='_blank'
										rel='noopener noreferrer'
										className='w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors shadow-sm'
									>
										<svg
											className='w-5 h-5 sm:w-6 sm:h-6'
											viewBox='0 0 24 24'
											fill='currentColor'
										>
											<path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

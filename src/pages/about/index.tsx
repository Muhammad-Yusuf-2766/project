import {
	Award,
	Clock,
	Heart,
	MapPin,
	Shield,
	Target,
	Truck,
	Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
	{ label: 'Mahsulotlar', value: '500+' },
	{ label: 'Mijozlar', value: '10,000+' },
	{ label: 'Sotuvchilar', value: '50+' },
	{ label: 'Yillik tajriba', value: '5+' },
]

const values = [
	{
		icon: Shield,
		title: '100% Halol',
		description:
			"Barcha mahsulotlarimiz halol sertifikatiga ega va sifat nazoratidan o'tgan.",
	},
	{
		icon: Heart,
		title: "Mijozlarga g'amxo'rlik",
		description:
			'Mijozlarimizning ehtiyojlari biz uchun ustuvor. Har doim yordam berishga tayyormiz.',
	},
	{
		icon: Truck,
		title: 'Tez yetkazib berish',
		description:
			"Toshkent bo'ylab 1-2 kun ichida buyurtmangizni yetkazib beramiz.",
	},
	{
		icon: Award,
		title: 'Sifat kafolati',
		description:
			"Eng yuqori sifatli mahsulotlarni taqdim etamiz. Mamnun bo'lmasangiz, pulni qaytaramiz.",
	},
]

const team = [
	{
		name: 'Anvar Karimov',
		role: 'Asoschisi va CEO',
		image:
			'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
	},
	{
		name: 'Malika Rahimova',
		role: 'Operatsiyalar direktori',
		image:
			'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
	},
	{
		name: 'Jasur Toshmatov',
		role: 'Texnik direktor',
		image:
			'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
	},
]

export default function About() {
	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<div
				className='relative text-white py-16 sm:py-24'
				style={{
					backgroundImage:
						'linear-gradient(#14141490, #14141499), url(https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6'>
						Biz haqimizda
					</h1>
					<p className='text-lg sm:text-xl text-white/90 max-w-2xl mx-auto'>
						Ansor Market - O'zbekistonda ishonchli halol mahsulotlar yetkazib
						beruvchi platform
					</p>
				</div>
			</div>

			{/* Stats Section */}
			<div className='bg-card py-8 sm:py-12 border-b border-border'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8'>
						{stats.map((stat, index) => (
							<div key={index} className='text-center'>
								<div className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1'>
									{stat.value}
								</div>
								<div className='text-text-muted text-sm sm:text-base'>
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Our Story */}
			<div className='py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid lg:grid-cols-2 gap-8 sm:gap-12 items-center'>
						<div>
							<div className='flex items-center gap-2 mb-4'>
								<Target className='w-5 h-5 sm:w-6 sm:h-6 text-secondary' />
								<span className='text-secondary font-semibold uppercase tracking-wider text-sm'>
									Bizning tariximiz
								</span>
							</div>
							<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4 sm:mb-6'>
								2020-yildan beri ishonch bilan xizmat qilmoqdamiz
							</h2>
							<div className='space-y-4 text-text-muted text-sm sm:text-base leading-relaxed'>
								<p>
									Ansor Market 2020-yilda Toshkentda kichik oilaviy biznes
									sifatida boshlangan. Bizning maqsadimiz - O'zbekiston
									aholisiga eng sifatli halol mahsulotlarni qulay narxlarda
									yetkazib berishdir.
								</p>
								<p>
									Bugungi kunda biz 50 dan ortiq ishonchli sotuvchilar bilan
									hamkorlik qilamiz va 10,000 dan ortiq doimiy mijozlarimizga
									xizmat ko'rsatamiz. Bizning barcha mahsulotlarimiz halol
									sertifikatiga ega va qat'iy sifat nazoratidan o'tadi.
								</p>
								<p>
									Biz nafaqat mahsulot sotamiz, balki oilangiz uchun sog'lom va
									halol ovqatlanish madaniyatini targ'ib qilamiz.
								</p>
							</div>
						</div>
						<div className='relative'>
							<img
								src='https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
								alt='Ansor Market jamoasi'
								className='rounded-2xl shadow-xl w-full'
							/>
							<div className='absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-primary/20 rounded-full blur-2xl -z-10'></div>
							<div className='absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 bg-secondary/20 rounded-full blur-2xl -z-10'></div>
						</div>
					</div>
				</div>
			</div>

			{/* Our Values */}
			<div className='bg-light py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-10 sm:mb-12'>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-3 sm:mb-4'>
							Bizning qadriyatlarimiz
						</h2>
						<p className='text-text-muted text-sm sm:text-base max-w-2xl mx-auto'>
							Biz ishimizda quyidagi tamoyillarga amal qilamiz
						</p>
					</div>

					<div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
						{values.map((value, index) => {
							const Icon = value.icon
							return (
								<div
									key={index}
									className='bg-card p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow'
								>
									<div className='w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4'>
										<Icon className='w-6 h-6 text-primary' />
									</div>
									<h3 className='text-lg font-semibold text-text mb-2'>
										{value.title}
									</h3>
									<p className='text-text-muted text-sm leading-relaxed'>
										{value.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* Team Section */}
			<div className='py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-10 sm:mb-12'>
						<div className='flex items-center justify-center gap-2 mb-4'>
							<Users className='w-5 h-5 sm:w-6 sm:h-6 text-secondary' />
							<span className='text-secondary font-semibold uppercase tracking-wider text-sm'>
								Bizning jamoa
							</span>
						</div>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-3 sm:mb-4'>
							Professional jamoa
						</h2>
						<p className='text-text-muted text-sm sm:text-base max-w-2xl mx-auto'>
							Tajribali va fidoyi mutaxassislar jamoasi sizga xizmat ko'rsatadi
						</p>
					</div>

					<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
						{team.map((member, index) => (
							<div
								key={index}
								className='bg-card rounded-xl shadow-sm overflow-hidden group'
							>
								<div className='h-48 sm:h-56 overflow-hidden'>
									<img
										src={member.image || '/placeholder.svg'}
										alt={member.name}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
									/>
								</div>
								<div className='p-4 sm:p-5 text-center'>
									<h3 className='text-lg font-semibold text-text'>
										{member.name}
									</h3>
									<p className='text-text-muted text-sm'>{member.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Google Maps Location */}
			<div className='bg-light py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-8 sm:mb-10'>
						<div className='flex items-center justify-center gap-2 mb-4'>
							<MapPin className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
							<span className='text-primary font-semibold uppercase tracking-wider text-sm'>
								Bizning manzil
							</span>
						</div>
						<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-3 sm:mb-4'>
							Bizni toping
						</h2>
						<p className='text-text-muted text-sm sm:text-base max-w-2xl mx-auto'>
							Ofisimizga tashrif buyuring yoki onlayn buyurtma bering
						</p>
					</div>

					{/* Map Container */}
					<div className='bg-card rounded-2xl shadow-lg overflow-hidden'>
						<div className='aspect-video sm:aspect-[21/9]'>
							<iframe
								src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0234567890123!2d69.2401!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890'
								width='100%'
								height='100%'
								style={{ border: 0 }}
								allowFullScreen
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
								title='Ansor Market joylashuvi'
							></iframe>
						</div>
						<div className='p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
							<div className='flex items-start gap-3'>
								<div className='p-2 bg-primary/10 rounded-lg'>
									<MapPin className='w-5 h-5 text-primary' />
								</div>
								<div>
									<h3 className='font-semibold text-text text-sm sm:text-base'>
										Ansor Market Bosh ofisi
									</h3>
									<p className='text-text-muted text-xs sm:text-sm'>
										Toshkent shahar, Chilanzar tumani, 5-mavze, 12-uy
									</p>
								</div>
							</div>
							<div className='flex items-center gap-2 text-text-muted text-xs sm:text-sm'>
								<Clock className='w-4 h-4' />
								<span>Dushanba - Shanba: 9:00 - 18:00</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-primary py-12 sm:py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4'>
						Biz bilan hamkorlik qiling
					</h2>
					<p className='text-white/90 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto'>
						Sotuvchi sifatida ro'yxatdan o'ting yoki hoziroq xarid qilishni
						boshlang
					</p>
					<div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
						<Link
							to='/products'
							className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-xl font-semibold text-sm sm:text-base hover:bg-light transition-colors shadow-lg'
						>
							Xarid qilish
						</Link>
						<Link
							to='/contact'
							className='w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary-hover text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-hover/90 transition-colors border border-white/20'
						>
							Bog'lanish
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

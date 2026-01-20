import {
	Award,
	Beef,
	ChefHat,
	Clock,
	Flame,
	Play,
	Shield,
	ShoppingCart,
	Sparkles,
	Star,
	TrendingUp,
	Wheat,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// <CHANGE> Removed HomeProps interface and onNavigate prop

export default function Home() {
	const [isVideoPlaying, setIsVideoPlaying] = useState(false)

	const categories = [
		{
			name: 'Beef',
			icon: Beef,
			image:
				'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Premium quality halal beef',
		},
		{
			name: 'Mutton',
			icon: Beef,
			image:
				'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Fresh halal mutton',
		},
		{
			name: 'Chicken',
			icon: ChefHat,
			image:
				'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Farm-fresh halal chicken',
		},
		{
			name: 'Bread',
			icon: Wheat,
			image:
				'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
			description: 'Freshly baked daily',
		},
	]

	const features = [
		{
			icon: Shield,
			title: '100% Halal Certified',
			description:
				'All products are certified halal and meet the highest standards',
		},
		{
			icon: Clock,
			title: 'Fresh Daily',
			description: 'Products delivered fresh every day from trusted sellers',
		},
		{
			icon: Award,
			title: 'Quality Guaranteed',
			description: 'We ensure the highest quality standards for all products',
		},
	]

	const topProducts = [
		{
			id: 1,
			name: 'Premium Beef Steak',
			price: 89000,
			originalPrice: 110000,
			image:
				'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.9,
			reviews: 234,
			seller: 'Halal Farms',
			badge: 'Best Seller',
		},
		{
			id: 2,
			name: 'Fresh Lamb Chops',
			price: 75000,
			originalPrice: 95000,
			image:
				'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.8,
			reviews: 189,
			seller: 'Mountain Meats',
			badge: 'Top Rated',
		},
		{
			id: 3,
			name: 'Organic Chicken Breast',
			price: 45000,
			originalPrice: 55000,
			image:
				'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.7,
			reviews: 312,
			seller: 'Green Valley',
			badge: 'Organic',
		},
		{
			id: 4,
			name: 'Artisan Sourdough Bread',
			price: 18000,
			originalPrice: 22000,
			image:
				'https://images.pexels.com/photos/1510684/pexels-photo-1510684.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.9,
			reviews: 156,
			seller: 'Baker House',
			badge: 'Fresh Daily',
		},
	]

	const recentProducts = [
		{
			id: 5,
			name: 'Marinated Kebab Mix',
			price: 65000,
			image:
				'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.6,
			seller: 'Kebab Master',
			isNew: true,
		},
		{
			id: 6,
			name: 'Ground Beef Premium',
			price: 52000,
			image:
				'https://images.pexels.com/photos/128401/pexels-photo-128401.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.5,
			seller: 'Halal Farms',
			isNew: true,
		},
		{
			id: 7,
			name: 'Whole Roast Chicken',
			price: 48000,
			image:
				'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.7,
			seller: 'Farm Fresh',
			isNew: true,
		},
		{
			id: 8,
			name: 'Traditional Flatbread',
			price: 12000,
			image:
				'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.8,
			seller: 'Local Bakery',
			isNew: true,
		},
		{
			id: 9,
			name: 'Lamb Shoulder Cut',
			price: 82000,
			image:
				'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.6,
			seller: 'Mountain Meats',
			isNew: true,
		},
		{
			id: 10,
			name: 'Chicken Wings Pack',
			price: 35000,
			image:
				'https://images.pexels.com/photos/60616/fried-chicken-meal-fast-food-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
			rating: 4.4,
			seller: 'Green Valley',
			isNew: true,
		},
	]

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('uz-UZ').format(price) + " so'm"
	}

	return (
		<div className='min-h-screen'>
			{/* Hero Section */}
			<div
				className='relative text-light'
				style={{
					backgroundImage:
						'linear-gradient(#14141490, #14141499), url(https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32'>
					<div className='max-w-3xl'>
						<h1 className='text-3xl md:text-6xl font-bold mb-6 leading-tight'>
							Halollik, foydadan ustun turadi
						</h1>
						<p className='text-xl md:text-2xl mb-8'>
							Ansor Market da halol go'sht, yangi yopilgan non va saralangan
							halol mahsulotlarni oson topasiz.
						</p>
						<div className='flex flex-col sm:flex-row gap-4'>
							<Link
								to='/products'
								className='px-8 py-4 bg-card text-primary rounded-lg font-semibold text-lg hover:bg-light transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center'
							>
								Harid qilish
							</Link>
							<button className='px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-hover transition-all shadow-lg'>
								Biz bilan bog'lanish
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Top Products Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='flex items-center justify-between mb-10'>
					<div>
						<div className='flex items-center gap-2 mb-2'>
							<Flame className='w-6 h-6 text-secondary' />
							<span className='text-secondary font-semibold uppercase tracking-wider text-sm'>
								Eng yaxshilari
							</span>
						</div>
						<h2 className='text-3xl md:text-4xl font-bold text-text'>
							Top Mahsulotlar
						</h2>
					</div>
					<Link
						to='/products'
						className='hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all'
					>
						Barchasini ko'rish
						<TrendingUp className='w-5 h-5' />
					</Link>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
					{topProducts.map(product => (
						<div
							key={product.id}
							className='group bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'
						>
							<div className='relative h-52 overflow-hidden'>
								<img
									src={product.image || '/placeholder.svg'}
									alt={product.name}
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
								/>
								<div className='absolute top-3 left-3'>
									<span className='px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full'>
										{product.badge}
									</span>
								</div>
								{product.originalPrice && (
									<div className='absolute top-3 right-3'>
										<span className='px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full'>
											-
											{Math.round(
												((product.originalPrice - product.price) /
													product.originalPrice) *
													100,
											)}
											%
										</span>
									</div>
								)}
							</div>
							<div className='p-5'>
								<p className='text-text-muted text-sm mb-1'>{product.seller}</p>
								<h3 className='text-text font-semibold text-lg mb-2 line-clamp-1'>
									{product.name}
								</h3>
								<div className='flex items-center gap-1 mb-3'>
									<Star className='w-4 h-4 fill-secondary text-secondary' />
									<span className='text-text font-medium'>
										{product.rating}
									</span>
									<span className='text-text-muted text-sm'>
										({product.reviews})
									</span>
								</div>
								<div className='flex items-center justify-between'>
									<div>
										<span className='text-primary font-bold text-lg'>
											{formatPrice(product.price)}
										</span>
										{product.originalPrice && (
											<span className='text-text-muted text-sm line-through ml-2'>
												{formatPrice(product.originalPrice)}
											</span>
										)}
									</div>
									<button className='p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'>
										<ShoppingCart className='w-5 h-5' />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				<Link
					to='/products'
					className='md:hidden flex items-center justify-center gap-2 mt-8 text-primary font-semibold'
				>
					Barchasini ko'rish
					<TrendingUp className='w-5 h-5' />
				</Link>
			</div>

			{/* Market Video/Ads Section - UPDATED */}
			<div className='bg-card py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='grid lg:grid-cols-2 gap-12 items-center'>
						<div>
							<div className='flex items-center gap-2 mb-4'>
								<Sparkles className='w-6 h-6 text-secondary' />
								<span className='text-secondary font-semibold uppercase tracking-wider text-sm'>
									Biz haqimizda
								</span>
							</div>
							<h2 className='text-3xl md:text-4xl font-bold text-text mb-6'>
								Ansor Market - Halol mahsulotlar uchun ishonchli manba
							</h2>
							<p className='text-text-secondary text-lg mb-6 leading-relaxed'>
								Biz 2020-yildan beri mijozlarimizga eng sifatli halol
								mahsulotlarni yetkazib beramiz. Bizning barcha mahsulotlarimiz
								sertifikatlangan va sifat nazoratidan o'tgan.
							</p>
							<div className='grid grid-cols-3 gap-6 mb-8'>
								<div className='text-center'>
									<div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
										500+
									</div>
									<div className='text-text-muted text-sm'>Mahsulotlar</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
										10K+
									</div>
									<div className='text-text-muted text-sm'>Mijozlar</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl md:text-4xl font-bold text-primary mb-1'>
										50+
									</div>
									<div className='text-text-muted text-sm'>Sotuvchilar</div>
								</div>
							</div>
							<Link
								to='/products'
								className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-all'
							>
								Mahsulotlarni ko'rish
								<ShoppingCart className='w-5 h-5' />
							</Link>
						</div>
						<div className='relative'>
							<div className='relative rounded-2xl overflow-hidden shadow-2xl'>
								{isVideoPlaying ? (
									<iframe
										className='w-full h-80 lg:h-96'
										src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
										title='Ansor Market Video'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
									></iframe>
								) : (
									<div
										className='cursor-pointer group'
										onClick={() => setIsVideoPlaying(true)}
									>
										<img
											src='https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800'
											alt='Ansor Market Video'
											className='w-full h-80 lg:h-96 object-cover'
										/>
										<div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center'>
											<div className='w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl'>
												<Play className='w-8 h-8 text-primary ml-1' />
											</div>
										</div>
									</div>
								)}
							</div>
							{/* Decorative elements */}
							<div className='absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl -z-10'></div>
							<div className='absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10'></div>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Products Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='flex items-center justify-between mb-10'>
					<div>
						<div className='flex items-center gap-2 mb-2'>
							<Clock className='w-6 h-6 text-primary' />
							<span className='text-primary font-semibold uppercase tracking-wider text-sm'>
								Yangi kelganlar
							</span>
						</div>
						<h2 className='text-3xl md:text-4xl font-bold text-text'>
							So'nggi Mahsulotlar
						</h2>
					</div>
					<Link
						to='/products'
						className='hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all'
					>
						Barchasini ko'rish
						<TrendingUp className='w-5 h-5' />
					</Link>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
					{recentProducts.map(product => (
						<div
							key={product.id}
							className='group bg-card rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300'
						>
							<div className='relative h-36 overflow-hidden'>
								<img
									src={product.image || '/placeholder.svg'}
									alt={product.name}
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
								/>
								{product.isNew && (
									<div className='absolute top-2 left-2'>
										<span className='px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded-full'>
											Yangi
										</span>
									</div>
								)}
							</div>
							<div className='p-3'>
								<p className='text-text-muted text-xs mb-1'>{product.seller}</p>
								<h3 className='text-text font-medium text-sm mb-1 line-clamp-1'>
									{product.name}
								</h3>
								<div className='flex items-center gap-1 mb-2'>
									<Star className='w-3 h-3 fill-secondary text-secondary' />
									<span className='text-text text-xs'>{product.rating}</span>
								</div>
								<span className='text-primary font-bold text-sm'>
									{formatPrice(product.price)}
								</span>
							</div>
						</div>
					))}
				</div>

				<Link
					to='/products'
					className='md:hidden flex items-center justify-center gap-2 mt-8 text-primary font-semibold'
				>
					Barchasini ko'rish
					<TrendingUp className='w-5 h-5' />
				</Link>
			</div>

			{/* Categories Section */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-text'>
				<div className='text-center mb-12'>
					<h2 className='text-4xl font-bold mb-4'>
						Kategoriyalar bo'yicha xarid qiling
					</h2>
					<p className='text-xl text-text-secondary'>
						Halol mahsulotlar ro'yhati bilan tanishing
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{categories.map((category, index) => {
						const Icon = category.icon
						return (
							<Link
								to='/products'
								key={index}
								className='group bg-card hover:bg-light cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105'
							>
								<div className='relative h-48 overflow-hidden'>
									<img
										src={category.image || '/placeholder.svg'}
										alt={category.name}
										className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
									<div className='absolute bottom-4 left-4 text-white'>
										<Icon className='w-8 h-8 mb-2' />
										<h3 className='text-2xl font-bold'>{category.name}</h3>
									</div>
								</div>
								<div className='p-6'>
									<p className='text-gray-600'>{category.description}</p>
									<span className='mt-4 text-primary font-semibold flex items-center group-hover:translate-x-2 transition-transform'>
										Harid qilish
										<ShoppingCart className='w-4 h-4 ml-2' />
									</span>
								</div>
							</Link>
						)
					})}
				</div>
			</div>

			{/* Features Section */}
			<div className='py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='text-center mb-12'>
						<h2 className='text-4xl font-bold text-text mb-4'>
							Nima uchun Ansor Market?
						</h2>
						<p className='text-xl text-text-secondary'>
							Sifatli halol mahsulotlar uchun ishonchli hamkor
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{features.map((feature, index) => {
							const Icon = feature.icon
							return (
								<div
									key={index}
									className='bg-card hover:bg-light p-8 rounded-xl shadow-lg hover:shadow-xl transition-all'
								>
									<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6'>
										<Icon className='w-8 h-8 text-primary' />
									</div>
									<h3 className='text-2xl font-bold text-text mb-4'>
										{feature.title}
									</h3>
									<p className='text-text-muted leading-relaxed'>
										{feature.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className='bg-card text-text py-16'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
					<h2 className='text-4xl font-bold mb-4'>
						Sotuvchi bo'lishni xohlaysizmi?
					</h2>
					<p className='text-xl text-text-muted mb-8 max-w-2xl mx-auto'>
						Ishonchli sotuvchilar jamoamizga qo'shiling va minglab mijozlarga
						sifatli halol mahsulotlaringizni yetkazing.
					</p>
					<button className='px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl transform hover:scale-105'>
						Sotuvchi sifatida ro'yxatdan o'tish
					</button>
				</div>
			</div>
		</div>
	)
}

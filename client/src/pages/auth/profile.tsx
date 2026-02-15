import {
	Camera,
	ChevronRight,
	CreditCard,
	Edit2,
	Heart,
	History,
	LogOut,
	Mail,
	MapPin,
	Package,
	Phone,
	Save,
	Settings,
	ShoppingBag,
	User,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { formatPrice } from '../../lib/helpers'

interface UserData {
	fullName: string
	email: string
	phone: string
	address: string
	city: string
	avatar: string
}

const mockOrders = [
	{
		id: 'ORD-001',
		date: '2024-01-15',
		status: 'Yetkazildi',
		total: 185000,
		items: 3,
	},
	{
		id: 'ORD-002',
		date: '2024-01-10',
		status: 'Yetkazilmoqda',
		total: 92000,
		items: 2,
	},
	{
		id: 'ORD-003',
		date: '2024-01-05',
		status: 'Yetkazildi',
		total: 245000,
		items: 5,
	},
]

export default function Profile() {
	const [isEditing, setIsEditing] = useState(false)
	const { user, logout } = useAuth()

	const [activeTab, setActiveTab] = useState<
		'profile' | 'orders' | 'favorites' | 'settings'
	>('profile')
	const [userData, setUserData] = useState<UserData>({
		fullName: 'Alisher Karimov',
		email: 'alisher@email.com',
		phone: '+998 90 123 45 67',
		address: 'Chilanzar tumani, 5-mavze, 12-uy',
		city: 'Toshkent',
		avatar:
			'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setUserData(prev => ({ ...prev, [name]: value }))
	}

	const handleSave = () => {
		setIsEditing(false)
		// Save logic here
		console.log('Profile saved:', userData)
	}

	const menuItems = [
		{ id: 'profile', label: "Shaxsiy ma'lumotlar", icon: User },
		{ id: 'orders', label: 'Buyurtmalar tarixi', icon: Package },
		{ id: 'favorites', label: 'Sevimlilar', icon: Heart },
		{ id: 'settings', label: 'Sozlamalar', icon: Settings },
	]

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Yetkazildi':
				return 'bg-green-100 text-green-700'
			case 'Yetkazilmoqda':
				return 'bg-blue-100 text-blue-700'
			case 'Bekor qilindi':
				return 'bg-red-100 text-red-700'
			default:
				return 'bg-gray-100 text-gray-700'
		}
	}

	const handleLogout = () => {
		logout()
		window.location.replace('/')
	}

	return (
		<div className='min-h-screen py-8'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='text-3xl font-bold text-text'>Mening hisobim</h1>
					<p className='text-text-muted mt-1'>
						Shaxsiy ma'lumotlaringizni boshqaring va buyurtmalaringizni kuzating
					</p>
				</div>

				<div className='grid lg:grid-cols-4 gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<div className='bg-card rounded-2xl shadow-md p-6'>
							{/* Avatar */}
							<div className='flex flex-col items-center mb-6'>
								<div className='relative'>
									<img
										src={userData.avatar || '/placeholder.svg'}
										alt={user?.fullName}
										className='w-24 h-24 rounded-full object-cover border-4 border-primary/20'
									/>
									<button className='absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors shadow-lg'>
										<Camera className='w-4 h-4' />
									</button>
								</div>
								<h2 className='mt-4 text-xl font-semibold text-text'>
									{userData.fullName}
								</h2>
								<p className='text-text-muted text-sm'>{userData.email}</p>
							</div>

							{/* Navigation */}
							<nav className='space-y-2'>
								{menuItems.map(item => {
									const Icon = item.icon
									return (
										<button
											key={item.id}
											onClick={() => setActiveTab(item.id as typeof activeTab)}
											className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
												activeTab === item.id
													? 'bg-primary text-white'
													: 'text-text hover:bg-light'
											}`}
										>
											<Icon className='w-5 h-5' />
											<span className='font-medium'>{item.label}</span>
										</button>
									)
								})}
							</nav>

							{/* Logout Button */}
							<button
								onClick={() => handleLogout()}
								className='w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors'
							>
								<LogOut className='w-5 h-5' />
								<span className='font-medium'>Chiqish</span>
							</button>
						</div>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3'>
						{/* Profile Tab */}
						{activeTab === 'profile' && (
							<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
								<div className='flex items-center justify-between mb-6'>
									<h2 className='text-2xl font-bold text-text'>
										Shaxsiy ma'lumotlar
									</h2>
									{isEditing ? (
										<div className='flex gap-2'>
											<button
												onClick={() => setIsEditing(false)}
												className='flex items-center gap-2 px-4 py-2 text-text-muted hover:text-text border border-border rounded-lg transition-colors'
											>
												<X className='w-4 h-4' />
												Bekor qilish
											</button>
											<button
												onClick={handleSave}
												className='flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'
											>
												<Save className='w-4 h-4' />
												Saqlash
											</button>
										</div>
									) : (
										<button
											onClick={() => setIsEditing(true)}
											className='flex items-center gap-2 px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors'
										>
											<Edit2 className='w-4 h-4' />
											Tahrirlash
										</button>
									)}
								</div>

								<div className='grid md:grid-cols-2 gap-6'>
									<div>
										<label className='block text-sm font-medium text-text mb-2'>
											To'liq ism
										</label>
										{isEditing ? (
											<input
												type='text'
												name='fullName'
												value={userData.fullName}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<User className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{userData.fullName}</span>
											</div>
										)}
									</div>

									<div>
										<label className='block text-sm font-medium text-text mb-2'>
											Email manzil
										</label>
										{isEditing ? (
											<input
												type='email'
												name='email'
												value={userData.email}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<Mail className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{userData.email}</span>
											</div>
										)}
									</div>

									<div>
										<label className='block text-sm font-medium text-text mb-2'>
											Telefon raqam
										</label>
										{isEditing ? (
											<input
												type='tel'
												name='phone'
												value={user?.phone}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<Phone className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{user?.phone}</span>
											</div>
										)}
									</div>

									<div>
										<label className='block text-sm font-medium text-text mb-2'>
											Shahar
										</label>
										{isEditing ? (
											<input
												type='text'
												name='city'
												value={userData.city}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<MapPin className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{userData.city}</span>
											</div>
										)}
									</div>

									<div className='md:col-span-2'>
										<label className='block text-sm font-medium text-text mb-2'>
											Manzil
										</label>
										{isEditing ? (
											<input
												type='text'
												name='address'
												value={userData.address}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<MapPin className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{userData.address}</span>
											</div>
										)}
									</div>
								</div>

								{/* Quick Stats */}
								<div className='grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border'>
									<div className='text-center p-4 bg-light rounded-xl'>
										<Package className='w-6 h-6 text-primary mx-auto mb-2' />
										<div className='text-2xl font-bold text-text'>12</div>
										<div className='text-text-muted text-sm'>Buyurtmalar</div>
									</div>
									<div className='text-center p-4 bg-light rounded-xl'>
										<Heart className='w-6 h-6 text-red-500 mx-auto mb-2' />
										<div className='text-2xl font-bold text-text'>8</div>
										<div className='text-text-muted text-sm'>Sevimlilar</div>
									</div>
									<div className='text-center p-4 bg-light rounded-xl'>
										<CreditCard className='w-6 h-6 text-secondary mx-auto mb-2' />
										<div className='text-2xl font-bold text-text'>2</div>
										<div className='text-text-muted text-sm'>
											To'lov usullari
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Orders Tab */}
						{activeTab === 'orders' && (
							<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
								<div className='flex items-center justify-between mb-6'>
									<h2 className='text-2xl font-bold text-text'>
										Buyurtmalar tarixi
									</h2>
									<Link
										to='/products'
										className='flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all'
									>
										Xarid qilish
										<ShoppingBag className='w-5 h-5' />
									</Link>
								</div>

								<div className='space-y-4'>
									{mockOrders.map(order => (
										<div
											key={order.id}
											className='flex items-center justify-between p-4 bg-light rounded-xl hover:shadow-md transition-shadow cursor-pointer'
										>
											<div className='flex items-center gap-4'>
												<div className='p-3 bg-primary/10 rounded-lg'>
													<Package className='w-6 h-6 text-primary' />
												</div>
												<div>
													<div className='font-semibold text-text'>
														{order.id}
													</div>
													<div className='text-text-muted text-sm'>
														{order.date} • {order.items} ta mahsulot
													</div>
												</div>
											</div>
											<div className='flex items-center gap-4'>
												<div className='text-right'>
													<div className='font-semibold text-text'>
														{formatPrice(order.total)}
													</div>
													<span
														className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
															order.status,
														)}`}
													>
														{order.status}
													</span>
												</div>
												<ChevronRight className='w-5 h-5 text-text-muted' />
											</div>
										</div>
									))}
								</div>

								{mockOrders.length === 0 && (
									<div className='text-center py-12'>
										<History className='w-16 h-16 text-text-muted mx-auto mb-4' />
										<h3 className='text-xl font-semibold text-text mb-2'>
											Buyurtmalar yo'q
										</h3>
										<p className='text-text-muted mb-6'>
											Siz hali hech qanday buyurtma bermadingiz
										</p>
										<Link
											to='/products'
											className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
										>
											<ShoppingBag className='w-5 h-5' />
											Xarid qilishni boshlash
										</Link>
									</div>
								)}
							</div>
						)}

						{/* Favorites Tab */}
						{activeTab === 'favorites' && (
							<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
								<h2 className='text-2xl font-bold text-text mb-6'>
									Sevimli mahsulotlar
								</h2>

								<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
									{[1, 2, 3, 4].map(item => (
										<div
											key={item}
											className='bg-light rounded-xl overflow-hidden hover:shadow-md transition-shadow'
										>
											<div className='relative h-40'>
												<img
													src={`https://images.pexels.com/photos/${
														[1639557, 618775, 616354, 1510684][item - 1]
													}/pexels-photo-${
														[1639557, 618775, 616354, 1510684][item - 1]
													}.jpeg?auto=compress&cs=tinysrgb&w=400`}
													alt='Product'
													className='w-full h-full object-cover'
												/>
												<button className='absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors'>
													<Heart className='w-4 h-4 fill-current' />
												</button>
											</div>
											<div className='p-4'>
												<h3 className='font-semibold text-text mb-1'>
													Premium Beef Steak
												</h3>
												<p className='text-primary font-bold'>
													{formatPrice(89000)}
												</p>
											</div>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Settings Tab */}
						{activeTab === 'settings' && (
							<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
								<h2 className='text-2xl font-bold text-text mb-6'>
									Sozlamalar
								</h2>

								<div className='space-y-6'>
									{/* Notifications */}
									<div className='p-4 bg-light rounded-xl'>
										<div className='flex items-center justify-between'>
											<div>
												<h3 className='font-semibold text-text'>
													Bildirishnomalar
												</h3>
												<p className='text-text-muted text-sm'>
													Buyurtma holati haqida xabar olish
												</p>
											</div>
											<label className='relative inline-flex items-center cursor-pointer'>
												<input
													type='checkbox'
													className='sr-only peer'
													defaultChecked
												/>
												<div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
											</label>
										</div>
									</div>

									{/* Language */}
									<div className='p-4 bg-light rounded-xl'>
										<div className='flex items-center justify-between'>
											<div>
												<h3 className='font-semibold text-text'>Til</h3>
												<p className='text-text-muted text-sm'>
													Interfeys tili
												</p>
											</div>
											<select className='px-4 py-2 bg-card border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary/20'>
												<option value='uz'>O'zbekcha</option>
												<option value='ru'>Русский</option>
												<option value='en'>English</option>
											</select>
										</div>
									</div>

									{/* Password Change */}
									<div className='p-4 bg-light rounded-xl'>
										<div className='flex items-center justify-between'>
											<div>
												<h3 className='font-semibold text-text'>
													Parolni o'zgartirish
												</h3>
												<p className='text-text-muted text-sm'>
													Hisob xavfsizligini ta'minlash
												</p>
											</div>
											<button className='px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors'>
												O'zgartirish
											</button>
										</div>
									</div>

									{/* Delete Account */}
									<div className='p-4 bg-red-50 rounded-xl'>
										<div className='flex items-center justify-between'>
											<div>
												<h3 className='font-semibold text-red-600'>
													Hisobni o'chirish
												</h3>
												<p className='text-red-500 text-sm'>
													Bu amalni qaytarib bo'lmaydi
												</p>
											</div>
											<button className='px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors'>
												O'chirish
											</button>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

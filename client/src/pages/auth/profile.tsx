import { useQuery } from '@tanstack/react-query'
import {
	ChevronRight,
	Edit2,
	Heart,
	History,
	LogOut,
	MapPin,
	Package,
	Phone,
	Save,
	Settings,
	ShoppingBag,
	User,
	UserCheck,
	X,
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {
	ProductGridSkeleton,
	TableSkeleton,
} from '../../components/Loader/Loading'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import { useToggleLike } from '../../hooks/useToggleLike'
import { migrateUserCartToGuest } from '../../lib/cartstorage'
import { formatDate, formatPrice } from '../../lib/helpers'
import { resolveImageUrl } from '../../lib/mediaUrl'
import { fetchUserFavorites, fetchUserOrders } from '../../service/userApi'
import ConfirmModal from '../admin/_components/DeleteProductModel'
import { Dropdown } from '../admin/_components/TableHeaders'

interface UserData {
	fullName: string
	email: string
	phone: string
	address: string
	city: string
	avatar: string
}

export default function Profile() {
	const [isEditing, setIsEditing] = useState(false)
	const { user, logout } = useAuth()
	const { mutateAsync: toggleLikeAsync } = useToggleLike()
	const { isLiked } = useFavorites()
	const [isLogout, setIsLogout] = useState<boolean>(false)

	const [activeTab, setActiveTab] = useState<string>('profile')
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
		{ value: 'profile', label: "Shaxsiy ma'lumotlar", icon: User },
		{ value: 'orders', label: 'Buyurtmalar tarixi', icon: Package },
		{ value: 'favorites', label: 'Sevimlilar', icon: Heart },
		{ value: 'settings', label: 'Sozlamalar', icon: Settings },
	]

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'completed':
				return 'bg-green-100 text-green-700'
			case 'sending':
				return 'bg-blue-100 text-blue-700'
			case 'cancelled':
				return 'bg-red-100 text-red-700'
			default:
				return 'bg-gray-100 text-gray-700'
		}
	}

	function confirmLogout() {
		if (!confirm) return
		setIsLogout(true)
	}

	const handleLogout = () => {
		if (user && isLogout) migrateUserCartToGuest(user?._id)
		logout()
		toast.success('Logout qilindingiz!')
		// window.location.replace('/')
		return
	}

	const { data: ordersData, isLoading } = useQuery({
		queryKey: ['user-orders', user?._id],
		queryFn: async () => fetchUserOrders(),
		enabled: !!user,
	})

	const {
		data: favoritesData,
		isLoading: loadingFavorites,
		refetch: refetchFavorites,
	} = useQuery({
		queryKey: ['user-favorites', user?._id],
		queryFn: async () => fetchUserFavorites(),
		enabled: !!user,
	})

	const handelLikle = async (
		e: React.MouseEvent<HTMLButtonElement>,
		productId: string,
	) => {
		e.preventDefault()
		e.stopPropagation()

		await toggleLikeAsync({
			productId,
			prevLiked: isLiked(productId),
		})

		await refetchFavorites()
	}

	const navigate = useNavigate()

	const orders = ordersData?.orders || []
	const favorites = favoritesData?.products || []

	return (
		<div className='min-h-screen py-8'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1 className='md:text-3xl text-lg font-bold text-text'>
						Mening hisobim
					</h1>
					<p className='text-text-muted mt-1'>
						Shaxsiy ma'lumotlaringizni boshqaring va buyurtmalaringizni kuzating
					</p>
				</div>

				<div className='grid lg:grid-cols-4 grid: gap-8'>
					{/* Sidebar */}
					<div className='lg:col-span-1'>
						<div className='bg-card rounded-2xl shadow-md p-6'>
							{/* Avatar */}
							<div className='flex flex-col items-center mb-6'>
								<div className='relative'>
									<User className='w-24 h-24 rounded-full object-cover border-4 border-text text-text' />
									{/* <button className='absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors shadow-lg'>
										<Camera className='w-4 h-4' />
									</button> */}
								</div>
								<h2 className='mt-2 text-base font-medium text-center text-text'>
									{user?.fullName && user.fullName}
								</h2>
								{/* <p className='text-text-muted text-sm'>{user?.phone}</p> */}
							</div>

							{/* Navigation */}
							<nav className='space-y-2 max-sm:hidden'>
								{menuItems.map(item => {
									const Icon = item.icon
									return (
										<button
											key={item.value}
											onClick={() =>
												setActiveTab(item.value as typeof activeTab)
											}
											className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
												activeTab === item.value
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

							<div className='sm:flex md:hidden'>
								<Dropdown
									options={menuItems}
									selected={activeTab}
									onChange={setActiveTab}
								/>
							</div>

							{/* Logout Button */}
							<button
								onClick={() => confirmLogout()}
								className='w-full flex items-center gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors'
							>
								<LogOut className='w-5 h-5' />
								<span className='font-medium'>Chiqish</span>
							</button>
						</div>
					</div>

					{/* Main Content */}
					<div className='lg:col-span-3 overflow-x-hidden'>
						{/* Profile Tab */}
						{activeTab === 'profile' && (
							<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
								<div className='md:flex items-center justify-between mb-6 space-y-2'>
									<h2 className='md:text-2xl font-bold text-text'>
										Shaxsiy ma'lumotlar
									</h2>
									{isEditing ? (
										<div className='flex gap-2 md:flex'>
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
									<div className='md:col-span-2'>
										<label className='block text-sm font-medium text-text mb-2'>
											To'liq ism
										</label>
										{isEditing ? (
											<input
												type='text'
												name='fullName'
												value={user?.fullName}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<User className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{user?.fullName}</span>
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
											Role
										</label>
										{isEditing ? (
											<input
												type='text'
												name='role'
												value={user?.role}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<UserCheck className='w-5 h-5 text-text-muted' />
												<span className='text-text'>
													{user?.role === 'admin'
														? 'Administrator'
														: 'Foydalanuvchi'}
												</span>
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
												value={user?.address}
												onChange={handleChange}
												className='w-full px-4 py-3 rounded-lg border border-border bg-light text-text focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'
											/>
										) : (
											<div className='flex items-center gap-3 px-4 py-3 bg-light rounded-lg'>
												<MapPin className='w-5 h-5 text-text-muted' />
												<span className='text-text'>{user?.address}</span>
											</div>
										)}
									</div>
								</div>

								{/* Quick Stats */}
								<div className='grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border'>
									<div className='text-center p-4 bg-light rounded-xl'>
										<Package className='w-6 h-6 text-primary mx-auto mb-2' />
										<div className='text-2xl font-bold text-text'>
											{orders?.length || 0}
										</div>
										<div className='text-text-muted text-sm'>Buyurtmalar</div>
									</div>
									<div className='text-center p-4 bg-light rounded-xl'>
										<Heart className='w-6 h-6 text-red-500 mx-auto mb-2' />
										<div className='text-2xl font-bold text-text'>
											{user?.favorites?.length || 0}
										</div>
										<div className='text-text-muted text-sm'>Sevimlilar</div>
									</div>
								</div>
							</div>
						)}

						{/* Orders Tab */}
						<div>
							{isLoading && activeTab === 'orders' && (
								<TableSkeleton rows={5} columns={1} />
							)}
							{!isLoading && activeTab === 'orders' && (
								<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
									<div className='flex items-center justify-between mb-6'>
										<h2 className='md:text-2xl font-bold text-text'>
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

									<div>
										{!isLoading && orders.length <= 0 && (
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

										{orders?.map(order => (
											<div
												key={order._id}
												onClick={() => navigate(`/orders/${order._id}`)}
												className='flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-light rounded-xl hover:border-primary hover:border cursor-pointer mt-1 gap-3 sm:gap-4'
											>
												<div className='flex items-center gap-3 sm:gap-4 w-full sm:w-auto'>
													<div className='p-2 sm:p-3 bg-primary/10 rounded-lg shrink-0'>
														<Package className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
													</div>
													<div className='min-w-0 flex-1'>
														<div className='font-semibold text-text text-sm sm:text-base truncate'>
															{order.items.length > 0
																? order.items.map(item => item.title).join(', ')
																: 'Buyurtma'}
														</div>
														<div className='text-text-muted text-xs sm:text-sm'>
															{formatDate(order.createdAt)} •{' '}
															{order.items.length} ta mahsulot
														</div>
													</div>
												</div>

												<div className='flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto'>
													<div className='text-left sm:text-right'>
														<div className='font-semibold text-text text-sm sm:text-base'>
															{formatPrice(order.totalPrice)}
														</div>
														<span
															className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(
																order.status,
															)}`}
														>
															{order.status}
														</span>
													</div>
													<ChevronRight className='w-5 h-5 text-text-muted shrink-0' />
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Favorites Tab */}
						<div>
							{loadingFavorites && activeTab === 'favorites' && (
								<ProductGridSkeleton />
							)}
							{!loadingFavorites && activeTab === 'favorites' && (
								<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
									<h2 className='md:text-2xl font-bold text-text mb-6'>
										Sevimli mahsulotlar
									</h2>

									{!loadingFavorites && favorites.length <= 0 ? (
										<div className='text-center py-12'>
											<Heart className='w-16 h-16 text-red-500 mx-auto mb-4' />
											<h3 className='md:text-xl font-semibold text-text mb-2'>
												Sevimlilar bo'sh
											</h3>
											<p className='text-text-muted mb-6'>
												Siz hali hech qanday mahsulotni sevimlilarga
												qo'shmadingiz
											</p>
											<Link
												to='/products'
												className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
											>
												<ShoppingBag className='w-5 h-5' />
												Sevimlilarni to'ldirish
											</Link>
										</div>
									) : null}

									<div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'>
										{favorites?.map(item => (
											<div
												key={item._id}
												className='bg-light rounded-xl overflow-hidden shadow-md hover:shadow-lg  cursor-pointer hover:scale-105 transition-all ease'
											>
												<div className='relative h-32 sm:h-40'>
													<img
														src={resolveImageUrl(item.images[0])}
														alt='Product'
														className='w-full h-full object-cover'
													/>
													<button
														onClick={e => handelLikle(e, item._id)}
														className='absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors'
													>
														<Heart className='w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current' />
													</button>
												</div>
												<div className='p-2.5 sm:p-4'>
													<h3 className='font-semibold text-text mb-1 text-xs sm:text-sm line-clamp-2'>
														{item.title}
													</h3>
													<p className='text-primary font-bold text-sm sm:text-base'>
														{formatPrice(item.price)}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Settings Tab */}
						{activeTab === 'settings' && (
							<div className='bg-card rounded-2xl shadow-md p-6 lg:p-8'>
								<h2 className='md:text-2xl font-bold text-text mb-6'>
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
			<ConfirmModal
				header='Akkauntingizdan chiqishni istaysizmi ?'
				descr="Logout qilganingizdan so'ng qayta login qilmay turib mahsulot harid qila olmaysiz."
				confirmButton='Chiqish'
				isOpen={isLogout}
				onClose={() => setIsLogout(false)}
				onConfirm={handleLogout}
			/>
		</div>
	)
}

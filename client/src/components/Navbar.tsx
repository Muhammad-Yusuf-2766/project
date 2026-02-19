import {
	Blocks,
	Home,
	Info,
	LogIn,
	Menu,
	Phone,
	ShoppingCart,
	SlidersHorizontal,
	User,
	X,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const { isLoggedIn, user } = useAuth()
	const userRole = user?.role

	const location = useLocation()
	const currentPath = location.pathname
	const { itemsCount } = useCart()

	return (
		<nav className='shadow-md sticky top-0 z-50 bg-card'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link to='/' className='flex items-center space-x-2'>
						<img
							src='/ansor_logo_180px.png'
							className='w-12 h-12 text-emerald-600'
						/>
						<span className='text-primary text-2xl font-bold'>Market</span>
					</Link>

					<div className='hidden md:flex items-center space-x-8'>
						<Link
							to='/'
							className={`${
								currentPath === '/' ? 'text-primary' : 'text-text'
							} hover:text-primary transition-colors font-medium`}
						>
							Asosiy
						</Link>
						<Link
							to='/products'
							className={`${
								currentPath === '/products' ? 'text-primary' : 'text-text'
							} hover:text-primary transition-colors font-medium`}
						>
							Mahsulotlar
						</Link>
						<Link
							to='/about'
							className={`${
								currentPath === '/about' ? 'text-primary' : 'text-text'
							} hover:text-primary transition-colors font-medium`}
						>
							Biz haqimizda
						</Link>
						<Link
							to='/contact'
							className={`${
								currentPath === '/contact' ? 'text-primary' : 'text-text'
							} hover:text-primary transition-colors font-medium`}
						>
							Aloqa
						</Link>

						{isLoggedIn && userRole === 'admin' && (
							<Link
								to='/admin'
								className={`${
									currentPath === '/admin' ? 'text-primary' : 'text-text'
								} hover:text-primary transition-colors font-medium`}
							>
								Admin Panel
							</Link>
						)}
					</div>

					<div className='hidden md:flex items-center space-x-6'>
						<Link
							to={'/cart'}
							className='flex items-center space-x-2 px-4 py-2 bg-card text-primary rounded-lg hover:bg-light transition-colors relative border'
						>
							<ShoppingCart className='w-4 h-4' />
							<div className='w-6 h-6 flex items-center justify-center rounded-full p-1 bg-primary text-white absolute -top-2 -right-4 border-2 border-card'>
								<span>{itemsCount}</span>
							</div>
							<span>Savat</span>
						</Link>
						{isLoggedIn ? (
							<Link
								to={'/profile'}
								className='flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'
							>
								<User className='w-4 h-4' />
								<span>Mening sahifam</span>
							</Link>
						) : (
							<Link
								to={'/login'}
								className='flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'
							>
								<LogIn className='w-4 h-4' />
								<span>Login</span>
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex space-x-5'>
						<Link
							to={'/cart'}
							className='flex items-center space-x-2 px-4 py-2 bg-card text-primary rounded-lg hover:bg-light transition-colors relative border'
						>
							<ShoppingCart className='w-4 h-4' />
							<div className='w-6 h-6 flex items-center justify-center rounded-full p-1 bg-primary text-white absolute -top-2 -right-4 border-2 border-card'>
								<span>{itemsCount}</span>
							</div>
							<span>Savat</span>
						</Link>
						<button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							{mobileMenuOpen ? (
								<X className='w-6 h-6 text-gray-700' />
							) : (
								<Menu className='w-6 h-6 text-gray-700' />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu — absolute overlay, does not push page content down */}
			<div
				className='md:hidden absolute left-0 right-0 bg-card shadow-md overflow-hidden transition-all duration-300 ease-in-out rounded-b-2xl'
				style={{
					maxHeight: mobileMenuOpen ? '400px' : '0px',
					opacity: mobileMenuOpen ? 1 : 0,
				}}
			>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3'>
					<Link
						to='/'
						onClick={() => setMobileMenuOpen(false)}
						className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
					>
						<Home className='w-5 h-5' />
						Asosiy
					</Link>
					<Link
						to='/products'
						onClick={() => setMobileMenuOpen(false)}
						className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
					>
						<Blocks className='w-5 h-5' />
						Mahsulotlar
					</Link>
					<Link
						to='/about'
						onClick={() => setMobileMenuOpen(false)}
						className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
					>
						<Info className='w-5 h-5' />
						Biz haqimizda
					</Link>
					<Link
						to='/contact'
						onClick={() => setMobileMenuOpen(false)}
						className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
					>
						<Phone className='w-5 h-5' />
						Aloqa
					</Link>
					{isLoggedIn && userRole === 'admin' && (
						<Link
							to='/admin'
							onClick={() => setMobileMenuOpen(false)}
							className='flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
						>
							<SlidersHorizontal />
							Admin Panel
						</Link>
					)}

					{isLoggedIn ? (
						<Link
							to={'/profile'}
							onClick={() => setMobileMenuOpen(false)}
							className='flex gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
						>
							<User className='w-5 h-5' />
							<span>Mening sahifam</span>
						</Link>
					) : (
						<Link
							to={'/login'}
							onClick={() => setMobileMenuOpen(false)}
							className='flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-400'
						>
							<LogIn className='w-5 h-5' />
							<span>Login</span>
						</Link>
					)}
				</div>
			</div>
		</nav>
	)
}

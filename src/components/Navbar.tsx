import { LogIn, Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
	isLoggedIn: boolean
	userRole?: 'admin' | 'seller'
}

export default function Navbar({ isLoggedIn, userRole }: NavbarProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const location = useLocation()
	const currentPath = location.pathname

	return (
		<nav className='shadow-md sticky top-0 z-50 bg-card'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link to='/' className='flex items-center space-x-2'>
						<img
							src='/public/ansor_logo_180px.png'
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

						{isLoggedIn && userRole === 'seller' && (
							<Link
								to='/dashboard'
								className={`${
									currentPath === '/dashboard' ? 'text-primary' : 'text-text'
								} hover:text-primary transition-colors font-medium`}
							>
								Dashboard
							</Link>
						)}
					</div>

					<div className='hidden md:flex items-center space-x-4'>
						{isLoggedIn ? (
							<button className='flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors'>
								<User className='w-4 h-4' />
								<span>Profile</span>
							</button>
						) : (
							<button className='flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
								<LogIn className='w-4 h-4' />
								<span>Sign In</span>
							</button>
						)}
					</div>

					<button
						className='md:hidden'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<X className='w-6 h-6 text-gray-700' />
						) : (
							<Menu className='w-6 h-6 text-gray-700' />
						)}
					</button>
				</div>

				{mobileMenuOpen && (
					<div className='md:hidden py-4 space-y-3'>
						<Link
							to='/'
							onClick={() => setMobileMenuOpen(false)}
							className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors'
						>
							Home
						</Link>
						<Link
							to='/products'
							onClick={() => setMobileMenuOpen(false)}
							className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors'
						>
							Products
						</Link>
						{isLoggedIn && userRole === 'admin' && (
							<Link
								to='/admin'
								onClick={() => setMobileMenuOpen(false)}
								className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors'
							>
								Admin Panel
							</Link>
						)}
						{isLoggedIn && userRole === 'seller' && (
							<Link
								to='/dashboard'
								onClick={() => setMobileMenuOpen(false)}
								className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors'
							>
								Dashboard
							</Link>
						)}
						<button className='w-full text-left px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
							{isLoggedIn ? 'Profile' : 'Sign In'}
						</button>
					</div>
				)}
			</div>
		</nav>
	)
}

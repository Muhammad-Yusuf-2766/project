import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/auth/login'
import Profile from './pages/auth/profile'
import Register from './pages/auth/register'
import Cart from './pages/cart/index'
import Home from './pages/home'
import Products from './pages/products/Products'
import SellerDashboard from './pages/SellerDashboard'

function App() {
	const [isLoggedIn] = useState(true)
	const [userRole] = useState<'admin' | 'seller'>('admin')

	return (
		<BrowserRouter>
			<div className='min-h-screen bg-background flex flex-col'>
				<Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
				<main className='flex-1'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/products' element={<Products />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/admin' element={<AdminDashboard />} />
						<Route path='/dashboard' element={<SellerDashboard />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App

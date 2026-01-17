import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import Products from './pages/Products'
import SellerDashboard from './pages/SellerDashboard'

function App() {
	const [isLoggedIn] = useState(true)
	const [userRole] = useState<'admin' | 'seller'>('seller')

	return (
		<BrowserRouter>
			<div className='min-h-screen bg-gray-50 flex flex-col'>
				<Navbar isLoggedIn={isLoggedIn} userRole={userRole} />
				<main className='flex-1'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/products' element={<Products />} />
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

import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollTotop'

import RequireAuth from './routes/requireAuth'
import RequireRole from './routes/requireRole'

import { PageLoading } from './components/Loader/Loading' // sizning loader component

// ✅ Lazy pages
const Home = lazy(() => import('./pages/home'))
const Login = lazy(() => import('./pages/auth/login'))
const Register = lazy(() => import('./pages/auth/register'))
const Profile = lazy(() => import('./pages/auth/profile'))
const NotAuthorized = lazy(() => import('./pages/auth/notAuthorized'))

const Products = lazy(() => import('./pages/products/Products'))
const ProductDetail = lazy(() => import('./pages/products/ProductDetail'))

const Cart = lazy(() => import('./pages/cart/index'))

const About = lazy(() => import('./pages/about'))
const Contact = lazy(() => import('./pages/about/Contuct'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

const NotFound = lazy(() => import('./pages/NotFoundPage'))

// (ixtiyoriy) Loader demo page ham lazy
const UsageExample = lazy(() => import('./components/Loader/UsageExample'))

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />

			<div className='min-h-screen bg-background flex flex-col'>
				<Navbar />

				<main className='flex-1'>
					<Suspense fallback={<PageLoading text='Yuklanmoqda...' />}>
						<Routes>
							<Route path='/' element={<Home />} />

							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />

							<Route path='/products' element={<Products />} />
							<Route path='/products/:id' element={<ProductDetail />} />

							<Route path='/cart' element={<Cart />} />

							<Route path='/about' element={<About />} />
							<Route path='/contact' element={<Contact />} />

							<Route path='/not-authorized' element={<NotAuthorized />} />
							<Route path='/loader' element={<UsageExample />} />

							{/* Login kerak bo‘ladigan sahifalar */}
							<Route element={<RequireAuth />}>
								<Route path='/profile' element={<Profile />} />
							</Route>

							{/* Admin only */}
							<Route element={<RequireRole allowed={['admin']} />}>
								<Route path='/admin' element={<AdminDashboard />} />
							</Route>

							{/* 404 */}
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>

				<Footer />
			</div>
		</BrowserRouter>
	)
}

export default App

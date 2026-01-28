/* eslint-disable @typescript-eslint/no-explicit-any */
import { FolderPlus, Package, Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Loading from '../../../components/Loader/Loading'
import {
	createCategory,
	createProduct,
	TCreateCategory,
} from '../../../service/adminApi'
import { ProductFormData } from '../../../types'

export interface ICategory {
	title: string
	slug: string
	description: string
	image: string
}

interface AddProductFormProps {
	categories: ICategory[]
}

type ActiveTab = 'product' | 'category'

export default function AddProductForm({ categories }: AddProductFormProps) {
	const [activeTab, setActiveTab] = useState<ActiveTab>('product')
	const [categoryForm, setCategoryForm] = useState<TCreateCategory>({
		title: '',
		slug: '',
		image: '',
		description: '',
	})
	const [productForm, setProductForm] = useState<ProductFormData>({
		title: '',
		category: '',
		price: 0,
		unit: 'kg',
		stock: 0,
		image: '',
		description: '',
	})
	const [isLoading, setIsloading] = useState<boolean>(false)

	const handleCategorySubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(true)
		try {
			await createCategory(categoryForm)
			toast.success('Kategoriya yaratildi')
			setIsloading(false)
			setCategoryForm({ title: '', slug: '', description: '', image: '' })
		} catch (err: any) {
			setIsloading(false)

			toast.error(err?.response?.data?.message ?? 'Xatolik')
		}
	}

	const handleProdutSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(true)
		try {
			await createProduct(productForm)
			toast.success('Mahsulot muvaffaqiyatli yaratildi!')
			setIsloading(false)
			setProductForm({
				title: '',
				price: 0,
				unit: '',
				category: '',
				stock: 0,
				description: '',
				image: '',
			})
		} catch (err: any) {
			setIsloading(false)
			toast.error(err?.response?.data?.message ?? 'Xatolik')
		}
	}

	const onCancel = () => {
		setProductForm({
			title: '',
			category: '',
			price: 0,
			unit: 'kg',
			stock: 0,
			image: '',
			description: '',
		})
	}

	const handleSlugChange = (title: string) => {
		const slug = title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '')
		setCategoryForm(prev => ({ ...prev, title, slug }))
	}

	const handleProductChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target

		// number inputlar uchun
		if (name === 'price' || name === 'stock') {
			const num = value === '' ? 0 : Number(value)
			setProductForm(prev => ({ ...prev, [name]: Number.isNaN(num) ? 0 : num }))
			return
		}

		setProductForm(prev => ({ ...prev, [name]: value }))
	}

	return (
		<div className='bg-card rounded-xl shadow-lg overflow-hidden'>
			{/* Tabs */}
			<div className='flex border-b border-border'>
				<button
					onClick={() => setActiveTab('product')}
					className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-colors ${
						activeTab === 'product'
							? 'bg-primary text-white'
							: 'bg-light text-text hover:bg-border'
					}`}
				>
					<Package className='w-4 h-4 sm:w-5 sm:h-5' />
					Mahsulot qo'shish
				</button>
				<button
					onClick={() => setActiveTab('category')}
					className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-colors ${
						activeTab === 'category'
							? 'bg-primary text-white'
							: 'bg-light text-text hover:bg-border'
					}`}
				>
					<FolderPlus className='w-4 h-4 sm:w-5 sm:h-5' />
					Kategoriya yaratish
				</button>
			</div>

			<div className='p-4 sm:p-6 md:p-8'>
				{/* Add Product Form */}
				{activeTab === 'product' && (
					<>
						<h2 className='text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6'>
							Yangi mahsulot qo'shish
						</h2>
						<form
							onSubmit={handleProdutSubmit}
							className='space-y-4 sm:space-y-6'
						>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Mahsulot nomi
									</label>
									<input
										type='text'
										name='title'
										value={productForm.title}
										onChange={e => handleProductChange(e)}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder='Mahsulot nomini kiriting'
										required
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Kategoriya
									</label>
									<select
										name='category'
										value={productForm.category}
										onChange={handleProductChange}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
									>
										<option value=''>Kategoriyani tanlang</option>
										{categories &&
											categories.map(cat => (
												<option key={cat.title} value={cat.slug}>
													{cat.title}
												</option>
											))}
									</select>
								</div>

								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Narxi
									</label>
									<input
										type='number'
										name='price'
										step='0.01'
										value={productForm.price}
										onChange={handleProductChange}
										required
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder="Narxni kiriting (so'm)"
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										O'lchov birligi
									</label>
									<select
										name='unit'
										value={productForm.unit}
										onChange={handleProductChange}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
									>
										<option value='kg'>Kilogram (kg)</option>
										<option value='dona'>Dona</option>
										<option value='litr'>Litr</option>
										<option value='pachka'>Pachka</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Ombordagi soni
									</label>
									<input
										type='number'
										name='stock'
										value={productForm.stock}
										onChange={handleProductChange}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder='Mavjud sonini kiriting'
										required
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Mahsulot rasmi (URL)
									</label>
									<input
										type='url'
										name='image'
										value={productForm.image}
										onChange={handleProductChange}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder='https://example.com/image.jpg'
										required
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-semibold text-text mb-2'>
									Tavsif
								</label>
								<textarea
									name='description'
									value={productForm.description}
									onChange={handleProductChange}
									rows={4}
									className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none resize-none text-sm sm:text-base'
									placeholder='Mahsulot haqida qisqacha tavsif...'
									required
								/>
							</div>

							<div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
								<button
									type='submit'
									disabled={isLoading}
									className='px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 text-sm sm:text-base'
								>
									{isLoading ? (
										<Loading size='md' />
									) : (
										<Plus className='w-4 h-4 sm:w-5 sm:h-5' />
									)}
									Qo'shish
								</button>
								<button
									type='button'
									onClick={onCancel}
									className='px-6 sm:px-8 py-2.5 sm:py-3 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors text-sm sm:text-base'
								>
									Bekor qilish
								</button>
							</div>
						</form>
					</>
				)}

				{/* Create Category Form */}
				{activeTab === 'category' && (
					<>
						<h2 className='text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6'>
							Yangi kategoriya yaratish
						</h2>

						{/* <div className='mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg'>
							<p className='text-green-700 text-sm sm:text-base'>
								Kategoriya muvaffaqiyatli yaratildi!
							</p>
						</div> */}

						<form
							onSubmit={handleCategorySubmit}
							className='space-y-4 sm:space-y-6'
						>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Kategoriya nomi
									</label>
									<input
										type='text'
										value={categoryForm.title}
										onChange={e => handleSlugChange(e.target.value)}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder='Masalan: Go`sht mahsulotlari'
										required
									/>
								</div>

								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Slug (URL uchun)
									</label>
									<input
										type='text'
										value={categoryForm.slug}
										onChange={e =>
											setCategoryForm(prev => ({
												...prev,
												slug: e.target.value,
											}))
										}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-light text-text-muted focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder='avtomatik-yaratiladi'
										required
									/>
									<p className='mt-1 text-xs text-text-muted'>
										Avtomatik yaratiladi yoki o'zingiz kiritishingiz mumkin
									</p>
								</div>

								<div className='md:col-span-2'>
									<label className='block text-sm font-semibold text-text mb-2'>
										Kategoriya rasmi (URL)
									</label>
									<input
										type='url'
										value={categoryForm.image}
										onChange={e =>
											setCategoryForm(prev => ({
												...prev,
												image: e.target.value,
											}))
										}
										className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
										placeholder='https://example.com/category-image.jpg'
										required
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-semibold text-text mb-2'>
									Tavsif
								</label>
								<textarea
									value={categoryForm.description}
									onChange={e =>
										setCategoryForm(prev => ({
											...prev,
											description: e.target.value,
										}))
									}
									rows={3}
									className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none resize-none text-sm sm:text-base'
									placeholder='Kategoriya haqida qisqacha tavsif...'
								/>
							</div>

							{/* Image Preview */}
							{categoryForm.image && (
								<div>
									<label className='block text-sm font-semibold text-text mb-2'>
										Rasm ko'rinishi
									</label>
									<div className='w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-border'>
										<img
											src={categoryForm.image || '/placeholder.svg'}
											alt='Kategoriya rasmi'
											className='w-full h-full object-cover'
											onError={e => {
												;(e.target as HTMLImageElement).src = '/placeholder.svg'
											}}
										/>
									</div>
								</div>
							)}

							<div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
								<button
									type='submit'
									disabled={isLoading}
									className='px-6 sm:px-8 py-2.5 sm:py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 text-sm sm:text-base'
								>
									{isLoading ? (
										<Loading size='md' />
									) : (
										<FolderPlus className='w-4 h-4 sm:w-5 sm:h-5' />
									)}
									Kategoriya yaratish
								</button>
								<button
									type='button'
									onClick={() =>
										setCategoryForm({
											title: '',
											slug: '',
											description: '',
											image: '',
										})
									}
									className='px-6 sm:px-8 py-2.5 sm:py-3 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors text-sm sm:text-base'
								>
									Tozalash
								</button>
							</div>
						</form>

						{/* Existing Categories */}
						{categories.length > 0 && (
							<div className='mt-8 pt-6 border-t border-border'>
								<h3 className='text-lg font-semibold text-text mb-4'>
									Mavjud kategoriyalar
								</h3>
								<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4'>
									{categories.map(cat => (
										<div
											key={cat.title}
											className='bg-light rounded-lg p-3 sm:p-4 text-center'
										>
											{cat.image && (
												<img
													src={cat.image || '/placeholder.svg'}
													alt={cat.title}
													className='w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover mx-auto mb-2'
												/>
											)}
											<p className='font-medium text-text text-sm'>
												{cat.title}
											</p>
											<p className='text-text-muted text-xs'>{cat.slug}</p>
										</div>
									))}
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

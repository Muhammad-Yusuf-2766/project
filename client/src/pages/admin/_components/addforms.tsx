/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FolderPlus, Plus, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Loading from '../../../components/Loader/Loading'
import { productMeasures } from '../../../constants'
import {
	createCategory,
	createProduct,
	TCreateCategory,
} from '../../../service/adminApi'
import { CategoryType, ProductFormData } from '../../../types'

type Props = {
	categories: CategoryType[]
}
const MAX_IMAGES = 4
export const ProductForm = ({ categories }: Props) => {
	const [isLoading, setIsloading] = useState<boolean>(false)
	const [productImageFiles, setProductImageFiles] = useState<File[]>([])
	const [productImagePreviews, setProductImagePreviews] = useState<string[]>([])
	const [productForm, setProductForm] = useState<ProductFormData>({
		title: '',
		category: '',
		price: undefined,
		originalPrice: undefined,
		unit: 'kg',
		stock: undefined,
		images: [],
		description: '',
	})

	const handleProductChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>,
	) => {
		const { name, value } = e.target

		if (name === 'price' || name === 'stock' || name === 'originalPrice') {
			const num = value === '' ? undefined : Number(value)
			if (name === 'originalPrice') {
				setProductForm(prev => ({ ...prev, [name]: num }))
			} else {
				setProductForm(prev => ({
					...prev,
					[name]: Number.isNaN(num) ? 0 : (num ?? 0),
				}))
			}
			return
		}

		setProductForm(prev => ({ ...prev, [name]: value }))
	}

	const handleProductImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = e.target.files
		if (!files || files.length === 0) return

		const remainingSlots = MAX_IMAGES - productImageFiles.length
		if (remainingSlots <= 0) {
			toast.error(`Maksimum ${MAX_IMAGES} ta rasm yuklash mumkin`)
			return
		}

		const filesToAdd = Array.from(files).slice(0, remainingSlots)
		const validFiles: File[] = []
		const validPreviews: string[] = []

		for (const file of filesToAdd) {
			if (!file.type.startsWith('image/')) {
				toast.error(`"${file.name}" - faqat rasm fayllarini yuklash mumkin`)
				continue
			}

			if (file.size > 5 * 1024 * 1024) {
				toast.error(`"${file.name}" - rasm hajmi 5MB dan oshmasligi kerak`)
				continue
			}

			validFiles.push(file)

			const preview = await new Promise<string>(resolve => {
				const reader = new FileReader()
				reader.onloadend = () => resolve(reader.result as string)
				reader.readAsDataURL(file)
			})
			validPreviews.push(preview)
		}

		if (validFiles.length > 0) {
			setProductImageFiles(prev => [...prev, ...validFiles])
			setProductImagePreviews(prev => [...prev, ...validPreviews])
		}

		// Reset input value to allow selecting same file again
		e.target.value = ''
	}

	const removeProductImage = (index: number) => {
		setProductImageFiles(prev => prev.filter((_, i) => i !== index))
		setProductImagePreviews(prev => prev.filter((_, i) => i !== index))
	}

	const onCancel = () => {
		setProductForm({
			title: '',
			category: '',
			price: undefined,
			originalPrice: undefined,
			unit: 'kg',
			stock: undefined,
			images: [],
			description: '',
		})
		setProductImageFiles([])
		setProductImagePreviews([])
	}

	const queryClient = useQueryClient()

	const submitMutation = useMutation({
		mutationFn: ({ formData }: { formData: FormData }) =>
			createProduct(formData),

		onSuccess: async res => {
			toast.success("Mahsulot muvaffaqiyatli qo'shildi")

			if (res.status === 201) {
				await queryClient.refetchQueries({
					queryKey: ['products'],
					type: 'all',
					// sizdagi real products queryKey bilan mos bo‘lsin
					// sizdagi GET products function
				})
			}
		},
	})

	const handleProdutSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsloading(true)

		try {
			const formData = new FormData()

			// text/number fieldlar
			formData.append('title', productForm.title)
			formData.append('category', productForm.category)
			formData.append('price', String(productForm.price))
			formData.append('stock', String(productForm.stock))
			formData.append('unit', productForm.unit)
			formData.append('description', productForm.description)

			// optional fieldlar
			if (
				productForm.originalPrice !== undefined &&
				productForm.originalPrice !== null
			) {
				formData.append('originalPrice', String(productForm.originalPrice))
			}

			// ❗️Agar sen hali productForm ichida "image" degan bitta field ishlatsang,
			// uni endi olib tashla yoki backendda ishlatma.
			// formData.append("image", productForm.image) // kerak emas

			// images (max 4) — multer array("images",4) bilan MOS
			productImageFiles.slice(0, 4).forEach(file => {
				formData.append('images', file) // ✅ MUHIM: "images" bir xil key
			})

			// API call (axios yoki fetch)
			await submitMutation.mutateAsync({ formData })

			setIsloading(false)
			setProductForm({
				title: '',
				category: '',
				price: undefined,
				originalPrice: undefined,
				unit: 'kg',
				stock: undefined,
				images: [], // xohlasang butunlay olib tashla
				description: '',
			})

			setProductImageFiles([])
			setProductImagePreviews([])
		} catch (err: any) {
			setIsloading(false)
			toast.error(err?.response?.data?.message ?? 'Xatolik')
		}
	}

	const productImageInputRef = useRef<HTMLInputElement>(null)

	return (
		<div>
			<h2 className='text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6'>
				Yangi mahsulot qo'shish
			</h2>
			<form onSubmit={handleProdutSubmit} className='space-y-4 sm:space-y-6'>
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
							placeholder='Narxni kiriting (won)'
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
							{productMeasures.map(measure => (
								<option key={measure.value} value={measure.value}>
									{measure.label}
								</option>
							))}
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
							Chegirmadan oldingi narx (ixtiyoriy)
						</label>
						<input
							type='number'
							name='originalPrice'
							step='0.01'
							value={productForm.originalPrice ?? ''}
							onChange={handleProductChange}
							className='w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none text-sm sm:text-base'
							placeholder='Eski narxni kiriting (won)'
						/>
						<p className='mt-1 text-xs text-text-muted'>
							Chegirma ko'rsatish uchun eski narxni kiriting
						</p>
					</div>
				</div>

				{/* Product Images Upload - Max 4 */}
				<div>
					<label className='block text-sm font-semibold text-text mb-2'>
						Mahsulot rasmlari (maksimum {MAX_IMAGES} ta)
					</label>
					<input
						ref={productImageInputRef}
						type='file'
						accept='image/*'
						multiple
						onChange={handleProductImageChange}
						className='hidden'
					/>

					<div className='flex flex-wrap gap-4'>
						{/* Image Previews */}
						{productImagePreviews.map((preview, index) => (
							<div key={index} className='relative'>
								<div className='w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-border'>
									<img
										src={preview || '/placeholder.svg'}
										alt={`Mahsulot rasmi ${index + 1}`}
										className='w-full h-full object-cover'
									/>
								</div>
								<button
									type='button'
									onClick={() => removeProductImage(index)}
									className='absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
								>
									<X className='w-4 h-4' />
								</button>
								{index === 0 && (
									<span className='absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-xs font-medium rounded'>
										Asosiy
									</span>
								)}
							</div>
						))}

						{/* Add Image Button */}
						{productImageFiles.length < MAX_IMAGES && (
							<button
								type='button'
								onClick={() => productImageInputRef.current?.click()}
								className='w-28 h-28 sm:w-36 sm:h-36 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl bg-light hover:bg-border/50 hover:border-primary/50 transition-colors'
							>
								<div className='p-2 bg-primary/10 rounded-full'>
									<Upload className='w-5 h-5 text-primary' />
								</div>
								<div className='text-center'>
									<p className='font-medium text-text text-xs'>Rasm qo'shish</p>
									<p className='text-xs text-text-muted'>
										{productImageFiles.length}/{MAX_IMAGES}
									</p>
								</div>
							</button>
						)}
					</div>

					<p className='mt-2 text-xs text-text-muted'>
						PNG, JPG (har biri max 5MB). Birinchi rasm asosiy rasm sifatida
						ko'rsatiladi.
					</p>
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
						className='px-6 sm:px-8 py-2.5 sm:py-3 cursor-pointer bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 text-sm sm:text-base'
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
						disabled={isLoading}
						onClick={onCancel}
						className='px-6 sm:px-8 py-2.5 sm:py-3 cursor-pointer bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors text-sm sm:text-base'
					>
						Bekor qilish
					</button>
				</div>
			</form>
		</div>
	)
}

export const CategoryForm = ({ categories }: Props) => {
	const [categoryForm, setCategoryForm] = useState<TCreateCategory>({
		title: '',
		slug: '',
		image: '',
		description: '',
	})
	const [isLoading, setIsloading] = useState<boolean>(false)

	const handleSlugChange = (title: string) => {
		const slug = title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '')
		setCategoryForm(prev => ({ ...prev, title, slug }))
	}

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
			// setUploadingImage(false)
			toast.error(err?.response?.data?.message ?? 'Xatolik')
		}
	}

	return (
		<div>
			<h2 className='text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6'>
				Yangi kategoriya yaratish
			</h2>

			<form onSubmit={handleCategorySubmit} className='space-y-4 sm:space-y-6'>
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
				</div>

				{/* Category Image Upload */}

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
								<p className='font-medium text-text text-sm'>{cat.title}</p>
								<p className='text-text-muted text-xs'>{cat.slug}</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

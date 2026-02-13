import { Upload, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Loading from '../../../components/Loader/Loading'
import { productMeasures } from '../../../constants'
import { resolveImageUrl } from '../../../lib/mediaUrl'
import { api } from '../../../service/axiosinctance'
import { CategoryType, Product } from '../../../types'

interface EditProductModalProps {
	isOpen: boolean
	product: Product | null
	onClose: () => void
	categories: CategoryType[]
}

const MAX_IMAGES = 4

export default function EditProductModal({
	isOpen,
	product,
	categories,
	onClose,
}: EditProductModalProps) {
	const [formData, setFormData] = useState<Product | null>(null)
	const [deletingImages, setDeletingImages] = useState<string[]>([])
	const [newImageFiles, setNewImageFiles] = useState<File[]>([])
	const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
	const imageInputRef = useRef<HTMLInputElement>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (product) {
			setFormData({ ...product })
			setDeletingImages([])
			setNewImageFiles([])
			setNewImagePreviews([])
		}
	}, [product])

	if (!isOpen || !formData) return null

	const removeExistingImage = (imageName: string) => {
		setFormData(prev => {
			if (!prev) return null
			return {
				...prev,
				images: prev.images?.filter(img => img !== imageName),
			}
		})
		setDeletingImages(prev => [...prev, imageName])
	}

	const removeNewImage = (index: number) => {
		setNewImageFiles(prev => prev.filter((_, i) => i !== index))
		setNewImagePreviews(prev => prev.filter((_, i) => i !== index))
	}

	const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files || files.length === 0) return

		const currentImagesCount =
			(formData?.images?.length || 0) + newImageFiles.length
		const remainingSlots = MAX_IMAGES - currentImagesCount

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
			setNewImageFiles(prev => [...prev, ...validFiles])
			setNewImagePreviews(prev => [...prev, ...validPreviews])
		}

		e.target.value = ''
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		const submitData = new FormData()

		// Append all form fields
		submitData.append('_id', formData._id)
		submitData.append('title', formData.title)
		submitData.append('description', formData.description)
		submitData.append('price', String(formData.price))
		submitData.append('category', formData.category)
		submitData.append('unit', formData.unit)
		submitData.append('stock', String(formData.stock))

		if (
			formData.originalPrice !== null &&
			formData.originalPrice !== undefined
		) {
			submitData.append('originalPrice', String(formData.originalPrice))
		}

		// Append existing images that weren't deleted
		if (formData.images && formData.images.length > 0) {
			submitData.append('images', JSON.stringify(formData.images))
		}

		// Append images to delete
		if (deletingImages.length > 0) {
			submitData.append('deletingImages', JSON.stringify(deletingImages))
		}

		// Append new image files
		for (const file of newImageFiles) {
			submitData.append('images', file)
		}

		await api.put(`/api/admin/update-product/${formData._id}`, submitData)
		setIsLoading(false)
		toast.success('Mahsulot muvaffaqiyatli yangilandi')

		onClose()
	}

	const totalImagesCount =
		(formData?.images?.length || 0) + newImageFiles.length

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
			<div className='bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-border sticky top-0 z-50 bg-card'>
					<h3 className='text-xl font-bold text-text'>Mahsulotni tahrirlash</h3>
					<button
						onClick={onClose}
						className='text-text-muted hover:text-text transition-colors'
					>
						<X className='w-6 h-6' />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className='p-6 space-y-5'>
					{/* Product Images Section */}
					<div>
						<label className='block text-sm font-semibold text-text mb-2'>
							Mahsulot rasmlari ({totalImagesCount}/{MAX_IMAGES})
						</label>
						<input
							ref={imageInputRef}
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageChange}
							className='hidden'
						/>

						<div className='flex flex-wrap justify-between gap-2'>
							{/* Existing Images */}
							{formData.images?.map((image, index) => (
								<div key={`existing-${index}`} className='relative'>
									<div className='w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-border'>
										<img
											src={resolveImageUrl(image) || '/placeholder.svg'}
											alt={`${formData.title} - ${index + 1}`}
											className='w-full h-full object-cover'
										/>
									</div>
									<button
										type='button'
										onClick={() => removeExistingImage(image)}
										className='absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md'
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

							{/* New Image Previews */}
							{newImagePreviews.map((preview, index) => (
								<div key={`new-${index}`} className='relative'>
									<div className='w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-primary border-dashed'>
										<img
											src={preview || '/placeholder.svg'}
											alt={`Yangi rasm ${index + 1}`}
											className='w-full h-full object-cover'
										/>
									</div>
									<button
										type='button'
										onClick={() => removeNewImage(index)}
										className='absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md'
									>
										<X className='w-4 h-4' />
									</button>
									<span className='absolute bottom-2 left-2 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded'>
										Yangi
									</span>
								</div>
							))}

							{/* Add Image Button - only show if less than MAX_IMAGES */}
							{totalImagesCount < MAX_IMAGES && (
								<button
									type='button'
									onClick={() => imageInputRef.current?.click()}
									className='w-28 h-28 sm:w-32 sm:h-32 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl bg-light hover:bg-border/50 hover:border-primary/50 transition-colors'
								>
									<div className='p-2 bg-primary/10 rounded-full'>
										<Upload className='w-5 h-5 text-primary' />
									</div>
									<div className='text-center'>
										<p className='font-medium text-text text-xs'>
											Rasm qo'shish
										</p>
										<p className='text-xs text-text-muted'>
											{totalImagesCount}/{MAX_IMAGES}
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

					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						<div>
							<label className='block text-sm font-semibold text-text mb-2'>
								Mahsulot nomi
							</label>
							<input
								type='text'
								value={formData.title}
								onChange={e =>
									setFormData({ ...formData, title: e.target.value })
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-text mb-2'>
								Mahsulot turi
							</label>
							<select
								value={formData.category}
								onChange={e =>
									setFormData({
										...formData,
										category: e.target.value,
									})
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
							>
								{categories.map(category => (
									<option key={category._id} value={category.slug}>
										{category.title}
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
								value={formData.price}
								onChange={e =>
									setFormData({
										...formData,
										price: e.currentTarget.valueAsNumber, // returns default string value as number
									})
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-text mb-2'>
								O'lchov birligi
							</label>
							<select
								value={formData.unit}
								onChange={e =>
									setFormData({ ...formData, unit: e.target.value })
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
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
								Soni
							</label>
							<input
								type='number'
								value={formData.stock}
								onChange={e =>
									setFormData({
										...formData,
										stock: e.currentTarget.valueAsNumber,
									})
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
								required
							/>
						</div>

						<div>
							<label className='block text-sm font-semibold text-text mb-2'>
								Eski narxi (chegirma uchun)
							</label>
							<input
								type='number'
								value={formData.originalPrice ?? ''}
								onChange={e => {
									const value = e.target.value
									setFormData({
										...formData,
										originalPrice: value === '' ? undefined : Number(value),
									})
								}}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
								placeholder='Chegirma bo`lsa eski narxni kiriting'
							/>
						</div>
					</div>

					<div>
						<label className='block text-sm font-semibold text-text mb-2'>
							Tasnifi
						</label>
						<textarea
							value={formData.description}
							onChange={e =>
								setFormData({ ...formData, description: e.target.value })
							}
							rows={4}
							className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
							required
						/>
					</div>

					{/* Actions */}
					<div className='flex gap-3 pt-4'>
						<button
							type='submit'
							disabled={isLoading}
							className='flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
						>
							{isLoading ? (
								<Loading className='text-light' text='Saqlanmoqda...' />
							) : (
								'Saqlash'
							)}
						</button>
						<button
							type='button'
							onClick={onClose}
							className='flex-1 px-6 py-3 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors'
						>
							Bekor qilish
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

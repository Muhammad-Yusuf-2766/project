import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CategoryType, Product } from '../../../types'

interface EditProductModalProps {
	isOpen: boolean
	product: Product | null
	onClose: () => void
	onSave: (product: Product) => void
}

export default function EditProductModal({
	isOpen,
	product,
	onClose,
	onSave,
}: EditProductModalProps) {
	const [formData, setFormData] = useState<Product | null>(null)

	useEffect(() => {
		if (product) {
			setFormData({ ...product })
		}
	}, [product])

	if (!isOpen || !formData) return null

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave(formData)
		onClose()
	}

	return (
		<div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
			<div className='bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
				{/* Header */}
				<div className='flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card'>
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
					{/* Product Image Preview */}
					{formData.image && (
						<div className='flex justify-center'>
							<img
								src={formData.image || '/placeholder.svg'}
								alt={formData.name}
								className='w-32 h-32 rounded-xl object-cover border-2 border-border'
							/>
						</div>
					)}

					<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
						<div>
							<label className='block text-sm font-semibold text-text mb-2'>
								Mahsulot nomi
							</label>
							<input
								type='text'
								value={formData.name}
								onChange={e =>
									setFormData({ ...formData, name: e.target.value })
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
										category: e.target.value as CategoryType,
									})
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
							>
								<option value='beef'>Beef</option>
								<option value='mutton'>Mutton</option>
								<option value='chicken'>Chicken</option>
								<option value='bread'>Bread</option>
								<option value='other'>Other</option>
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
								Qiymati
							</label>
							<select
								value={formData.unit}
								onChange={e =>
									setFormData({ ...formData, unit: e.target.value })
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
							>
								<option value='kg'>Kilogram (kg)</option>
								<option value='piece'>Piece</option>
								<option value='loaf'>Loaf</option>
								<option value='lb'>Pound (lb)</option>
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
								Mahsulot rasmi
							</label>
							<input
								type='url'
								value={formData.image}
								onChange={e =>
									setFormData({ ...formData, image: e.target.value })
								}
								className='w-full px-4 py-3 border border-border rounded-lg bg-light text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
								placeholder='https://example.com/image.jpg'
								required
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
							className='flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors'
						>
							Saqlash
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

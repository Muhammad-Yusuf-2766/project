// import { ProductFormData } from '../../types/admin'

import { CategoryType, ProductFormData } from '../../../types'

interface AddProductFormProps {
	formData: ProductFormData
	onChange: (data: ProductFormData) => void
	onSubmit: (e: React.FormEvent) => void
	onCancel: () => void
}

export default function AddProductForm({
	formData,
	onChange,
	onSubmit,
	onCancel,
}: AddProductFormProps) {
	return (
		<div className='bg-card rounded-xl shadow-lg p-8'>
			<h2 className='text-2xl font-bold text-text mb-6'>
				Yangi mahsulot qo'shish
			</h2>
			<form onSubmit={onSubmit} className='space-y-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<label className='block text-sm font-semibold text-text mb-2'>
							Mahsulot nomi
						</label>
						<input
							type='text'
							value={formData.name}
							onChange={e => onChange({ ...formData, name: e.target.value })}
							className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
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
								onChange({
									...formData,
									category: e.target.value as CategoryType,
								})
							}
							className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
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
							step='0.01'
							value={formData.price}
							onChange={e =>
								onChange({ ...formData, price: e.currentTarget.valueAsNumber })
							}
							className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-semibold text-text mb-2'>
							Qiymati
						</label>
						<select
							value={formData.unit}
							onChange={e => onChange({ ...formData, unit: e.target.value })}
							className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
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
								onChange({ ...formData, stock: e.currentTarget.valueAsNumber })
							}
							className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
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
							onChange={e => onChange({ ...formData, image: e.target.value })}
							className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
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
							onChange({ ...formData, description: e.target.value })
						}
						rows={4}
						className='w-full px-4 py-3 border border-border rounded-lg bg-card text-text focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none'
						required
					/>
				</div>

				<div className='flex gap-4'>
					<button
						type='submit'
						className='px-8 py-3 bg-primary text-light rounded-lg font-semibold hover:bg-primary-hover transition-colors'
					>
						Qo'shish
					</button>
					<button
						type='button'
						onClick={onCancel}
						className='px-8 py-3 bg-light text-text rounded-lg font-semibold hover:bg-border transition-colors'
					>
						Bekor qilish
					</button>
				</div>
			</form>
		</div>
	)
}

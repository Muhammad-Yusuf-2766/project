import { useState } from 'react'
import { initialFormData, mockProducts } from '../../constants'
import { Product, ProductFormData } from '../../types'
import AddProductForm from './_components/AddProductForm'
import AdminHeader from './_components/AdminHeader'
import AdminTabs, { AdminTabType } from './_components/AdminTabs'
import DeleteProductModal from './_components/DeleteProductModel'
import EditProductModal from './_components/EditProductModel'
import OverviewSection from './_components/OverviewSection'
import ProductsTable from './_components/ProductsTable'

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState<AdminTabType>('overview')
	const [products, setProducts] = useState<Product[]>(mockProducts)
	const [formData, setFormData] = useState<ProductFormData>(initialFormData)

	// Delete modal state
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [productToDelete, setProductToDelete] = useState<string | null>(null)

	// Edit modal state
	const [showEditModal, setShowEditModal] = useState(false)
	const [productToEdit, setProductToEdit] = useState<Product | null>(null)

	const handleAddSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const newProduct: Product = {
			...formData,
			id: Date.now().toString(),
		}
		setProducts([...products, newProduct])
		setFormData(initialFormData)
		setActiveTab('products')
	}

	const handleDelete = (id: string) => {
		setProductToDelete(id)
		setShowDeleteModal(true)
	}

	const confirmDelete = () => {
		if (productToDelete) {
			setProducts(products.filter(p => p.id !== productToDelete))
		}
		setShowDeleteModal(false)
		setProductToDelete(null)
	}

	const handleEdit = (product: Product) => {
		setProductToEdit(product)
		setShowEditModal(true)
	}

	const handleSaveEdit = (updatedProduct: Product) => {
		setProducts(
			products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)),
		)
	}

	return (
		<div className='min-h-screen text-text'>
			<AdminHeader />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

				{activeTab === 'overview' && <OverviewSection />}

				{activeTab === 'products' && (
					<ProductsTable
						products={products}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				)}

				{activeTab === 'add-product' && (
					<AddProductForm
						formData={formData}
						onChange={setFormData}
						onSubmit={handleAddSubmit}
						onCancel={() => setActiveTab('products')}
					/>
				)}
			</div>

			{/* Modals */}
			<DeleteProductModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={confirmDelete}
			/>

			<EditProductModal
				isOpen={showEditModal}
				product={productToEdit}
				onClose={() => {
					setShowEditModal(false)
					setProductToEdit(null)
				}}
				onSave={handleSaveEdit}
			/>
		</div>
	)
}

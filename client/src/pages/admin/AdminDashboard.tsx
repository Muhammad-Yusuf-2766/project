import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCategories } from '../../hooks/categoriesQuery'
import { deleteProduct } from '../../service/adminApi'
import { Product } from '../../types'
import AddProductForm from './_components/AddProductForm'
import AdminHeader from './_components/AdminHeader'
import AdminTabs, { AdminTabType } from './_components/AdminTabs'
import DeleteProductModal from './_components/DeleteProductModel'
import EditProductModal from './_components/EditProductModel'
import OrdersTable from './_components/ordersTable'
import OverviewSection from './_components/OverviewSection'
import ProductsTable from './_components/ProductsTable'

export default function AdminDashboard() {
	const [activeTab, setActiveTab] = useState<AdminTabType>('overview')

	// Delete modal state
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [productToDelete, setProductToDelete] = useState<string | null>(null)

	// Edit modal state
	const [showEditModal, setShowEditModal] = useState(false)
	const [productToEdit, setProductToEdit] = useState<Product | null>(null)

	const { data: categories } = useCategories()

	const queryClient = useQueryClient()

	function handleDelete(id: string) {
		setProductToDelete(id)
		setShowDeleteModal(true)
	}

	const onDeleteProduct = useMutation({
		mutationFn: ({ productId }: { productId: string }) =>
			deleteProduct(productId),

		onSuccess: res => {
			// siz aytgandek: 200 bo'lsa qayta chaqirish
			if (res.status === 200) {
				toast.success('Mahsulot o`chirildi')
				// 1) faqat products query ni qayta olib keladi
				queryClient.invalidateQueries({ queryKey: ['products'] })
				// yoki aniq shu params bo'yicha:
				// queryClient.invalidateQueries({ queryKey: ['products', params] })
			}
		},
	})

	const confirmDelete = () => {
		if (productToDelete) {
			onDeleteProduct.mutate({ productId: productToDelete })
		}
		setShowDeleteModal(false)
		setProductToDelete(null)
	}

	const handleEdit = (product: Product) => {
		setProductToEdit(product)
		setShowEditModal(true)
	}

	return (
		<div className='min-h-screen text-text'>
			<AdminHeader />

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<AdminTabs activeTab={activeTab} onTabChange={setActiveTab} />

				{activeTab === 'overview' && <OverviewSection />}

				{activeTab === 'products' && (
					<ProductsTable onEdit={handleEdit} onDelete={handleDelete} />
				)}

				{activeTab === 'add-product' && (
					<AddProductForm categories={categories ?? []} />
				)}

				{activeTab === 'orders' && <OrdersTable />}
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
				categories={categories ?? []}
				onClose={() => {
					setShowEditModal(false)
					setProductToEdit(null)
				}}
			/>
		</div>
	)
}

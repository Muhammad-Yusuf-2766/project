import {
	AppleIcon,
	Award,
	Beef,
	ChefHat,
	Clock,
	DollarSign,
	Package,
	Shield,
	TrendingUp,
	Users,
	Wheat,
} from 'lucide-react'
import { CategoryType, Order, Product } from '../types'

// ====== Home-page ===========//
export const Categories = [
	{
		label: 'Barchasi',
		value: 'all',
		icon: Package,
		image:
			'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Premium quality halal beef',
	},
	{
		label: 'Beef',
		value: 'beef',
		icon: Beef,
		image:
			'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Premium quality halal beef',
	},
	{
		label: 'Mutton',
		value: 'mutton',

		icon: Beef,
		image:
			'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Fresh halal mutton',
	},
	{
		label: 'Chicken',
		value: 'chicken',

		icon: ChefHat,
		image:
			'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Farm-fresh halal chicken',
	},
	{
		label: 'Bread',
		value: 'bread',

		icon: Wheat,
		image:
			'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Freshly baked daily',
	},
]

export const features = [
	{
		icon: Shield,
		title: '100% Halal Certified',
		description:
			'All products are certified halal and meet the highest standards',
	},
	{
		icon: Clock,
		title: 'Fresh Daily',
		description: 'Products delivered fresh every day from trusted sellers',
	},
	{
		icon: Award,
		title: 'Quality Guaranteed',
		description: 'We ensure the highest quality standards for all products',
	},
]

export const topProducts = [
	{
		productId: '1',
		title: 'Premium Beef Steak',
		price: 89000,
		originalPrice: 110000,
		image:
			'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.9,
		reviews: 234,
		seller: 'Halal Farms',
		badge: 'Best Seller',
	},
	{
		productId: '2',
		title: 'Fresh Lamb Chops',
		price: 75000,
		originalPrice: 95000,
		image:
			'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.8,
		reviews: 189,
		seller: 'Mountain Meats',
		badge: 'Top Rated',
	},
	{
		productId: '3',
		title: 'Organic Chicken Breast',
		price: 45000,
		originalPrice: 55000,
		image:
			'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.7,
		reviews: 312,
		seller: 'Green Valley',
		badge: 'Organic',
	},
	{
		productId: '4',
		title: 'Artisan Sourdough Bread',
		price: 18000,
		originalPrice: 22000,
		image:
			'https://images.pexels.com/photos/1510684/pexels-photo-1510684.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.9,
		reviews: 156,
		seller: 'Baker House',
		badge: 'Fresh Daily',
	},
	{
		productId: '1',
		title: 'Premium Beef Steak',
		price: 89000,
		originalPrice: 110000,
		image:
			'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.9,
		reviews: 234,
		seller: 'Halal Farms',
		badge: 'Best Seller',
	},
	{
		productId: '2',
		title: 'Fresh Lamb Chops',
		price: 75000,
		originalPrice: 95000,
		image:
			'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.8,
		reviews: 189,
		seller: 'Mountain Meats',
		badge: 'Top Rated',
	},
	{
		productId: '3',
		title: 'Organic Chicken Breast',
		price: 45000,
		originalPrice: 55000,
		image:
			'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.7,
		reviews: 312,
		seller: 'Green Valley',
		badge: 'Organic',
	},
	{
		productId: '4',
		title: 'Artisan Sourdough Bread',
		price: 18000,
		originalPrice: 22000,
		image:
			'https://images.pexels.com/photos/1510684/pexels-photo-1510684.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.9,
		reviews: 156,
		seller: 'Baker House',
		badge: 'Fresh Daily',
	},
]

export const recentProducts = [
	{
		id: 5,
		title: 'Marinated Kebab Mix',
		price: 65000,
		image:
			'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.6,
		seller: 'Kebab Master',
		isNew: true,
	},
	{
		id: 6,
		name: 'Ground Beef Premium',
		price: 52000,
		image:
			'https://images.pexels.com/photos/128401/pexels-photo-128401.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.5,
		seller: 'Halal Farms',
		isNew: true,
	},
	{
		id: 7,
		name: 'Whole Roast Chicken',
		price: 48000,
		image:
			'https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.7,
		seller: 'Farm Fresh',
		isNew: true,
	},
	{
		id: 8,
		name: 'Traditional Flatbread',
		price: 12000,
		image:
			'https://images.pexels.com/photos/1387070/pexels-photo-1387070.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.8,
		seller: 'Local Bakery',
		isNew: true,
	},
	{
		id: 9,
		name: 'Lamb Shoulder Cut',
		price: 82000,
		image:
			'https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=400',
		rating: 4.6,
		seller: 'Mountain Meats',
		isNew: true,
	},
	{
		id: 10,
		name: 'Chicken Wings Pack',
		price: 35000,
		image:
			'https://www.lifeisbutadish.com/wp-content/uploads/2016/01/Crispy-Baked-Chicken-Wings-9.jpg',
		rating: 4.4,
		seller: 'Green Valley',
		isNew: true,
	},
]
// ====== Home-page ===========//

// ===== 	Admin-pages ====== //
export const mockProducts: Product[] = [
	{
		_id: '1',
		title: 'Premium Angus Beef',
		category: 'beef',
		price: 15000,
		unit: 'kg',
		description: 'High-quality halal Angus beef',
		image:
			'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 50,
		sellerId: '1',
		createdAt: '2024-01-01',
	},
	{
		productId: '2',
		title: 'Fresh Lamb Chops',
		category: 'mutton',
		price: 16500,
		unit: 'kg',
		description: 'Tender halal lamb chops',
		image:
			'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 30,
		sellerId: '2',
		createdAt: '2024-01-02',
	},
]

export const stats = [
	{
		label: 'Barcha mahsulotlar',
		value: '156',
		icon: Package,
		color: 'bg-blue-500',
	},
	{
		label: 'Barcha buyurtmalar',
		value: '42',
		icon: Users,
		color: 'bg-emerald-500',
	},
	{
		label: 'Barcha savdo',
		value: '$24,580',
		icon: DollarSign,
		color: 'bg-purple-500',
	},
	{
		label: 'O`sish',
		value: '+12.5%',
		icon: TrendingUp,
		color: 'bg-orange-500',
	},
]

export const categoriesPage: CategoryType[] = [
	{ _id: 'all', title: 'Barchasi', slug: 'all', image: '', icon: Package },
	{
		_id: 'beef',
		title: 'Mol go`shti',
		slug: 'mol-goshti',
		image: '',
		icon: Beef,
	},
	{
		_id: 'mutton',
		title: 'Qo`y go`shti',
		slug: 'qoy-goshti',
		image: '',
		icon: Beef,
	},
	{
		_id: 'chicken',
		title: 'Tovuq go`shti',
		slug: 'tovuq-goshti',
		image: '',
		icon: ChefHat,
	},
	{
		_id: 'bread',
		title: 'Patir va Nonlar',
		slug: 'non-va-patirlar',
		image: '',
		icon: Wheat,
	},
	{
		_id: 'dry fruits',
		title: 'Quruq mevalar',
		slug: 'quruq-mevalar',
		image: '',
		icon: AppleIcon,
	},
]

export const productMeasures = [
	{ value: 'kg', label: 'Kilogram (kg)' },
	{ value: 'dona', label: 'Dona' },
	{ value: 'litr', label: 'Litr (l)' },
	{ value: 'pachka', label: 'Pachka (qadoq)' },
]

export const mockOrders: Order[] = [
	{
		_id: '1',
		userId: 'u1',
		fullName: 'Aziz Karimov',
		items: [
			{
				productId: 'p1',
				title: 'Olma (Fuji)',
				quantity: 3,
				unit: 'kg',
				price: 18000,
				originalPrice: 22000,
				subPrice: 54000,
			},
			{
				productId: 'p2',
				title: 'Banan',
				quantity: 2,
				unit: 'kg',
				price: 25000,
				originalPrice: null,
				subPrice: 50000,
			},
		],
		subTotal: 104000,
		deliveryPrice: 10000,
		totalPrice: 114000,
		status: 'pending',
		address: 'Toshkent, Chilonzor tumani, 9-kvartal, 15-uy',
		customerPhone: '+998901234567',
		createdAt: '2026-02-10T08:30:00.000Z',
		updatedAt: '2026-02-10T08:30:00.000Z',
	},
	{
		_id: '2',
		userId: 'u2',
		fullName: 'Dilshod Rahimov',
		items: [
			{
				productId: 'p3',
				title: 'Sut (1L)',
				quantity: 5,
				unit: 'dona',
				price: 12000,
				originalPrice: null,
				subPrice: 60000,
			},
		],
		subTotal: 60000,
		deliveryPrice: 5000,
		totalPrice: 65000,
		status: 'sending',
		address: 'Toshkent, Yunusobod tumani, 4-kvartal, 7-uy',
		customerPhone: '+998937654321',
		createdAt: '2026-02-09T14:15:00.000Z',
		updatedAt: '2026-02-10T09:00:00.000Z',
	},
	{
		_id: '3',
		userId: 'u3',
		fullName: 'Malika Toshpulatova',
		items: [
			{
				productId: 'p4',
				title: 'Non (oq)',
				quantity: 10,
				unit: 'dona',
				price: 3000,
				originalPrice: 3500,
				subPrice: 30000,
			},
			{
				productId: 'p5',
				title: 'Pishloq',
				quantity: 1,
				unit: 'kg',
				price: 85000,
				originalPrice: null,
				subPrice: 85000,
			},
			{
				productId: 'p6',
				title: 'Tuxum (10 dona)',
				quantity: 2,
				unit: 'dona',
				price: 22000,
				originalPrice: 25000,
				subPrice: 44000,
			},
		],
		subTotal: 159000,
		deliveryPrice: 15000,
		totalPrice: 174000,
		status: 'completed',
		address: "Samarqand, Registon ko'chasi, 22-uy",
		customerPhone: '+998911112233',
		createdAt: '2026-02-08T10:00:00.000Z',
		updatedAt: '2026-02-09T16:30:00.000Z',
	},
	{
		_id: '4',
		userId: 'u4',
		fullName: 'Bobur Ismoilov',
		items: [
			{
				productId: 'p7',
				title: 'Guruch (Laser)',
				quantity: 5,
				unit: 'kg',
				price: 28000,
				originalPrice: 32000,
				subPrice: 140000,
			},
		],
		subTotal: 140000,
		deliveryPrice: 10000,
		totalPrice: 150000,
		status: 'pending',
		address: 'Buxoro, Kogon tumani, Navbahor MFY',
		customerPhone: '+998945556677',
		createdAt: '2026-02-11T07:45:00.000Z',
		updatedAt: '2026-02-11T07:45:00.000Z',
	},
	{
		_id: '5',
		userId: 'u5',
		fullName: 'Nodira Umarova',
		items: [
			{
				productId: 'p8',
				title: 'Pomidor',
				quantity: 4,
				unit: 'kg',
				price: 15000,
				originalPrice: null,
				subPrice: 60000,
			},
			{
				productId: 'p9',
				title: 'Bodring',
				quantity: 3,
				unit: 'kg',
				price: 12000,
				originalPrice: null,
				subPrice: 36000,
			},
		],
		subTotal: 96000,
		deliveryPrice: 8000,
		totalPrice: 104000,
		status: 'sending',
		address: "Namangan, Markaziy ko'cha, 5-uy",
		customerPhone: '+998907778899',
		createdAt: '2026-02-10T16:20:00.000Z',
		updatedAt: '2026-02-11T10:00:00.000Z',
	},
	{
		_id: '6',
		userId: 'u6',
		fullName: 'Sardor Mirzayev',
		items: [
			{
				productId: 'p10',
				title: 'Coca-Cola (1.5L)',
				quantity: 6,
				unit: 'dona',
				price: 10000,
				originalPrice: 12000,
				subPrice: 60000,
			},
			{
				productId: 'p11',
				title: 'Chips (Lays)',
				quantity: 4,
				unit: 'dona',
				price: 8000,
				originalPrice: null,
				subPrice: 32000,
			},
		],
		subTotal: 92000,
		deliveryPrice: 5000,
		totalPrice: 97000,
		status: 'completed',
		address: "Farg'ona, Quva tumani, Mustaqillik ko'chasi, 11-uy",
		customerPhone: '+998933334455',
		createdAt: '2026-02-07T12:00:00.000Z',
		updatedAt: '2026-02-08T14:00:00.000Z',
	},
]

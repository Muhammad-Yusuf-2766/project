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
import { Product, ProductFormData } from '../types'

// ====== Home-page ===========//
export const categories = [
	{
		name: 'Beef',
		icon: Beef,
		image:
			'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Premium quality halal beef',
	},
	{
		name: 'Mutton',
		icon: Beef,
		image:
			'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Fresh halal mutton',
	},
	{
		name: 'Chicken',
		icon: ChefHat,
		image:
			'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
		description: 'Farm-fresh halal chicken',
	},
	{
		name: 'Bread',
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
		id: 1,
		name: 'Premium Beef Steak',
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
		id: 2,
		name: 'Fresh Lamb Chops',
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
		id: 3,
		name: 'Organic Chicken Breast',
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
		id: 4,
		name: 'Artisan Sourdough Bread',
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
		id: 1,
		name: 'Premium Beef Steak',
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
		id: 2,
		name: 'Fresh Lamb Chops',
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
		id: 3,
		name: 'Organic Chicken Breast',
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
		id: 4,
		name: 'Artisan Sourdough Bread',
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
		name: 'Marinated Kebab Mix',
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
		id: '1',
		name: 'Premium Angus Beef',
		category: 'beef',
		price: 24.99,
		unit: 'kg',
		description: 'High-quality halal Angus beef',
		image:
			'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 50,
		sellerId: '1',
		createdAt: '2024-01-01',
	},
	{
		id: '2',
		name: 'Fresh Lamb Chops',
		category: 'mutton',
		price: 28.99,
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

export const initialFormData: ProductFormData = {
	name: '',
	category: 'beef',
	price: 0,
	unit: 'kg',
	description: '',
	image: '',
	stock: 0,
}
// ===== 	Admin-pages ====== //

// ===== 	Product-pages ====== //
export const mockProductsPage: Product[] = [
	{
		id: '1',
		name: 'Premium Angus Beef',
		category: 'beef',
		price: 24.99,
		originalPrice: 32.99, // On Sale
		unit: 'kg',
		description:
			'High-quality halal Angus beef, perfect for grilling and roasting',
		image:
			'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 50,
		sellerId: '1',
		createdAt: '2024-01-01',
	},
	{
		id: '2',
		name: 'Fresh Lamb Chops',
		category: 'mutton',
		price: 28.99,
		unit: 'kg',
		description: 'Tender halal lamb chops, ideal for special occasions',
		image:
			'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 30,
		sellerId: '2',
		createdAt: '2024-01-02',
	},
	{
		id: '3',
		name: 'Whole Chicken',
		category: 'chicken',
		price: 8.99,
		originalPrice: 11.99, // On Sale
		unit: 'piece',
		description: 'Farm-fresh halal chicken, cleaned and ready to cook',
		image:
			'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 100,
		sellerId: '1',
		createdAt: '2024-01-03',
	},
	{
		id: '4',
		name: 'Artisan Sourdough Bread',
		category: 'bread',
		price: 5.99,
		unit: 'loaf',
		description: 'Freshly baked sourdough with a crispy crust',
		image:
			'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 40,
		sellerId: '3',
		createdAt: '2024-01-04',
	},
	{
		id: '5',
		name: 'Ground Beef',
		category: 'beef',
		price: 18.99,
		originalPrice: 24.99, // On Sale
		unit: 'kg',
		description: 'Lean halal ground beef, perfect for burgers and meatballs',
		image:
			'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=400',
		stock: 60,
		sellerId: '2',
		createdAt: '2024-01-05',
	},
	{
		id: '6',
		name: 'Chicken Breast',
		category: 'chicken',
		price: 12.99,
		unit: 'kg',
		description: 'Boneless halal chicken breast, high in protein',
		image:
			'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 75,
		sellerId: '1',
		createdAt: '2024-01-06',
	},
	{
		id: '7',
		name: 'Whole Wheat Bread',
		category: 'bread',
		price: 4.99,
		originalPrice: 6.49, // On Sale
		unit: 'loaf',
		description: 'Healthy whole wheat bread, baked fresh daily',
		image:
			'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 50,
		sellerId: '3',
		createdAt: '2024-01-07',
	},
	{
		id: '8',
		name: 'Leg of Lamb',
		category: 'mutton',
		price: 32.99,
		unit: 'kg',
		description: 'Premium halal leg of lamb, perfect for roasting',
		image:
			'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=400',
		stock: 25,
		sellerId: '2',
		createdAt: '2024-01-08',
	},
]

export const categoriesPage = [
	{ id: 'all', name: 'Barchasi', icon: Package },
	{ id: 'beef', name: 'Mol go`shti', icon: Beef },
	{ id: 'mutton', name: 'Qo`y go`shti', icon: Beef },
	{ id: 'chicken', name: 'Tovuq go`shti', icon: ChefHat },
	{ id: 'bread', name: 'Patir va Nonlar', icon: Wheat },
	{ id: 'dry fruits', name: 'Quruq mevalar', icon: AppleIcon },
]
// ===== 	Product-pages ====== //

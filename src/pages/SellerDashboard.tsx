import { useState } from 'react';
import { Package, DollarSign, ShoppingBag, TrendingUp, Eye, Edit } from 'lucide-react';
import { Product } from '../types';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'my-products'>('overview');

  const myProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Angus Beef',
      category: 'beef',
      price: 24.99,
      unit: 'kg',
      description: 'High-quality halal Angus beef',
      image: 'https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 50,
      sellerId: '1',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Whole Chicken',
      category: 'chicken',
      price: 8.99,
      unit: 'piece',
      description: 'Farm-fresh halal chicken',
      image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 100,
      sellerId: '1',
      createdAt: '2024-01-03'
    },
    {
      id: '6',
      name: 'Chicken Breast',
      category: 'chicken',
      price: 12.99,
      unit: 'kg',
      description: 'Boneless halal chicken breast',
      image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 75,
      sellerId: '1',
      createdAt: '2024-01-06'
    }
  ];

  const stats = [
    { label: 'My Products', value: '3', icon: Package, color: 'bg-blue-500' },
    { label: 'Total Sales', value: '127', icon: ShoppingBag, color: 'bg-emerald-500' },
    { label: 'Revenue', value: '$3,240', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Growth', value: '+8.2%', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const recentSales = [
    { id: '1', product: 'Premium Angus Beef', quantity: '2 kg', amount: '$49.98', date: '2 hours ago' },
    { id: '2', product: 'Whole Chicken', quantity: '3 pieces', amount: '$26.97', date: '5 hours ago' },
    { id: '3', product: 'Chicken Breast', quantity: '1.5 kg', amount: '$19.49', date: '1 day ago' },
    { id: '4', product: 'Premium Angus Beef', quantity: '1 kg', amount: '$24.99', date: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-emerald-50 mt-2">Manage your products and track your sales</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('my-products')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'my-products'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            My Products
          </button>
        </div>

        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Sales</h2>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{sale.product}</p>
                        <p className="text-sm text-gray-600">{sale.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-600">{sale.amount}</p>
                        <p className="text-xs text-gray-500">{sale.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Top Products</h2>
                <div className="space-y-4">
                  {myProducts.slice(0, 3).map((product, index) => (
                    <div key={product.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center mr-4 font-bold">
                        #{index + 1}
                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-4"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.stock} in stock</p>
                      </div>
                      <p className="font-bold text-emerald-600">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Boost Your Sales</h2>
                  <p className="text-emerald-50">Add more products to increase your revenue</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                  Add New Product
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'my-products' && (
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                  Add Product
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {myProducts.map((product) => (
                <div key={product.id} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-emerald-500 transition-all">
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 50 ? 'bg-green-100 text-green-700' :
                        product.stock > 20 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-emerald-600">${product.price}</span>
                        <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

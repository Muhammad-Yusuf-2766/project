import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="w-8 h-8 text-emerald-500" />
              <span className="text-2xl font-bold text-white">
                Ansor <span className="text-emerald-500">Market</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted source for premium halal products. We connect quality sellers with customers who value authenticity and excellence.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">Products</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">Become a Seller</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-500 transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>info@ansormarket.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>123 Market St, City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Ansor Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

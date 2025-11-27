import { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { useMode } from '../context/ModeContext';
import { supabase } from '../lib/supabase';

interface OrderModalProps {
  item: MenuItem;
  onClose: () => void;
}

export default function OrderModal({ item, onClose }: OrderModalProps) {
  const { mode, accentColor } = useMode();
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const totalAmount = item.price * quantity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const orderData = {
        mode,
        item_name: item.name,
        quantity,
        price: item.price,
        total_amount: totalAmount,
        customer_name: customerName,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        status: 'pending',
      };

      const { error: dbError } = await supabase
        .from('orders')
        .insert([orderData]);

      if (dbError) throw dbError;

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      await fetch(`${supabaseUrl}/functions/v1/send-email-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          type: 'order',
          data: orderData,
        }),
      });

      setSubmitMessage('Order placed successfully! We will contact you soon.');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      setSubmitMessage('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              <ShoppingCart size={20} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: accentColor }}>
              Place Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-6 mb-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-2xl shadow-lg"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-3">{item.description}</p>
              <p className="text-2xl font-bold" style={{ color: accentColor }}>
                ₹{item.price}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full font-bold transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full font-bold transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                >
                  +
                </button>
                <span className="ml-auto text-xl font-bold" style={{ color: accentColor }}>
                  Total: ₹{totalAmount}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                style={{ focusRing: accentColor }}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                required
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300"
                placeholder="Enter your complete delivery address"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-medium text-gray-800 mb-2">Payment Method</p>
              <p className="text-gray-600">Cash on Delivery (COD)</p>
            </div>

            {submitMessage && (
              <div
                className={`p-4 rounded-xl ${
                  submitMessage.includes('success')
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {submitMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: accentColor,
                color: mode === 'restaurant' ? '#F5F5DC' : '#1F2937',
              }}
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

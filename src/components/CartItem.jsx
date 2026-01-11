import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm"
        >
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-base font-medium text-primary">
                            <a href={`/product/${item.id}`}>{item.name}</a>
                        </h3>
                        <p className="mt-1 text-sm text-secondary">{item.category}</p>
                    </div>
                    <p className="text-base font-bold text-primary ml-4">
                        {formatPrice(item.price * item.quantity)}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                        <button
                            type="button"
                            className="p-1 px-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-l-lg disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, -1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2 text-sm font-medium text-slate-900 w-8 text-center">
                            {item.quantity}
                        </span>
                        <button
                            type="button"
                            className="p-1 px-2 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-r-lg"
                            onClick={() => updateQuantity(item.id, 1)}
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CartItem;

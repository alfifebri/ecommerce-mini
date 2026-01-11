import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from './Button';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -5,
                transition: { duration: 0.2 }
            }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow"
        >
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </Link>

            <div className="p-4">
                <div className="text-xs text-secondary mb-1 font-medium uppercase tracking-wide">
                    {product.category}
                </div>
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-semibold text-primary mb-1 truncate hover:text-accent transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-slate-900">
                        {formatPrice(product.price)}
                    </span>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="p-2 h-10 w-10 !rounded-full !px-0 bg-slate-50 border-transparent hover:bg-slate-100 hover:text-accent"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        aria-label="Add to cart"
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const FALLBACK_IMAGE =
    'https://images.unsplash.com/photo-1578749556935-412c26d4b66d?q=80&w=1000&auto=format&fit=crop';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    // 🔒 SAFE DEFAULT
    const [imgSrc, setImgSrc] = useState(FALLBACK_IMAGE);

    // 🔁 UPDATE WHEN PRODUCT CHANGES
    useEffect(() => {
        if (product?.image && product.image.trim() !== '') {
            setImgSrc(product.image);
        } else {
            setImgSrc(FALLBACK_IMAGE);
        }
    }, [product]);

    // 🛑 HARD GUARD (PREVENT CRASH)
    if (!product) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow"
        >
            <Link
                to={`/product/${product.id}`}
                className="block relative overflow-hidden aspect-square"
            >
                <motion.img
                    src={imgSrc}
                    alt={product.name || 'Product image'}
                    onError={() => setImgSrc(FALLBACK_IMAGE)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                />
            </Link>

            <div className="p-4">
                <div className="text-xs text-secondary mb-1 font-medium uppercase">
                    {product.category}
                </div>

                <h3 className="text-lg font-semibold text-primary truncate">
                    {product.name}
                </h3>

                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold">
                        {formatPrice(product.price)}
                    </span>

                    <Button
                        variant="secondary"
                        size="sm"
                        className="p-2 h-10 w-10 !rounded-full"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;

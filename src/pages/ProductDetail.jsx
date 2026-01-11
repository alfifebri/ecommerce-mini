import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Product not found</h2>
                    <Button
                        className="mt-4"
                        onClick={() => navigate('/')}
                    >
                        Go Back Home
                    </Button>
                </div>
            </div>
        );
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <PageTransition>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-secondary hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Section */}
                    <div className="aspect-square bg-slate-100 rounded-2xl overflow-hidden">
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="text-sm font-bold text-accent uppercase tracking-wider mb-2">
                                {product.category}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                                {product.name}
                            </h1>
                            <p className="text-2xl font-bold text-slate-900 mb-6">
                                {formatPrice(product.price)}
                            </p>

                            <div className="prose prose-slate mb-8 text-secondary leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="flex-1 py-4 text-base"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="flex-1 py-4 text-base"
                                >
                                    Add to Wishlist
                                </Button>
                            </div>

                            <div className="mt-8 border-t border-slate-100 pt-8 grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium text-primary">Free Shipping</h4>
                                    <p className="text-sm text-secondary">On orders over $100</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-primary">Easy Returns</h4>
                                    <p className="text-sm text-secondary">30-day money back guarantee</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProductDetail;

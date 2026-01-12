import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatters';
import { TAX_RATE } from '../constants/config';

const Cart = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();



    if (cart.length === 0) {
        return (
            <PageTransition>
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-400">
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-bold text-primary mb-2">Your cart is empty</h2>
                    <p className="text-secondary mb-8 text-center max-w-md">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Button onClick={() => navigate('/')} size="lg">
                        Start Shopping
                    </Button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-8">
                        <div className="space-y-4">
                            <AnimatePresence mode='popLayout'>
                                {cart.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 flex justify-between items-center">
                            <Button
                                variant="secondary"
                                onClick={clearCart}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100"
                            >
                                Clear Cart
                            </Button>
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
                            <h2 className="text-lg font-bold text-primary mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-secondary">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-slate-900">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Tax</span>
                                    <span className="font-medium text-slate-900">{formatPrice(cartTotal * TAX_RATE)}</span>
                                </div>
                                <div className="h-px bg-slate-100 my-4" />
                                <div className="flex justify-between text-lg font-bold text-primary">
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal * (1 + TAX_RATE))}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full py-4 text-base group"
                                onClick={() => navigate('/checkout')}
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="mt-6 text-xs text-center text-secondary">
                                We accept major credit cards, PayPal, and Apple Pay.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Cart;

import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatters';
import { TAX_RATE } from '../constants/config';

const Checkout = () => {
    const { cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSuccess(true);
        setTimeout(() => {
            clearCart();
            navigate('/');
        }, 3000);
    };



    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Order Confirmed!</h2>
                    <p className="text-secondary mb-6">
                        Thank you for your purchase. We've sent a confirmation email to your inbox.
                    </p>
                    <p className="text-sm text-slate-400">Redirecting to home...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <h1 className="text-3xl font-bold text-primary mb-8 overflow-hidden">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-primary mb-4">Shipping Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">First Name</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Last Name</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Email Address</label>
                                        <input type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-secondary mb-2">Address</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">City</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-2">Postal Code</label>
                                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <h2 className="text-xl font-bold text-primary mb-4">Payment Method</h2>
                                <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 text-secondary text-sm">
                                    This is a mock checkout. No payment required.
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button type="submit" size="lg" className="w-full py-4 text-base">
                                    Pay {formatPrice(cartTotal * (1 + TAX_RATE))}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-5">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 sticky top-24">
                            <h2 className="text-lg font-bold text-primary mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-4">
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
                                <div className="h-px bg-slate-200 my-4" />
                                <div className="flex justify-between text-xl font-bold text-primary">
                                    <span>Total</span>
                                    <span>{formatPrice(cartTotal * (1 + TAX_RATE))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Checkout;

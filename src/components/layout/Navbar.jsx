import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary tracking-tight" onClick={closeMenu}>
                        Luxe<span className="text-accent">Market</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-accent' : 'text-secondary hover:text-primary'}`}>
                            Shop
                        </Link>
                        <Link to="/cart" className="relative group">
                            <div className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                                <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-primary" />
                                {cartCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full"
                                    >
                                        {cartCount}
                                    </motion.span>
                                )}
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="mr-4 relative">
                            <ShoppingCart className="w-6 h-6 text-slate-700" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={toggleMenu} className="p-2 rounded-md text-slate-700 hover:text-primary hover:bg-slate-100 focus:outline-none">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link
                                to="/"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-slate-50 text-accent' : 'text-slate-700 hover:bg-slate-50'}`}
                                onClick={closeMenu}
                            >
                                Shop
                            </Link>
                            <Link
                                to="/cart"
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/cart') ? 'bg-slate-50 text-accent' : 'text-slate-700 hover:bg-slate-50'}`}
                                onClick={closeMenu}
                            >
                                Cart ({cartCount})
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

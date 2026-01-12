import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import PageTransition from '../components/common/PageTransition';

const Home = () => {
    return (
        <PageTransition>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold text-primary mb-4 tracking-tight">
                        New Arrivals
                    </h1>
                    <p className="text-lg text-secondary max-w-2xl mx-auto">
                        Discover our premium collection of hand-picked items designed to elevate your lifestyle.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;

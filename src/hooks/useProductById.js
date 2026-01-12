import { products } from '../data/products';

export const useProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
};

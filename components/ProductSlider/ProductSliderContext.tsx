import React, { createContext, useContext, ReactNode } from 'react';
import { Product } from './types';

interface ProductSliderContextType {
    products: Product[];
    loading: boolean;
}

const ProductSliderContext = createContext<ProductSliderContextType | undefined>(undefined);

interface ProductSliderProviderProps {
    children: ReactNode;
    products: Product[];
    loading: boolean;
}

export const ProductSliderProvider: React.FC<ProductSliderProviderProps> = ({ children, products, loading }) => {
    return (
        <ProductSliderContext.Provider value={{ products, loading }}>
            {children}
        </ProductSliderContext.Provider>
    );
};

export const useProductSlider = (): ProductSliderContextType => {
    const context = useContext(ProductSliderContext);
    if (!context) {
        throw new Error('useProductSlider must be used within a ProductSliderProvider');
    }
    return context;
};

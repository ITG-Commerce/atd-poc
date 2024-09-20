import { useEffect, useState } from "react";

export interface Product {
    name: string;
    media_gallery_entries: {
        file: string;
    }[];
}

export function useProducts(urlKeys: string[]) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!urlKeys) return;

        const fetchProduct = async (urlKey: string) => {

            const response = await fetch(`/api/product?urlKey=${urlKey}`);
            const data = await response.json();

            if (response.ok) {
                return data.product;
            } else {
                setError(data.error || 'Error fetching product');
            }
        };

        const fetchProducts = async () => {
            const productPromises = urlKeys.map(fetchProduct);
            try {
                const products = await Promise.all(productPromises);
                setProducts(products);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: unknown) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [urlKeys]);

    return { products, loading, error };
}
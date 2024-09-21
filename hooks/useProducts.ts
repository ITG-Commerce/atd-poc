import { Product } from "@/components/ProductSlider/types";
import { useEffect, useState } from "react";

export function useProducts(urlKeys: string[]) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!urlKeys) return;

        const fetchProducts = async (urlKeys: string[]) => {
            try {
                const response = await fetch(`/api/products?urlKeys=${urlKeys.join(',')}`);
                const data = await response.json();

                if (response.ok) {
                    setProducts(data.products.map((product: Product, index: number) => ({
                        ...product,
                        urlKey: urlKeys[index],
                    }))
                    );
                } else {
                    setProducts([]);
                    setError(data?.error);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error: unknown) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }

        };

        fetchProducts(urlKeys);
    }, [urlKeys]);

    return { products, loading, error };
}

import Image from "next/image";
import { useEffect, useState } from "react";

export interface ProductProps {
  urlKey: string;
}

export interface Product {
  name: string;
  media_gallery_entries: {
    file: string;
  }[];
}

function Product({ urlKey }: ProductProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!urlKey) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product?urlKey=${urlKey}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.product);
        } else {
          setError(data.error || 'Error fetching product');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: unknown) {
        setError('Error fetching product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [urlKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return "No product found";

  return (
    <div>
      <h1>{product.name}</h1>
        

        <Image
            src={`${process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT}/pub/media/catalog/product${product.media_gallery_entries[0].file}`}
            alt={product.name}
            width={400}
            height={400}
        />
    </div>
  );
}

export default Product;

import { useProducts } from "@/hooks/useProducts";
import { SfLink, SfButton, SfIconFavorite } from "@storefront-ui/react";
import Image from "next/image";

export interface Product {
    name: string;
    media_gallery_entries: {
        file: string;
    }[];
}

interface ProductSliderItemProps {
    urlKey: string;
}

const ProductSliderItem: React.FC<ProductSliderItemProps> = (props: ProductSliderItemProps) => {
    const { products, error, loading } = useProducts([props.urlKey])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!products.length) return "No product nfound";

    const { name, media_gallery_entries } = products[0];

    return (
        <div className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]">
            <div className="relative">
                <SfLink href="#" className="block">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT}/pub/media/catalog/product${media_gallery_entries[0].file}`}
                        alt={name}
                        width={400}
                        height={400}
                    />
                </SfLink>
                <SfButton
                    variant="tertiary"
                    size="sm"
                    square
                    className="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
                    aria-label="Add to wishlist"
                >
                    <SfIconFavorite size="sm" />
                </SfButton>
            </div>
            <div className="p-2 border-t border-neutral-200 typography-text-sm">
                <SfLink href="#" variant="secondary" className="no-underline block truncate">
                    {name}
                </SfLink>
            </div>
        </div>
    );
};

export default ProductSliderItem;
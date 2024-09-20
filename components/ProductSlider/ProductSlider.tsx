"use client";

import { useProducts } from "@/hooks/useProducts";
import {
  SfLink,
  SfButton,
  SfIconFavorite,
  SfIconChevronLeft,
  SfIconChevronRight,
  SfScrollable,
} from "@storefront-ui/react";
import classNames from "classnames";
import Image from "next/image";

export interface Product {
  name: string;
  media_gallery_entries: {
    file: string;
  }[];
}

function ButtonPrev({ disabled, ...attributes }: { disabled?: boolean }) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 left-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        }
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronLeft />
    </SfButton>
  );
}

ButtonPrev.defaultProps = { disabled: false };

function ButtonNext({ disabled, ...attributes }: { disabled?: boolean }) {
  return (
    <SfButton
      className={classNames(
        "absolute !rounded-full z-10 right-4 bg-white hidden md:block",
        {
          "!hidden": disabled,
        }
      )}
      variant="secondary"
      size="lg"
      square
      {...attributes}
    >
      <SfIconChevronRight />
    </SfButton>
  );
}

ButtonNext.defaultProps = { disabled: false };

export default function ProductSliderBasic(urlKeys: string) {

  const {  products, error, loading } = useProducts(urlKeys)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <SfScrollable
      className="m-auto py-4 items-center w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      buttons-placement="floating"
      drag
      slotPreviousButton={<ButtonPrev />}
      slotNextButton={<ButtonNext />}
    >
      {products.map(({ name, media_gallery_entries }) => (
        <div
          key={name}
          className="first:ms-auto last:me-auto ring-1 ring-inset ring-neutral-200 shrink-0 rounded-md hover:shadow-lg w-[148px] lg:w-[192px]"
        >
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
            <SfLink href="#" variant="secondary" className="no-underline">
              {name}
            </SfLink>
          </div>
        </div>
      ))}
    </SfScrollable>
  );
}

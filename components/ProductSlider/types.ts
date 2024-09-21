export interface Product {
  id: number;
  sku: string;
  name: string;
  attribute_set_id: number;
  price: number;
  status: number;
  visibility: number;
  type_id: string;
  created_at: string;
  updated_at: string;
  extension_attributes: ExtensionAttributes;
  product_links: ProductLink[];
  options: unknown[];
  media_gallery_entries: MediaGalleryEntry[];
  tier_prices: unknown[];
  custom_attributes: CustomAttribute[];
  // Added later on since it is missing in the original type
  urlKey: string;
}

interface ExtensionAttributes {
  website_ids: number[];
  category_links: CategoryLink[];
  configurable_product_options: ConfigurableProductOption[];
  configurable_product_links: number[];
}

interface CategoryLink {
  position: number;
  category_id: string;
}

interface ConfigurableProductOption {
  id: number;
  attribute_id: string;
  label: string;
  position: number;
  values: Value[];
  product_id: number;
}

interface Value {
  value_index: number;
}

interface ProductLink {
  sku: string;
  link_type: string;
  linked_product_sku: string;
  linked_product_type: string;
  position: number;
}

interface MediaGalleryEntry {
  id: number;
  media_type: string;
  label: string;
  position: number;
  disabled: boolean;
  types: string[];
  file: string;
}

interface CustomAttribute {
  attribute_code: string;
  value: string | string[];
}

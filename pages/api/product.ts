import { NextApiRequest, NextApiResponse } from 'next';

export async function getProductByUrlKey(urlKey: string) {
    // Replace this URL with your actual product API endpoint
    const apiEndpoint = `${process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT}/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=url_key&searchCriteria[filterGroups][0][filters][0][value]=${urlKey}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq`;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product data: ${response.statusText}`);
        }

        const product = await response.json();

        if (!product.items || product.items.length === 0) {
            return null;
        }
        
        return product.items[0];
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { urlKey } = req.query;

    if (!urlKey) {
        return res.status(400).json({ error: 'URL key is required' });
    }

    try {
        const product = await getProductByUrlKey(urlKey as string);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ product });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
import { NextApiRequest, NextApiResponse } from 'next';

export async function getProductsByUrlKey(urlKeys: string[]) {
    // Replace this URL with your actual product API endpoint
    const apiEndpoint = `${process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT}/rest/default/V1/products?searchCriteria[filterGroups][0][filters][0][field]=url_key&searchCriteria[filterGroups][0][filters][0][value]=${urlKeys.join(',')}&searchCriteria[filterGroups][0][filters][0][conditionType]=in`;

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
            return [];
        }
        
        return product.items;
    } catch (error) {
        console.error('Error fetching product data:', error);
        throw error;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const urlKeys = JSON.parse(req.query.urlKeys as string);

    if (!urlKeys) {
        return res.status(400).json({ error: 'URL key is required' });
    }

    try {
        const products = await getProductsByUrlKey((urlKeys as string).split(',') as string[]);

        if (!products) {
            return res.status(404).json({ error: 'Products not found' });
        }

        return res.status(200).json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
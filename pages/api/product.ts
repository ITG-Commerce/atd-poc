import { NextApiRequest, NextApiResponse } from 'next';

export async function getProductByUrlKey(urlKey: string) {
    // Replace this URL with your actual product API endpoint
    const apiEndpoint = `https://staging.magento2-d55b3.reward-cloud.io/rest/default/V1/products`;

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: JSON.stringify({
                searchCriteria: {
                    filterGroups: [
                        {
                            filters: [
                                {
                                    field: 'url_key',
                                    value: urlKey,
                                    condition_type: 'eq'
                                }
                            ]
                        }
                    ]
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product data: ${response.statusText}`);
        }

        const product = await response.json();
        return product;
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
// pages/api/rates.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const API_KEY = process.env.NAVASAN_API_KEY; // API Key خودت رو تو .env بذار
            const response = await fetch(`https://api.navasan.tech/latest/?api_key=${API_KEY}`);

            if (!response.ok) {
                console.error('Rate API call failed with status:', response.status);
                return res.status(response.status).json({ message: 'Failed to fetch Rate data from external API' });
            }

            const data = await response.json();
            // console.log('API response data:', data); // اینو ببین تو ترمینال سرورت
            res.setHeader('Cache-Control', 'no-store')
            return res.status(200).json(data);

        } catch (error) {
            console.error('Fetch error:', error);
            return res.status(500).json({ message: 'Rate Server error', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Rate Method Not Allowed' });
    }
}

export default async function prices(req, res) {
    if (req.method === 'GET') {
      try {
        const response = await fetch('https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeFbhZCp8ZBfgb15fgCPCW3sAW7Xbb');
        
        if (!response.ok) {
          console.error('API call failed with status:', response.status);
          return res.status(response.status).json({ message: 'Failed to fetch data from external API' });
        }
  
        const data = await response.json();
        // console.log('API response data:', data); // اینو ببین تو ترمینال سرورت
        res.setHeader('Cache-Control', 'no-store')
        return res.status(200).json(data);
  
      } catch (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
      }
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  
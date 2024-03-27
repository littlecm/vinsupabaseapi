import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { vin } = req.body;

    // Initialize Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    // Query the database using the VIN
    const { data, error } = await supabase
      .from('homenet7bbf18e26ccf4__83fbe7a3dbd89ef4a_csv')
      .select('*')
      .eq('vin', vin);

    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Error fetching data' });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Return the vehicle info as JSON
    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

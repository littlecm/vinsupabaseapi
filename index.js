require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.get('/api/lookup/:vin', async (req, res) => {
    const { vin } = req.params;
    const { data, error } = await supabase
        .from('homenet7bbf18e26ccf4__83fbe7a3dbd89ef4a_csv')
        .select('*')
        .eq('vin', vin);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

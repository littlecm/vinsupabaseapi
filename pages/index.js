import { useState } from 'react'

export default function Home() {
  const [vin, setVin] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState(null);

  const fetchVehicleInfo = async () => {
    const response = await fetch('/api/lookup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vin }),
    });

    const data = await response.json();
    setVehicleInfo(data);
  };

  return (
    <div>
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Enter VIN"
      />
      <button onClick={fetchVehicleInfo}>Lookup</button>
      {vehicleInfo && (
        <pre>{JSON.stringify(vehicleInfo, null, 2)}</pre>
      )}
    </div>
  );
}

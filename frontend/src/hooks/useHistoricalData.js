import { useState, useEffect } from 'react';

function useHistoricalData(communicationMethod) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchHistoricalData = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch('http://localhost:5000/api/data/historical');
        const response = await fetch('https://real-time-dashboard-884u.onrender.com');
        if (!response.ok) {
          throw new Error('Failed to fetch historical data');
        }
        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    
    fetchHistoricalData();
    
    // Set up polling interval (30 seconds)
    const intervalId = setInterval(fetchHistoricalData, 30000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  return { data, isLoading, error };
}

export default useHistoricalData;
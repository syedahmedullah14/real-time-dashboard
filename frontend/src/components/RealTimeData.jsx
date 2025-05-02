// import React, { useState, useEffect } from 'react';
// import useWebSocket from '../hooks/useWebSocket';
// import DataDisplay from './DataDisplay';

// function RealTimeData({ communicationMethod }) {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // WebSocket connection
//   const { lastMessage, connectionStatus } = useWebSocket(
//     communicationMethod === 'websocket',
//     'ws://localhost:5000'
//   );
  
//   // Polling method
//   useEffect(() => {
//     let intervalId;
    
//     if (communicationMethod === 'polling') {
//       setIsLoading(true);
      
//       const fetchData = async () => {
//         try {
//           const response = await fetch('http://localhost:5000/api/data/current');
//           if (!response.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           const result = await response.json();
//           setData(result);
//           setIsLoading(false);
//         } catch (err) {
//           setError(err.message);
//           setIsLoading(false);
//         }
//       };
      
//       // Initial fetch
//       fetchData();
      
//       // Set up polling interval (30 seconds)
//       intervalId = setInterval(fetchData, 30000);
//     }
    
//     return () => {
//       if (intervalId) clearInterval(intervalId);
//     };
//   }, [communicationMethod]);
  
//   // Handle WebSocket data
//   useEffect(() => {
//     if (communicationMethod === 'websocket' && lastMessage) {
//       try {
//         const parsedData = JSON.parse(lastMessage);
//         setData(parsedData);
//         setIsLoading(false);
//       } catch (err) {
//         setError('Failed to parse WebSocket data');
//         setIsLoading(false);
//       }
//     }
//   }, [lastMessage, communicationMethod]);
  
//   // Display connection status for WebSocket
//   useEffect(() => {
//     if (communicationMethod === 'websocket') {
//       if (connectionStatus === 'connecting') {
//         setIsLoading(true);
//         setError(null);
//       } else if (connectionStatus === 'closed') {
//         setError('WebSocket connection closed');
//         setIsLoading(false);
//       } else if (connectionStatus === 'error') {
//         setError('WebSocket connection error');
//         setIsLoading(false);
//       }
//     }
//   }, [connectionStatus, communicationMethod]);

//   return (
//     <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//       <h2 className="text-xl font-semibold mb-4">Real-Time Data</h2>
//       <p className="text-sm text-gray-500 mb-4">
//         {communicationMethod === 'websocket' 
//           ? 'Using WebSocket protocol (real-time updates)' 
//           : 'Using REST API with polling (30s intervals)'}
//       </p>
      
//       {isLoading ? (
//         <div className="flex justify-center items-center h-40">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
//         </div>
//       ) : error ? (
//         <div className="text-red-500 p-4 bg-red-50 rounded-md">
//           Error: {error}
//         </div>
//       ) : (
//         <DataDisplay data={data} />
//       )}
//     </div>
//   );
// }

// export default RealTimeData;
import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import DataDisplay from './DataDisplay';

function RealTimeData({ communicationMethod }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const apiBaseUrl = process.env.REACT_APP_API_URL + 'api/data/current' || 'http://localhost:5000';
  const apiBaseUrl = 'https://real-time-dashboard-884u.onrender.com/api/data/current' || 'http://localhost:5000';
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';

  // WebSocket connection
  const { lastMessage, connectionStatus } = useWebSocket(
    communicationMethod === 'websocket',
    wsUrl
  );

  // Polling method
  useEffect(() => {
    let intervalId;

    if (communicationMethod === 'polling') {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          const response = await fetch(`${apiBaseUrl}/api/data/current`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result = await response.json();
          setData(result);
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      };

      // Initial fetch
      fetchData();

      // Set up polling interval (30 seconds)
      intervalId = setInterval(fetchData, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [communicationMethod, apiBaseUrl]);

  // Handle WebSocket data
  useEffect(() => {
    if (communicationMethod === 'websocket' && lastMessage) {
      try {
        const parsedData = JSON.parse(lastMessage);
        setData(parsedData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to parse WebSocket data');
        setIsLoading(false);
      }
    }
  }, [lastMessage, communicationMethod]);

  // Display connection status for WebSocket
  useEffect(() => {
    if (communicationMethod === 'websocket') {
      if (connectionStatus === 'connecting') {
        setIsLoading(true);
        setError(null);
      } else if (connectionStatus === 'closed') {
        setError('WebSocket connection closed');
        setIsLoading(false);
      } else if (connectionStatus === 'error') {
        setError('WebSocket connection error');
        setIsLoading(false);
      }
    }
  }, [connectionStatus, communicationMethod]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Real-Time Data</h2>
      <p className="text-sm text-gray-500 mb-4">
        {communicationMethod === 'websocket'
          ? 'Using WebSocket protocol (real-time updates)'
          : 'Using REST API with polling (30s intervals)'}
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          Error: {error}
        </div>
      ) : (
        <DataDisplay data={data} />
      )}
    </div>
  );
}

export default RealTimeData;

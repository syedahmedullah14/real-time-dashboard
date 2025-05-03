import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import DataDisplay from './DataDisplay';

function RealTimeData({ communicationMethod }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const wsUrl = process.env.REACT_APP_WS_URL;

  const { lastMessage, connectionStatus } = useWebSocket(
    communicationMethod === 'websocket',
    wsUrl
  );

  useEffect(() => {
    let intervalId;

    if (communicationMethod === 'polling') {
      const fetchData = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/data/current`);
          if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
          setIsLoading(false);
        } catch (err) {
          setError(err.message || 'Error fetching data');
          setIsLoading(false);
        }
      };

      fetchData();
      intervalId = setInterval(fetchData, 30000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [communicationMethod, apiUrl]);

  useEffect(() => {
    if (communicationMethod === 'websocket' && lastMessage) {
      try {
        const parsed = JSON.parse(lastMessage);
        setData(parsed);
        setIsLoading(false);
      } catch (e) {
        setError('Invalid WebSocket data');
      }
    }
  }, [lastMessage, communicationMethod]);

  useEffect(() => {
    if (communicationMethod === 'websocket') {
      if (connectionStatus === 'connecting') {
        setIsLoading(true);
        setError(null);
      } else if (connectionStatus === 'closed') {
        setError('WebSocket closed');
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
          ? 'Using WebSocket protocol'
          : 'Using REST API polling'}
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">Error: {error}</div>
      ) : (
        <DataDisplay data={data} />
      )}
    </div>
  );
}

export default RealTimeData;

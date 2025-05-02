import React, { useState } from 'react';
import RealTimeData from './RealTimeData';
import HistoricalData from './HistoricalData';
import ToggleSwitch from './ToggleSwitch';

function Dashboard() {
  const [communicationMethod, setCommunicationMethod] = useState('websocket');
  
  const handleToggle = (isWebSocket) => {
    setCommunicationMethod(isWebSocket ? 'websocket' : 'polling');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Real-Time Dashboard</h1>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Polling</span>
            <ToggleSwitch 
              isChecked={communicationMethod === 'websocket'} 
              onChange={handleToggle} 
            />
            <span className="text-sm text-gray-600 ml-2">WebSocket</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RealTimeData communicationMethod={communicationMethod} />
          <HistoricalData communicationMethod={communicationMethod} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
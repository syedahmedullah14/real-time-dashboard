import React from 'react';

function DataDisplay({ data, isHistorical = false }) {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <div className="text-gray-500">No data available</div>;
  }

  // For historical data (array of readings)
  if (isHistorical && Array.isArray(data)) {
    return (
      <div className="overflow-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">CPU</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Memory</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Network</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 text-sm text-gray-900">{new Date(item.timestamp).toLocaleTimeString()}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.cpu}%</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.memory}%</td>
                <td className="px-4 py-2 text-sm text-gray-900">{item.network} MB/s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // For real-time data (single reading)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm font-medium text-gray-500 mb-1">CPU Usage</div>
        <div className="text-2xl font-bold text-blue-600">{data.cpu}%</div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${data.cpu}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm font-medium text-gray-500 mb-1">Memory Usage</div>
        <div className="text-2xl font-bold text-green-600">{data.memory}%</div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full" 
            style={{ width: `${data.memory}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="text-sm font-medium text-gray-500 mb-1">Network</div>
        <div className="text-2xl font-bold text-purple-600">{data.network} MB/s</div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-purple-500 rounded-full" 
            style={{ width: `${Math.min(data.network * 10, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DataDisplay;
import React, { useState, useEffect } from 'react';
import DataDisplay from './DataDisplay';
import useHistoricalData from '../hooks/useHistoricalData';

function HistoricalData({ communicationMethod }) {
  const { data, isLoading, error } = useHistoricalData(communicationMethod);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Historical Data</h2>
      <p className="text-sm text-gray-500 mb-4">
        Past 24 hours of collected data samples
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
        <DataDisplay data={data} isHistorical={true} />
      )}
    </div>
  );
}

export default HistoricalData;
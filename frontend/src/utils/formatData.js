export function formatNumber(num) {
    return Number(num).toFixed(2);
  }
  
  export function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
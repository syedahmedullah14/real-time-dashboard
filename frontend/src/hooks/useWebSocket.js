// import { useState, useEffect } from 'react';

// function useWebSocket(enabled, url) {
//   const [lastMessage, setLastMessage] = useState(null);
//   const [connectionStatus, setConnectionStatus] = useState('closed');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (!enabled) {
//       // Close existing connection if switching to polling
//       if (socket) {
//         socket.close();
//         setSocket(null);
//         setConnectionStatus('closed');
//       }
//       return;
//     }
    
//     // Create WebSocket connection
//     setConnectionStatus('connecting');
//     const ws = new WebSocket(url);
//     setSocket(ws);
    
//     ws.onopen = () => {
//       setConnectionStatus('open');
//       console.log('WebSocket connection established');
//     };
    
//     ws.onmessage = (event) => {
//       setLastMessage(event.data);
//     };
    
//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//       setConnectionStatus('error');
//     };
    
//     ws.onclose = () => {
//       setConnectionStatus('closed');
//       console.log('WebSocket connection closed');
//     };
    
//     // Clean up on unmount or when switching to polling
//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };
//   }, [enabled, url]);
  
//   return { lastMessage, connectionStatus };
// }

// export default useWebSocket;

import { useState, useEffect } from 'react';

function useWebSocket(enabled) {
  const [lastMessage, setLastMessage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('closed');
  const [socket, setSocket] = useState(null);

  // const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
  const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';

  useEffect(() => {
    if (!enabled) {
      if (socket) {
        socket.close();
        setSocket(null);
        setConnectionStatus('closed');
      }
      return;
    }

    setConnectionStatus('connecting');
    const ws = new WebSocket(wsUrl);
    setSocket(ws);

    ws.onopen = () => {
      setConnectionStatus('open');
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      setLastMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('error');
    };

    ws.onclose = () => {
      setConnectionStatus('closed');
      console.log('WebSocket closed');
    };

    return () => {
      ws.close();
    };
  }, [enabled, wsUrl]);

  return { lastMessage, connectionStatus };
}

export default useWebSocket;

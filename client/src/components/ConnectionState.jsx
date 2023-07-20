import React from 'react';

function ConnectionState({ isConnected }) {
  return <p>State: { isConnected ? 'Connected' : 'Disconnected'}</p>;
}

export default ConnectionState;
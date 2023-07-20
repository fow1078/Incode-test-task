import React, { useState } from 'react'
import { socket } from '../socket';


function ConnectionManager() {
  const [intervalChange, setIntervalChange] = useState(5000);
  function connect() {
    socket.connect();
    socket.emit('start');
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className='flex flex-col items-end'>
      <div className='w-full flex justify-end mb-4'>
        <button onClick={ connect }>Connect</button>
        <button className='ml-2' onClick={ disconnect }>Disconnect</button>
      </div>
      <div>
        <input type="text" className='h-10 p-2 rounded-md' value={intervalChange} onChange={(e) => {setIntervalChange(e.target.value)}} />
        <button className='ml-2' onClick={(e) => {
          e.preventDefault();
          fetch('http://localhost:5000/api/send-object', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({interval: parseInt(intervalChange)}), 
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
        }}>Submit</button>
      </div>

    </div>
  );
}

export default ConnectionManager;
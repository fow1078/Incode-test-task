import { useState, useEffect } from 'react';
import { socket } from './socket';

// Components 
import ConnectionManager from './components/ConnectionManager';
import Tickers from './components/Tickers';
import NavBar from './components/NavBar';

// Redux Functions
import { useDispatch, useSelector } from 'react-redux';
import { getTickersValue } from './features/TickersControl/tickersControlSlice'


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { new_tickers } = useSelector((store) => store.ticker_control);
  const dispatch = useDispatch();

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    }
  
    const onDisconnect = () => {
      setIsConnected(false);
    }
  
    const onTickersChange = (value) =>  {
      dispatch(getTickersValue({tickers: value}))
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('ticker', onTickersChange);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.emit('start');
      socket.off('ticker', onTickersChange);
    };  
  }, []);

  return (
    <>
      <NavBar isConnected={ isConnected }/>
      <section className='w-full px-2 py-10'>     
        <Tickers tickers={new_tickers} />
        <ConnectionManager />
      </section>
    </>

  )
}

export default App;

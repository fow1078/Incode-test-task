import React, { useState } from 'react';

import { BsToggleOff } from 'react-icons/bs';
import { BsToggleOn } from 'react-icons/bs';

// Redux Functions 
import { useDispatch } from 'react-redux';
import { switchTickerAdd, switchTickerRemove } from '../features/TickersControl/tickersControlSlice';

function SwitcherElement({ticker}) {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  return (
    <li className='list-image-none w-full mb-5'>
      <div className='flex justify-between items-center w-full'>
        <h4 className='font-bold'>{ticker.ticker}</h4>
        <div>
          <label htmlFor={ticker.ticker + '_toggle'}>
            {toggle ? <BsToggleOn className='w-7 h-7 ease-in-out' /> : <BsToggleOff className='w-7 h-7 ease-in-out' />}
            <input type="checkbox" value={toggle} onChange={() => {
                setToggle(!toggle);
                if (toggle) {
                  dispatch(switchTickerAdd({ticker: ticker}))
                } else {
                  dispatch(switchTickerRemove({ticker: ticker}))
                }
              }}
            name={ticker.ticker + '_toggle'} id={ticker.ticker + '_toggle'} className='hidden' />
          </label>
        </div>
      </div>
    </li>
  )
}

export default SwitcherElement;
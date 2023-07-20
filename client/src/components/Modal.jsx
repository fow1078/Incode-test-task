import React, { useEffect, useState } from 'react';

// Redux Functions
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../features/Modal/modalSlice';
import SwitcherElement from './SwitcherElement';

function Modal() {
  const { isOpen } = useSelector((store) => store.modal);
  const { new_tickers } = useSelector((store) => store.ticker_control);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeModal())
    document.body.classList.remove('body-scroll');
  }
  return (
    <div className='modal' style={{position: 'fixed', top: 0, right: '-100px', height: '100vh', backgroundColor: '#000', display: isOpen ? 'block' : 'none', padding: '20px', transition: '0.4s', zIndex: 10000}}>
      <div onClick={handleClick} style={{position: 'absolute', top: 0, right: 0, padding: '20px 40px 0 0', fontSize: '22px', color: '#fff', fontWeight: '400', cursor: 'pointer'}}>X</div>
      <div>
        <div style={{ padding: '40px 10px', display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%', flexDirection: 'column' }} >
          <h3 className='mb-5 text-white text-lg font-bold'>Switcher</h3>
          <ul className='pl-5 w-full'>
            {new_tickers.map((ticker, ind) => {
              return <SwitcherElement key={ticker.ticker} ticker={ticker} />
            })} 
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Modal;



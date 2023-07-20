import React from 'react';
import ConnectionState from './ConnectionState';
import { AiOutlineMenuFold } from 'react-icons/ai'

// Components 
import Modal from './Modal';

// Redux Functions
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../features/Modal/modalSlice';

function NavBar({ isConnected }) {
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const handleFillClick = () => {
    if (isOpen) {
      dispatch(closeModal())
      document.body.classList.remove('body-scroll');
    }
  }
  return (
    <>
      <div onClick={handleFillClick} className='fill' style={{display: isOpen ? 'block' : 'none'}}></div>
      <div className='w-full fixed h-12 bg-black px-4 flex items-center justify-between'>
        <h6 className='text-white'><ConnectionState isConnected={ isConnected } /></h6>

        <div className='flex items-center'>
          <AiOutlineMenuFold style={{width: '30px', height: '30px'}} onClick={() => { document.body.classList.add('body-scroll'); document.querySelector('.modal').classList.add('slide-left'); dispatch(openModal())}} />
        </div>
      </div>
      <Modal />
    </>

  )
}


export default NavBar;
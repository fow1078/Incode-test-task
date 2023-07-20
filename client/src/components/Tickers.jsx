import React from 'react';

// Redux Functions 
import { useDispatch } from 'react-redux';


function Tickers({ tickers }) {
  const dispatch = useDispatch();
  const handleRemove = (ticker) => {
    console.log('removed: ' + ticker) 
  }
  return (
    <div className='my-7 px-6 w-full '>
      <h2 className='text-center font-bold text-4xl my-5'>My Tickers</h2>
      <ul>
          {
            tickers.map((ticker) =>
              <li key={ticker.ticker} className='py-4 px-8 bg-neutral-700 w-full rounded-md flex items-center mb-3' >
                <div className='w-1/3 sm:flex sm:justify-between '>
                  <div className='font-medium text-gray-200'>
                    {ticker.ticker}
                  </div>
                  <div className='font-bold text-gray-100'>
                    {ticker.price}$
                  </div>
                </div>

                <div className='w-1/3 sm:w-1/2 sm:flex sm:justify-evenly'>
                  <div className='flex items-center justify-center sm:justify-start'>
                      {ticker.yield > 1 
                        ? 
                        <>
                          <div className='font-bold text-green-600' style={{transition: '0.4s'}}>
                            + {ticker.change}$
                          </div>
                        </>
                        : 
                        <>
                          <div className='font-bold text-red-600' style={{transition: '0.4s'}}>
                            - {ticker.change}$
                          </div>
                        </>
                      }
                  </div>

                  <div className='flex items-center justify-center sm:justify-start '>
                    {ticker.yield > 1
                      ?
                      <>
                        {(ticker.change_percent * 100).toFixed(2) == 0.00 
                          ?
                          <div className='p-1 sm:ml-5 bg-neutral-400/40 text-sm text-white rounded-md font-bold' style={{transition: '0.4s'}}>
                            {(ticker.change_percent * 100).toFixed(2)}%
                          </div>
                          :
                          <div className='p-1 sm:ml-5 bg-green-600/40 text-sm text-white rounded-md font-bold' style={{transition: '0.4s'}}>
                            + {(ticker.change_percent * 100).toFixed(2)}%
                          </div>
                        } 
                      </>
                      :
                      <>
                        {(ticker.change_percent * 100).toFixed(2) == 0.00 
                          ?
                          <div className='p-1 sm:ml-5 bg-neutral-400/40 text-sm text-white rounded-md font-bold' style={{transition: '0.4s'}}>
                            {(ticker.change_percent * 100).toFixed(2)}%
                          </div>
                          :
                          <div className='p-1 sm:ml-5 bg-red-700/50 text-sm text-white rounded-md font-bold' style={{transition: '0.4s'}}>
                            - {(ticker.change_percent * 100).toFixed(2)}%
                          </div>
                        }
                      </>
                    }
                  </div>
                </div>

                <div className='flex items-center justify-end w-1/3 sm:w-1/6' onClick={() => {handleRemove(ticker.ticker)}} style={{cursor: 'pointer'}}>
                  <div className='font-medium  bg-red-700/50 p-1 rounded-full w-7 h-7 flex items-center justify-center'>
                    X
                  </div>
                </div>
              </li>
            )
          }
      </ul>
    </div>
  )
}

export default Tickers;




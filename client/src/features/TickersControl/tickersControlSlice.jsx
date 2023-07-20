import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  new_tickers: [],
  removedTickers: [],
  switchedTickers: []
}

const tickersControlSlice = createSlice({
  name: 'ticker_control',
  initialState: initialState,
  reducers: {
    getTickersValue: (state, { payload }) => {
      if (state.removedTickers.length === 0 && state.switchedTickers.length === 0) {
        state.new_tickers = payload.tickers.sort((a, b) => a.ticker.localeCompare(b.ticker));
      } else if (state.switchedTickers.length > 0) {
        function excludeElements(inputArray, filterArray) {
          const tmp = [];
          filterArray.forEach(el => {
            tmp.push(Object.values(el)[0]);
          });
          return inputArray.filter((element) => !tmp.includes(element.ticker));
        }
        const resultArr = excludeElements(payload.tickers, state.switchedTickers);
        state.new_tickers = resultArr.concat(state.switchedTickers).sort((a, b) => a.ticker.localeCompare(b.ticker));
      } else {
        console.log(payload.tickers);
        state.new_tickers = payload.tickers.filter(ticker => {
          return !state.removedTickers.includes(ticker.ticker);
        })
      }
    },
    switchTickerAdd: (state, { payload }) => {
        state.switchedTickers.push(payload.ticker);
    },
    switchTickerRemove: (state, { payload }) => {
      for (let i = 0; i < state.switchedTickers.length; i++) {
        if ( state.switchedTickers[i].ticker === payload.ticker.ticker) {
          state.switchedTickers.splice(i, 1);
        }
      }
    }
  }
});

export const { getTickersValue, switchTickerAdd, switchTickerRemove } = tickersControlSlice.actions;

export default tickersControlSlice.reducer;


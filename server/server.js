'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

let FETCH_INTERVAL = 4000;
const PORT = process.env.PORT || 5000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {

  const quotes = tickers.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(0, 200, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit('ticker', quotes);
}

let timer;
let isStreaming = false;
let currentInterval = FETCH_INTERVAL;

function trackTickers(socket) {
  getQuotes(socket);

  timer = setInterval(function() {
    getQuotes(socket);
  }, currentInterval);

  socket.on('disconnect', function() {
    clearInterval(timer);
    isStreaming = false;
  });

  isStreaming = true;
}

function restartSocket(socket) {
  if (timer) {
    clearInterval(timer);
  }
  trackTickers(socket);
}

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/send-object', (req, res) => {
  const receivedObject = req.body;

  if (isStreaming) {
    clearInterval(timer);
    isStreaming = false;
  }

  if (receivedObject.interval && Number.isInteger(receivedObject.interval)) {
    currentInterval = receivedObject.interval;
  }
  console.log('Received object:', receivedObject);

  restartSocket(socketServer);

  res.json('Timer Changed');
});

socketServer.on('connection', (socket) => {
  socket.on('start', () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});

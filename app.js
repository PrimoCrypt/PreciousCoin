require('dotenv').config(); // a file that contains the configuration of the app
const randomstring = require('random-string'); // a package that generates random strings
const express = require('express'); // create a new express app
const app = express(); // create a new express app
const Blockchain = require('./utility/BlockChain'); // Blockchain class
const Block = require('./utility/Block'); // Block class
const preciousCoin = new Blockchain(); // my cryptocurrency chain


// middleware
app.use(express.json()); // a body parser middleware
app.use(express.urlencoded({ extended: true }));

// logger

// for logging the requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


// routes

app.get('/api/crypto', (req, res) => {
  res.send('Welcome to Precious Coin Crypto!');
})


// add a new block to the chain

app.post('/api/crypto/addBlock', async (req, res) => {
  const { data } = req.body;
  if (!data) { // if the data is not provided
    return res.status(400).json({ error: 'Missing fields' }); // return an error
  };
  let latestBlock = preciousCoin.getLatestBlock(); // get the latest block
  // create a new block with the data and the previous hash of the latest block
  const blockObj = {
    index: latestBlock.index + 1,
    data,
    previousHash: latestBlock.hash,
    timestamp: new Date().toISOString().slice(0, 10),
  }
  const newBlock = new Block(blockObj); // create a new block with the data and the previous hash of the latest block
  preciousCoin.addBlock(newBlock); // add the new block to the chain
  return res.status(200).json({ message: 'Block added successfully', block: newBlock, chain: preciousCoin.chain });
});

// create a transaction
app.post('/api/crypto/createTransaction', async (req, res) => {
  const { amount, sender, recipient } = req.body;
  if (!amount || !sender || !recipient) { // if the data is not provided
    return res.status(400).json({ error: 'Missing fields' }); // return an error
  };
  // create a transaction with the data
  const newTransaction = {
    id: randomstring({ length: 10 }),
    amount: parseInt(amount),
    sender,
    recipient,
  };
  // create a new block with the data and the previous hash of the latest block
  preciousCoin.createTransaction(newTransaction);
  res.status(200).json({ message: 'Transaction created successfully', transaction: newTransaction, chain: preciousCoin.chain });
});


// check if the chain is valid
app.get('/api/crypto/isChainValid', async (req, res) => {
  const isValid = preciousCoin.isChainValid();
  const message = isValid ? 'Chain is valid' : 'Chain is not valid';
  res.status(200).json({ message, isValid });
});


// get the block with the given index using params
app.get('/api/crypto/getBlock/:index', async (req, res) => {
  const { index } = req.params;
  if (!index) {
    return res.status(400).json({ error: 'Missing fields' });
  };
  const block = preciousCoin.getBlock(+index);
  if (!block) {
    return res.status(400).json({ error: 'Block not found' });
  };
  res.status(200).json({ message: 'Block found', block });
});


// get the block with the given hash using params
app.get('/api/crypto/getBlockByHash/:hash', async (req, res) => {
  const { hash } = req.params;
  if (!hash) {
    return res.status(400).json({ error: 'Missing hash' });
  };
  const block = preciousCoin.getBlockByHash(hash);
  if (!block) {
    return res.status(400).json({ error: 'Block not found' });
  }
  res.status(200).json({ message: 'Block found', block });
});


// get the index of the block with the given hash using params
app.get('/api/crypto/getBlockIndexByHash/:hash', async (req, res) => {
  const { hash } = req.params;
  if (!hash) {
    return res.status(400).json({ error: 'Missing hash' });
  }
  const index = preciousCoin.getBlockIndexByHash(hash);
  if (index === undefined) {
    return res.status(400).json({ error: 'Block not found' });
  }
  res.status(200).json({ message: 'Block found', index });
});


// get chain
app.get('/api/crypto/getChain', async (req, res) => {
  res.status(200).json({ message: 'Chain found', chain: preciousCoin.chain });
});

// not found

// for request urls not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
// initialize port
const port = process.env.PORT || 8000;


// listen to the port
const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

// start the server
start();

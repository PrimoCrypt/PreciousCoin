## Project Setup

A simple blockchain project.

Use the following commands to get started:

To install dependencies:
```
npm install
```
To run the project:
```
npm start
```

Routes:

    - /api/crypto => Root route
    - /api/crypto/addBlock => Add a new block to the chain (POST) body: { "data": "some data" }
    - /api/crypto/createTransaction => Create a new transaction (POST) body: { "amount": 1, "sender": "sender", "recipient": "recipient" }
    - /api/crypto/isChainValid => Check if the chain is valid (GET) 
    - /api/crypto/getBlock/:index => Get a block by index (GET) 
    - /api/crypto/getBlockByHash/:hash => Get a block by hash (GET)
    - /api/crypto/getBlockIndexByHash/:hash => Get the index of a block by hash (GET)
    - /api/crypto/getChain => Get the entire blockchain (GET)


// the block class is used to create a block.
const Block = require('./Block');

// create a class called BlockChain that has the following properties:
class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // create an array of blocks
        this.difficulty = 0; // difficulty of the block chain. difficulty is the number of zeros in the hash.
    }

    // create a genesis block which is the first block in the chain
    createGenesisBlock() {
        return new Block({ index: 0, timestamp: "2017-01-01", data: "Genesis block", previousHash: "" }); // index, timestamp, data, previousHash
    }

    // to get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1]; // get the last block in the chain
    }

    // add a new block to the chain
    addBlock(newBlock) {
        newBlock.mineBlock(this.difficulty); // mine the new block
        this.chain.push(newBlock); // add the new block to the chain
    };

    // create a transaction
    createTransaction(transaction) { // transaction is an object with the following properties:
        const newTransaction = {
            id: transaction.id, // id is the id of the transaction
            amount: transaction.amount, // amount of the transaction
            sender: transaction.sender, // sender of the transaction
            recipient: transaction.recipient // recipient of the transaction
        };
        let latestBlock = this.getLatestBlock(); // get the latest block
        this.addBlock(new Block({ index: latestBlock.index + 1, data: newTransaction, timestamp: new Date().toISOString(0, 10), previousHash: latestBlock.hash })); // add a new block to the chain with the transaction
    };

    // check if the chain is valid
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) { // loop through the chain
            const currentBlock = this.chain[i]; // get the current block
            const previousBlock = this.chain[i - 1]; // get the previous block

            if (currentBlock.hash !== currentBlock.calculateHash()) { // check if the hash of the current block is equal to the hash of the current block
                return false; // if not return false
            }

            if (currentBlock.previousHash !== previousBlock.hash) { // check if the previous hash of the current block is equal to the hash of the previous block
                return false; // if not return false
            }
        }

        // if the chain is valid return true
        return true;
    };

    // get the block with the given index
    getBlock(index) {
        return this.chain[index]; // get the block with the given index
    };

    // get the block with the given hash
    getBlockByHash(hash) {
        for (let i = 0; i < this.chain.length; i++) { // loop through the chain
            if (this.chain[i].hash === hash) { // check if the hash of the current block is equal to the hash of the block we are looking for
                return this.chain[i]; // if so return the block
            }
        }
    };

    // get the index of the block with the given hash
    getBlockIndexByHash(hash) {
        for (let i = 0; i < this.chain.length; i++) { // loop through the chain
            if (this.chain[i].hash === hash) { // check if the hash of the current block is equal to the hash of the block we are looking for
                return this.chain[i].index; // if so return the index of the block
            }
        }
    };

    // get chain
    getChain() {
        return this.chain; // return the chain
    };
};

module.exports = BlockChain;
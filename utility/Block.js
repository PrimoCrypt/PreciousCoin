// import sha256 from 'crypto-js/sha256' which is a hash function that takes a string and returns a hexadecimal string.
const SHA256 = require('crypto-js/sha256');

// create a class called Block that has the following properties:
class Block {
    constructor({ index, timestamp, data, previousHash = '' }) {
        this.index = index; // set the index of the block
        this.timestamp = timestamp; // time of creation the block
        this.data = data; // data of the block
        this.previousHash = previousHash; // hash of the previous block
        this.hash = this.calculateHash(); // hash of the block
    }

    // what is a hash ?
    // a hash is a string that is unique to each block just like a username or a password that is unique to each user.

    // calculate the hash of the block
    calculateHash() {
        return SHA256(String(this.index) + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString(); // calculate the hash of the block
    };

    // mine the block
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) { // loop until the hash starts with the specified number of zeros
            console.count("Mining block"); // count the number of times the loop runs
            this.hash = this.calculateHash(); // calculate the hash of the block
        }
        console.log("Block mined: " + this.hash); // log the hash of the block
    }
};


// export the Block class
module.exports = Block;
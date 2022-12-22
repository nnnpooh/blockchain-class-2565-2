// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Auction {
    address payable public owner;
    uint256 public startBlock;
    uint256 public endBlock;

    enum State {Started, Running, Ended, Cancelled}

    State public auctionState;

    uint256 public highestBindingBid;
    address payable highestBidder;

    mapping(address => uint) public bids;
    uint256 bidIncrement;

    constructor() {
        owner = payable(msg.sender);
        auctionState = State.Running;
        startBlock = block.number;
        endBlock = startBlock + 100;
        bidIncrement = 100;
    }

    modifier notOwner(){
        require(msg.sender != owner);
        _;
    }

    modifier afterStart(){
        require(block.number >= startBlock);
        _;
    }

    modifier beforeEnd(){
        require(block.number <= endBlock);
        _;
    }

    function min(uint a, uint b) pure internal returns(uint) {
        if (a <= b) {
            return a;
        } else {
            return b;
        }
    }

    function placeBid() public payable notOwner afterStart beforeEnd {
        require(auctionState == State.Running);
        require(msg.value >= bidIncrement);

        uint currentBid = bids[msg.sender] + msg.value;

        require(currentBid >= highestBindingBid + bidIncrement);

        bids[msg.sender] = currentBid;

        uint highestBid = bids[highestBidder];

        if (currentBid <= highestBid) {
            highestBindingBid = min(currentBid + bidIncrement, highestBid);
        } else {
            highestBindingBid = highestBid + bidIncrement;
            highestBidder = payable(msg.sender);
        } 
    }

}
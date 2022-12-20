// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Auction {
    address payable public owner;
    uint256 public startBlock;
    uint256 public endBlock;

    enum State {Started, Running, Ended, Cancaled}

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

}
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Auction {
    address payable public owner;
    uint256 public startBlock;
    uint256 public endBlock;

    enum State {
        Running,
        Ended,
        Cancelled
    }

    State public auctionState;

    uint256 public highestBindingBid;
    address payable public highestBidder;

    mapping(address => uint256) public bids;
    uint256 bidIncrement;

    constructor() {
        owner = payable(msg.sender);
        auctionState = State.Running;
        startBlock = block.number;
        endBlock = startBlock + 100;
        bidIncrement = 100;
        highestBindingBid = 0; // not necessary
    }

    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot bid.");
        _;
    }

    modifier afterStart() {
        require(block.number >= startBlock, "The auction has not begun yet.");
        _;
    }

    modifier beforeEnd() {
        require(block.number <= endBlock, "The auction has already ended.");
        _;
    }
}
